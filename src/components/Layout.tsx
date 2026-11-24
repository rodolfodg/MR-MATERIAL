import { useState } from 'react';
import { logout as clearAuth } from '../services/auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Boxes, ChartNoAxesCombined, ClipboardList, House, LogOut, Menu, Package, ShoppingCart, Users, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: House },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/estoque', label: 'Estoque', icon: Boxes },
  { to: '/orcamentos', label: 'Orçamentos', icon: ClipboardList },
  { to: '/vendas', label: 'Vendas', icon: ShoppingCart },
  { to: '/relatorios', label: 'Relatórios', icon: ChartNoAxesCombined }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    clearAuth();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      {open && <button className="overlay" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'show' : ''}`}>
        <div className="brand">
          <div className="brand-mark">MR</div>
          <div>
            <strong>MR MATERIAL</strong>
            <small>DE CONSTRUÇÃO</small>
          </div>
          <button className="icon-button close-menu" onClick={() => setOpen(false)} aria-label="Fechar"><X size={18} /></button>
        </div>
        <p className="brand-caption">GESTÃO INTELIGENTE DA LOJA</p>
        <nav className="nav-group">
          <p>MENU PRINCIPAL</p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button className="logout" onClick={logout}><LogOut size={17} /> Sair</button>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Abrir menu" onClick={() => setOpen(true)}><Menu /></button>
          <div><span className="eyebrow">PAINEL ADMINISTRATIVO</span><h1>MR – Material de Construção</h1></div>
          <span className="today">{new Date().toLocaleDateString('pt-BR')}</span>
        </header>
        <main className="content"><Outlet /></main>
        <footer>© {new Date().getFullYear()} MR Material de Construção <span>React + TypeScript • API REST</span></footer>
      </div>
    </div>
  );
}
