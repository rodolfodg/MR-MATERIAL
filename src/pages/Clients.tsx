import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { ClientFormFields } from '../components/clients/ClientForm';
import { useListarClientesQuery, useObterClientePorIdQuery, useCriarClienteMutation, useAtualizarClienteMutation, useExcluirClienteMutation } from '../services/rtkApi';
import type { ClienteDTO } from '../types/cliente.types';

function errorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const e = error as { data?: { message?: string }; error?: string; status?: string | number };
    return e.data?.message || e.error || `Falha na API${e.status ? ` (${e.status})` : ''}.`;
  }
  return 'Não foi possível concluir a operação.';
}
export function Clients() {
  const [busca, setBusca] = useState('');
  const [error, setError] = useState('');
  const { data: items = [], isLoading, isError, refetch } = useListarClientesQuery(busca);
  const [excluir, { isLoading: deleting }] = useExcluirClienteMutation();
  async function remove(id: string, nome: string) {
    if (!window.confirm(`Deseja realmente excluir ${nome}?`)) return;
    setError('');
    try { await excluir(id).unwrap(); } catch (cause) { setError(errorMessage(cause)); }
  }
  return <>
    <div className="page-heading"><div><h2>Clientes</h2><p>Cadastros e endereços de entrega.</p></div><Link className="btn" to="/clientes/novo"><Plus size={16} /> Novo cliente</Link></div>
    <section className="panel"><div className="panel-head"><h3>Clientes cadastrados</h3><label className="searchbox"><Search size={16}/><input aria-label="Pesquisar clientes" placeholder="Buscar por nome ou telefone" value={busca} onChange={e => setBusca(e.target.value)} /></label></div>
      {isLoading && <p role="status">Carregando clientes...</p>}
      {(isError || error) && <p className="alert error" role="alert">{error || 'Erro ao carregar clientes. Verifique a API e a autenticação.'} <button className="btn secondary" onClick={() => void refetch()}>Tentar novamente</button></p>}
      {!isLoading && !isError && <div className="table-wrap"><table><thead><tr><th>Nome do cliente</th><th>Telefone / WhatsApp</th><th>Bairro</th><th>Cidade</th><th>Ponto de referência</th><th>Ações</th></tr></thead><tbody>
        {items.map(cliente => <tr key={cliente.id}><td><b>{cliente.nomeCliente}</b></td><td>{cliente.telefone}</td><td>{cliente.bairro}</td><td>{cliente.cidade}</td><td>{cliente.pontoReferencia || '—'}</td><td><div className="actions"><Link className="icon-button" aria-label={`Editar ${cliente.nomeCliente}`} to={`/clientes/${cliente.id}/editar`}><Pencil size={16}/></Link><button disabled={deleting} aria-label={`Excluir ${cliente.nomeCliente}`} onClick={() => void remove(cliente.id, cliente.nomeCliente)}><Trash2 size={16}/></button></div></td></tr>)}
        {!items.length && <tr><td colSpan={6} className="empty">Nenhum cliente encontrado.</td></tr>}
      </tbody></table></div>}
    </section>
  </>;
}
export function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useObterClientePorIdQuery(id || '', { skip: !id });
  const [criar, creating] = useCriarClienteMutation();
  const [atualizar, updating] = useAtualizarClienteMutation();
  const [error, setError] = useState('');
  async function submit(dados: ClienteDTO) {
    setError('');
    try {
      if (id) await atualizar({ id, dados }).unwrap();
      else await criar(dados).unwrap();
      navigate('/clientes');
    } catch (cause) { setError(errorMessage(cause)); }
  }
  return <>
    <div className="page-heading"><div><h2>{id ? 'Editar cliente' : 'Cadastrar cliente'}</h2><p>Informe os dados e o endereço completo para entrega.</p></div><Link className="btn secondary" to="/clientes">Voltar</Link></div>
    <section className="panel">{isLoading ? <p>Carregando cliente...</p> : isError ? <p className="alert error">Falha ao carregar o cadastro.</p> : <ClientFormFields mode={id ? 'edit' : 'create'} initialValues={data} onSubmit={submit} isLoading={creating.isLoading || updating.isLoading} onCancel={() => navigate('/clientes')} />}
      {error && <p className="alert error" role="alert">{error}</p>}
    </section>
  </>;
}
