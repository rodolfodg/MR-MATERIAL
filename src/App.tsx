import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Boxes, ClipboardList, Package, Users } from 'lucide-react';
import Layout from './components/Layout';
import { Login, RecoverPassword } from './pages/Auth';
import { Products, ProductForm, currency } from './pages/Products';
import { Clients, ClientForm } from './pages/Clients';
import { Quotes } from './pages/Quotes';
import { apiBase, clientsApi, productsApi } from './services/api';
import type { Client, Product } from './types/models';

function Protected({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return sessionStorage.getItem('mr_demo_session') ? <>{children}</> : <Navigate to="/login" replace state={{ from: location }} />;
}

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productsApi.list(), clientsApi.list()]).then(([p, c]) => {
      setProducts(p);
      setClients(c);
    }).catch(cause => setError(cause instanceof Error ? cause.message : 'Erro na API.'))
      .finally(() => setLoading(false));
  }, []);

  const low = products.filter(item => Number(item.estoqueAtual) <= Number(item.estoqueMinimo || 0)).length;
  return <>
    <div className="welcome"><div><span className="eyebrow light">VISÃO GERAL</span><h2>Bem-vindo ao painel MR!</h2><p>Acompanhe sua loja em tempo real, diretamente da API.</p></div><Boxes size={70} /></div>
    {loading && <p role="status">Carregando indicadores...</p>}
    {error && <p className="alert error" role="alert">{error}</p>}
    <div className="stats-grid"><div className="stat-card"><div className="stat-icon blue"><Package /></div><div><span>Produtos</span><strong>{products.length}</strong></div></div><div className="stat-card"><div className="stat-icon green"><Users /></div><div><span>Clientes</span><strong>{clients.length}</strong></div></div><div className="stat-card"><div className="stat-icon orange"><Boxes /></div><div><span>Estoque baixo</span><strong>{low}</strong></div></div><div className="stat-card"><div className="stat-icon purple"><ClipboardList /></div><div><span>Integração</span><strong>REST</strong></div></div></div>
    <section className="panel"><div className="panel-head"><h3>Acesso rápido</h3></div><div className="quick-grid"><Link to="/produtos/novo">Cadastrar produto</Link><Link to="/clientes/novo">Cadastrar cliente</Link><Link to="/orcamentos">Novo orçamento</Link><Link to="/estoque">Consultar estoque</Link></div><p className="muted">API configurada: <code>{apiBase}</code></p></section>
  </>;
}

function Stock() {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => { productsApi.list().then(setItems).catch(cause => setError(cause instanceof Error ? cause.message : 'Erro na API.')).finally(() => setLoading(false)); }, []);
  return <><div className="page-heading"><div><h2>Estoque</h2><p>Quantidade disponível e alertas de reposição.</p></div></div><section className="panel">{loading && <p>Carregando estoque...</p>}{error && <p className="alert error">{error}</p>}<div className="table-wrap"><table><thead><tr><th>Produto</th><th>Unidade</th><th>Estoque atual</th><th>Estoque mínimo</th><th>Situação</th></tr></thead><tbody>{items.map(item => <tr key={item.id}><td>{item.nome}</td><td>{item.unidade}</td><td>{item.estoqueAtual}</td><td>{item.estoqueMinimo || 0}</td><td><span className={`pill ${Number(item.estoqueAtual) <= Number(item.estoqueMinimo || 0) ? 'warning' : 'success'}`}>{Number(item.estoqueAtual) <= Number(item.estoqueMinimo || 0) ? 'Baixo' : 'Normal'}</span></td></tr>)}</tbody></table></div></section></>;
}

function Reports() {
  return <><div className="page-heading"><div><h2>Relatórios</h2><p>Relatórios comerciais e impressão.</p></div><button className="btn" onClick={() => window.print()}>Imprimir</button></div><section className="panel"><h3>Resumo de operação</h3><p>Para consultar os orçamentos gravados, acesse a tela de Orçamentos. Relatórios financeiros completos dependem de endpoints específicos do backend.</p><Link className="btn secondary" to="/orcamentos">Ver orçamentos</Link></section></>;
}

function Sales() {
  return <><div className="page-heading"><div><h2>Vendas</h2><p>Emissão comercial</p></div></div><section className="panel"><h3>Orçamentos e fechamento</h3><p>Monte e registre pedidos no módulo de Orçamentos. A conversão em venda e a baixa automática do estoque exigem endpoints e regras específicas do backend.</p><Link className="btn" to="/orcamentos">Abrir orçamentos</Link></section></>;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/recuperar-senha" element={<RecoverPassword />} />
    <Route element={<Protected><Layout /></Protected>}>
      <Route index element={<Dashboard />} />
      <Route path="produtos" element={<Products />} />
      <Route path="produtos/novo" element={<ProductForm />} />
      <Route path="produtos/:id/editar" element={<ProductForm />} />
      <Route path="clientes" element={<Clients />} />
      <Route path="clientes/novo" element={<ClientForm />} />
      <Route path="clientes/:id/editar" element={<ClientForm />} />
      <Route path="estoque" element={<Stock />} />
      <Route path="orcamentos" element={<Quotes />} />
      <Route path="vendas" element={<Sales />} />
      <Route path="relatorios" element={<Reports />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export { currency };
