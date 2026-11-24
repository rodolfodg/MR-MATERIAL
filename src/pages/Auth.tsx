import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { login } from '../services/auth';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(''); setLoading(true);
    try { await login(email.trim(), senha); navigate('/', { replace: true }); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Falha ao entrar.'); }
    finally { setLoading(false); }
  }
  return <div className="auth-page">
    <section className="auth-info"><div className="brand-mark large">MR</div><h1>Gestão completa para sua loja.</h1><p>Produtos, clientes, estoque e orçamentos em um único lugar.</p><div className="auth-benefit"><ShieldCheck /> Autenticação pela API</div></section>
    <section className="auth-panel"><div className="auth-card"><span className="eyebrow">MR MATERIAL DE CONSTRUÇÃO</span><h2>Bem-vindo de volta</h2><p>Entre com suas credenciais da API.</p>
      <form onSubmit={submit} className="stack"><label className="field"><span>E-mail</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" /></label>
      <label className="field"><span>Senha</span><input type="password" value={senha} onChange={e => setSenha(e.target.value)} required autoComplete="current-password" /></label>
      {message && <p className="alert error" role="alert">{message}</p>}<button className="btn full" type="submit" disabled={loading}><LockKeyhole size={16}/>{loading ? 'Entrando...' : 'Entrar'}</button></form>
      <Link to="/recuperar-senha" className="auth-link">Esqueci minha senha</Link>
    </div></section></div>;
}

export function RecoverPassword() {
  return <div className="auth-page simple-auth"><section className="auth-panel"><div className="auth-card"><div className="auth-symbol"><Mail size={25}/></div><h2>Recuperação de senha</h2><p>A recuperação depende de um endpoint seguro de redefinição de senha disponibilizado pelo backend. Solicite a redefinição ao administrador.</p><Link className="auth-link" to="/login">Voltar ao login</Link></div></section></div>;
}
