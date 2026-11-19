import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { clientsApi } from '../services/api';
import type { Client } from '../types/models';

export function Clients() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  async function refresh() {
    setLoading(true);
    setError('');
    try { setItems(await clientsApi.list()); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Falha ao consultar clientes.'); }
    finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);

  async function remove(item: Client) {
    if (!window.confirm(`Excluir cliente ${item.nome}?`)) return;
    try { await clientsApi.remove(item.id); await refresh(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Falha ao excluir cliente.'); }
  }

  const filtered = items.filter(item => `${item.nome} ${item.telefone} ${item.bairro} ${item.cidade}`.toLowerCase().includes(query.toLowerCase()));

  return <>
    <div className="page-heading"><div><h2>Clientes</h2><p>Cadastros e endereços de entrega.</p></div><Link className="btn" to="/clientes/novo"><Plus size={16} /> Novo cliente</Link></div>
    <section className="panel"><div className="panel-head"><h3>Clientes cadastrados</h3><label className="searchbox"><Search size={16} /><input aria-label="Pesquisar clientes" placeholder="Buscar cliente" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
      {loading && <p role="status">Carregando clientes...</p>}
      {error && <p className="alert error" role="alert">{error} <button className="btn secondary" onClick={() => void refresh()}>Tentar novamente</button></p>}
      {!loading && !error && <div className="table-wrap"><table><thead><tr><th>Nome do cliente</th><th>Telefone / WhatsApp</th><th>Bairro</th><th>Cidade</th><th>Ponto de referência</th><th>Ações</th></tr></thead><tbody>
        {filtered.map(cliente => <tr key={cliente.id}><td><b>{cliente.nome}</b></td><td>{cliente.telefone}</td><td>{cliente.bairro}</td><td>{cliente.cidade}</td><td>{cliente.pontoReferencia}</td><td><div className="actions"><Link className="icon-button" aria-label={`Editar ${cliente.nome}`} to={`/clientes/${cliente.id}/editar`}><Pencil size={16} /></Link><button aria-label={`Excluir ${cliente.nome}`} onClick={() => void remove(cliente)}><Trash2 size={16} /></button></div></td></tr>)}
        {!filtered.length && <tr><td className="empty" colSpan={6}>Nenhum cliente encontrado.</td></tr>}
      </tbody></table></div>}
    </section>
  </>;
}

const blank: Omit<Client, 'id'> = { nome: '', telefone: '', rua: '', numero: '', bairro: '', cidade: '', cep: '', pontoReferencia: '', complemento: '' };

export function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Client, 'id'>>(blank);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    clientsApi.get(id).then(item => { if (active) setForm({ ...blank, ...item }); })
      .catch(cause => { if (active) setError(cause instanceof Error ? cause.message : 'Falha ao carregar cliente.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.pontoReferencia.trim() || !form.rua.trim() || !form.bairro.trim() || !form.cidade.trim()) {
      setError('Preencha o endereço de entrega e o ponto de referência.');
      return;
    }
    if (!/^\d{5}-?\d{3}$/.test(form.cep.trim())) {
      setError('Informe um CEP válido com 8 dígitos.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (id) await clientsApi.update(id, form);
      else await clientsApi.create(form);
      navigate('/clientes');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao salvar cliente.');
    } finally { setSaving(false); }
  }

  const fields: { label: string; key: keyof Omit<Client, 'id'>; required?: boolean }[] = [
    { label: 'Nome completo', key: 'nome', required: true },
    { label: 'Telefone / WhatsApp', key: 'telefone', required: true },
    { label: 'Rua', key: 'rua', required: true },
    { label: 'Número', key: 'numero', required: true },
    { label: 'Complemento', key: 'complemento' },
    { label: 'Bairro', key: 'bairro', required: true },
    { label: 'Cidade', key: 'cidade', required: true },
    { label: 'CEP', key: 'cep', required: true },
    { label: 'Ponto de referência', key: 'pontoReferencia', required: true }
  ];

  return <>
    <div className="page-heading"><div><h2>{id ? 'Editar cliente' : 'Cadastrar cliente'}</h2><p>Informe os dados e o endereço completo para entrega.</p></div><Link className="btn secondary" to="/clientes">Voltar</Link></div>
    <section className="panel">{loading ? <p>Carregando cliente...</p> : <form onSubmit={submit}>
      <div className="form-grid">{fields.map(({ label, key, required }) => <label className="field" key={key}><span>{label} {required ? '*' : ''}</span><input required={required} value={form[key] || ''} onChange={e => setForm(previous => ({ ...previous, [key]: e.target.value }))} placeholder={key === 'pontoReferencia' ? 'Ex.: Ao lado do posto de saúde' : undefined} /></label>)}</div>
      {error && <p className="alert error" role="alert">{error}</p>}
      <div className="form-actions"><button className="btn" disabled={saving}>{saving ? 'Salvando...' : 'Salvar cliente'}</button><Link className="btn secondary" to="/clientes">Cancelar</Link></div>
    </form>}</section>
  </>;
}
