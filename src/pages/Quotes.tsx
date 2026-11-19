import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Plus, Printer, Trash2 } from 'lucide-react';
import { clientsApi, productsApi, quotesApi } from '../services/api';
import { currency } from './Products';
import type { Client, Product, Quote, QuoteItem } from '../types/models';

export function Quotes() {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [clientId, setClientId] = useState('');
  const [seller, setSeller] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState('À vista');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const [c, p, q] = await Promise.all([clientsApi.list(), productsApi.list(), quotesApi.list()]);
      setClients(c);
      setProducts(p);
      setQuotes(q);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao consultar a API.');
    } finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.subtotal, 0), [items]);
  const total = Math.max(0, subtotal - discount);

  function addItem() {
    const product = products.find(item => String(item.id) === productId);
    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      setError('Selecione um produto e informe uma quantidade inteira maior que zero.');
      return;
    }
    const previousQty = items.find(item => item.produtoId === productId)?.quantidade || 0;
    if (previousQty + quantity > Number(product.estoqueAtual)) {
      setError('Quantidade solicitada supera o estoque disponível.');
      return;
    }
    setError('');
    setItems(previous => {
      const existing = previous.find(item => item.produtoId === productId);
      if (existing) return previous.map(item => item.produtoId === productId ? { ...item, quantidade: item.quantidade + quantity, subtotal: (item.quantidade + quantity) * item.valorUnitario } : item);
      return [...previous, { produtoId: productId, quantidade: quantity, valorUnitario: Number(product.precoVenda), subtotal: quantity * Number(product.precoVenda), nome: product.nome }];
    });
    setProductId('');
    setQuantity(1);
  }

  function updateQty(id: string, value: number) {
    const available = Number(products.find(product => String(product.id) === id)?.estoqueAtual || 0);
    if (!Number.isInteger(value) || value < 1 || value > available) {
      setError(`Informe uma quantidade inteira entre 1 e ${available}.`);
      return;
    }
    setError('');
    setItems(previous => previous.map(item => item.produtoId === id ? { ...item, quantidade: value, subtotal: value * item.valorUnitario } : item));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!clientId || !seller.trim() || !items.length || items.some(item => !Number.isInteger(item.quantidade) || item.quantidade <= 0) || discount < 0 || discount > subtotal) {
      setError('Selecione um cliente, informe o vendedor e adicione itens válidos.');
      return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = { clienteId: clientId, vendedor: seller.trim(), itens: items.map(({ produtoId, quantidade, valorUnitario, subtotal }) => ({ produtoId, quantidade, valorUnitario, subtotal })), desconto: discount, formaPagamento: payment, valorTotal: total };
      const created = await quotesApi.create(payload);
      setSuccess(`Orçamento ${created?.id || ''} registrado na API. Status: ${created?.status || 'consulte o pedido'}.`);
      setItems([]);
      setDiscount(0);
      try {
        setQuotes(await quotesApi.list());
      } catch {
        setSuccess('Orçamento enviado. Não foi possível atualizar a listagem; consulte novamente.');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao gravar orçamento.');
    } finally { setSaving(false); }
  }

  return <>
    <div className="page-heading"><div><h2>Orçamentos e vendas</h2><p>Monte pedidos e registre orçamentos na API.</p></div><button className="btn secondary" onClick={() => window.print()}><Printer size={16} /> Imprimir</button></div>
    {loading ? <p role="status">Carregando clientes, produtos e orçamentos...</p> : <form onSubmit={submit}>
      <section className="panel"><div className="panel-head"><h3>Dados do pedido</h3></div><div className="form-grid">
        <label className="field"><span>Cliente *</span><select required value={clientId} onChange={e => setClientId(e.target.value)}><option value="">Selecione o cliente</option>{clients.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></label>
        <label className="field"><span>Vendedor *</span><input required value={seller} onChange={e => setSeller(e.target.value)} placeholder="Nome do vendedor" /></label>
      </div></section>
      <section className="panel"><div className="panel-head"><h3>Itens do orçamento</h3></div><div className="product-add"><label className="field"><span>Produto</span><select value={productId} onChange={e => setProductId(e.target.value)}><option value="">Selecione o produto</option>{products.map(item => <option key={item.id} value={item.id}>{item.nome} — {currency(Number(item.precoVenda))}</option>)}</select></label><label className="field"><span>Quantidade</span><input type="number" min="1" step="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} /></label><button className="btn" type="button" onClick={addItem}><Plus size={16} /> Adicionar</button></div>
        <div className="table-wrap"><table><thead><tr><th>Produto</th><th>Valor unitário</th><th>Quantidade</th><th>Subtotal</th><th>Ação</th></tr></thead><tbody>{items.map(item => <tr key={item.produtoId}><td>{item.nome}</td><td>{currency(item.valorUnitario)}</td><td><input aria-label={`Quantidade de ${item.nome}`} className="qty" type="number" min="1" step="1" value={item.quantidade} onChange={e => updateQty(item.produtoId, Number(e.target.value))} /></td><td>{currency(item.subtotal)}</td><td><button type="button" className="icon-button" aria-label={`Remover ${item.nome}`} onClick={() => setItems(previous => previous.filter(i => i.produtoId !== item.produtoId))}><Trash2 size={16} /></button></td></tr>)}{!items.length && <tr><td colSpan={5} className="empty">Adicione produtos para iniciar o orçamento.</td></tr>}</tbody></table></div>
      </section>
      <section className="panel"><div className="form-grid"><label className="field"><span>Forma de pagamento</span><select value={payment} onChange={e => setPayment(e.target.value)}>{['À vista', 'Com desconto', ...Array.from({ length: 10 }, (_, index) => `Parcelado ${index + 1}x`)].map(option => <option key={option}>{option}</option>)}</select></label><label className="field"><span>Desconto em R$</span><input type="number" min="0" max={subtotal} step="0.01" value={discount} onChange={e => setDiscount(Number(e.target.value))} /></label></div><div className="total-row"><span>Subtotal: {currency(subtotal)}</span><span>Total do pedido:</span><strong>{currency(total)}</strong></div>{error && <p className="alert error" role="alert">{error}</p>}{success && <p className="alert success" role="status">{success}</p>}<div className="form-actions"><button disabled={saving || !items.length} className="btn">{saving ? 'Registrando...' : 'Fechar orçamento na API'}</button></div></section>
    </form>}
    <section className="panel"><div className="panel-head"><h3>Orçamentos registrados</h3></div><div className="table-wrap"><table><thead><tr><th>Código</th><th>Cliente</th><th>Status</th><th>Total</th></tr></thead><tbody>{quotes.map((item, index) => <tr key={item.id || `orcamento-${index}`}><td className="code">{item.id}</td><td>{clients.find(c => String(c.id) === String(item.clienteId))?.nome || item.clienteId}</td><td>{item.status || '—'}</td><td>{currency(Number(item.valorTotal))}</td></tr>)}{!quotes.length && <tr><td colSpan={4} className="empty">Nenhum orçamento retornado pela API.</td></tr>}</tbody></table></div></section>
  </>;
}
