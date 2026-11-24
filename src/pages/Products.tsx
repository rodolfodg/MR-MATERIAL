import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useListarProdutosQuery, useObterProdutoPorIdQuery, useCriarProdutoMutation, useAtualizarProdutoMutation, useExcluirProdutoMutation } from '../services/rtkApi';
import type { Product } from '../types/models';

const apiError = (cause: unknown): string => {
  if (cause && typeof cause === 'object' && 'data' in cause) {
    const data = (cause as { data?: { message?: string | string[] } }).data;
    if (data?.message) return Array.isArray(data.message) ? data.message.join('; ') : data.message;
  }
  return cause instanceof Error ? cause.message : 'Falha na comunicação com a API.';
};

export const currency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

export function Products() {
  const { data: items = [], isLoading: loading, isError, error: queryError, refetch } = useListarProdutosQuery();
  const [excluirProduto, deleting] = useExcluirProdutoMutation();
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  async function remove(item: Product) {
    if (!window.confirm(`Excluir o produto ${item.nome}?`)) return;
    try { await excluirProduto(item.id).unwrap(); setError(''); }
    catch (cause) { setError(apiError(cause)); }
  }

  const filtered = items.filter(item => `${item.id} ${item.nome} ${item.codigoBarras} ${item.marca}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="page-heading"><div><h2>Produtos</h2><p>Gerencie o catálogo e o estoque da loja.</p></div><Link className="btn" to="/produtos/novo"><Plus size={16} /> Novo produto</Link></div>
      <section className="panel">
        <div className="panel-head"><h3>Produtos cadastrados</h3><label className="searchbox"><Search size={16} /><input aria-label="Pesquisar produtos" value={query} onChange={e => setQuery(e.target.value)} placeholder="Código, nome, marca ou EAN" /></label></div>
        {loading && <p role="status">Carregando produtos...</p>}
        {(error || isError) && <div className="alert error" role="alert">{error || apiError(queryError)} <button className="btn secondary" onClick={() => void refetch()}>Tentar novamente</button></div>}
        {!loading && !error && !isError && <div className="table-wrap"><table><thead><tr><th>Código</th><th>Nome do produto</th><th>Marca</th><th>Preço de venda</th><th>Estoque atual</th><th>Unidade</th><th>Ações</th></tr></thead><tbody>
          {filtered.map(produto => <tr key={produto.id}><td className="code">{produto.id}</td><td><b>{produto.nome}</b></td><td>{produto.marca}</td><td>{currency(Number(produto.precoVenda))}</td><td><span className={Number(produto.estoqueAtual) <= Number(produto.estoqueMinimo || 0) ? 'pill warning' : 'pill success'}>{produto.estoqueAtual}</span></td><td>{produto.unidade}</td><td><div className="actions"><Link className="icon-button" aria-label={`Editar ${produto.nome}`} to={`/produtos/${produto.id}/editar`}><Pencil size={16} /></Link><button aria-label={`Excluir ${produto.nome}`} disabled={deleting.isLoading} onClick={() => void remove(produto)}><Trash2 size={16} /></button></div></td></tr>)}
          {filtered.length === 0 && <tr><td colSpan={7} className="empty">Nenhum produto encontrado.</td></tr>}
        </tbody></table></div>}
      </section>
    </>
  );
}

const blank: Omit<Product, 'id'> = {
  nome: '', codigoBarras: '', marca: '', familia: 'Alvenaria', precoVenda: 0,
  estoqueAtual: 0, unidade: 'Unidade', fornecedor: '', custo: 0, estoqueMinimo: 0,
  validade: '', garantia: '', promocional: false, descontoVista: 0, precoPrazo: 0, taxaLucro: 0
};

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Product, 'id'>>(blank);
  const { data: product, isLoading: loading, isError: loadError } = useObterProdutoPorIdQuery(id || '', { skip: !id });
  const [criarProduto, creating] = useCriarProdutoMutation();
  const [atualizarProduto, updating] = useAtualizarProdutoMutation();
  const saving = creating.isLoading || updating.isLoading;
  const [error, setError] = useState('');
  const [loadedId, setLoadedId] = useState('');
  if (id && product && loadedId !== id) {
    setForm({ ...blank, ...product });
    setLoadedId(id);
  }

  function change<K extends keyof Omit<Product, 'id'>>(key: K, value: Omit<Product, 'id'>[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{13}$/.test(form.codigoBarras)) {
      setError('O código de barras deve conter exatamente 13 dígitos (EAN-13).');
      return;
    }
    if (!form.nome.trim() || !form.marca.trim() || !form.familia.trim() || !form.unidade.trim() || form.precoVenda < 0 || form.estoqueAtual < 0) {
      setError('Preencha os campos obrigatórios e informe valores não negativos.');
      return;
    }
    setError('');
    try {
      if (id) await atualizarProduto({ id, dados: form }).unwrap();
      else await criarProduto(form).unwrap();
      navigate('/produtos');
    } catch (cause) {
      setError(apiError(cause));
    }
  }

  const field = (label: string, key: keyof Omit<Product, 'id'>, type = 'text', required = false) => (
    <label className="field" key={key}><span>{label}</span><input type={type} required={required} min={type === 'number' ? 0 : undefined} step={type === 'number' ? '0.01' : undefined} value={String(form[key] ?? '')} onChange={e => change(key, (type === 'number' ? Number(e.target.value) : e.target.value) as never)} /></label>
  );

  return (
    <>
      <div className="page-heading"><div><h2>{id ? 'Editar produto' : 'Cadastrar produto'}</h2><p>Preencha os dados do material de construção.</p></div><Link className="btn secondary" to="/produtos">Voltar</Link></div>
      <section className="panel product-registration">
        {loading ? <p>Carregando produto...</p> : loadError ? <p className="alert error">Falha ao carregar produto da API.</p> : <form onSubmit={submit}>
          <div className="form-grid">
            {field('Nome do produto *', 'nome', 'text', true)}
            {field('Código de barras (EAN-13) *', 'codigoBarras', 'text', true)}
            {field('Marca *', 'marca', 'text', true)}
            <label className="field"><span>Família *</span><select value={form.familia} onChange={e => change('familia', e.target.value)}><option>Alvenaria</option><option>Elétrica</option><option>Hidráulica</option><option>Pintura</option><option>Ferramentas</option><option>Outros</option></select></label>
            {field('Fornecedor', 'fornecedor')}
            {field('Custo (R$)', 'custo', 'number')}
            {field('Preço de venda (R$) *', 'precoVenda', 'number', true)}
            {field('Estoque atual *', 'estoqueAtual', 'number', true)}
            {field('Estoque mínimo', 'estoqueMinimo', 'number')}
            <label className="field"><span>Unidade de medida *</span><select value={form.unidade} onChange={e => change('unidade', e.target.value)}>{['Unidade', 'Saco', 'Metro', 'Litro', 'Quilo', 'Caixa', 'Cartela', 'Par'].map(unit => <option key={unit}>{unit}</option>)}</select></label>
            {field('Desconto à vista (%)', 'descontoVista', 'number')}
            {field('Preço a prazo (R$)', 'precoPrazo', 'number')}
            {field('Validade', 'validade', 'date')}
            {field('Garantia', 'garantia')}
            <label className="field profit-control"><span>Taxa de lucro: {form.taxaLucro}%</span><input type="range" min="0" max="100" value={form.taxaLucro || 0} onChange={e => change('taxaLucro', Number(e.target.value))} /><div className="range-labels"><span>0%</span><span>50%</span><span>100%</span></div></label>
            <label className="check-field"><input type="checkbox" checked={Boolean(form.promocional)} onChange={e => change('promocional', e.target.checked)} /> Produto promocional</label>
          </div>
          {error && <p className="alert error" role="alert">{error}</p>}
          <div className="form-actions"><button className="btn" disabled={saving}>{saving ? 'Salvando...' : 'Salvar produto'}</button><Link className="btn secondary" to="/produtos">Cancelar</Link></div>
        </form>}
      </section>
    </>
  );
}
