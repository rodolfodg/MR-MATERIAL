import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

const USER_KEY = 'mr_demo_account';
interface DemoAccount { email: string; password: string }

function getAccount(): DemoAccount | null {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) as DemoAccount : null;
  } catch {
    return null;
  }
}

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [setup, setSetup] = useState(!getAccount());

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized || password.length < 6) {
      setMessage('Informe um e-mail válido e uma senha de pelo menos 6 caracteres.');
      return;
    }
    if (setup) {
      localStorage.setItem(USER_KEY, JSON.stringify({ email: normalized, password }));
      setSetup(false);
    } else {
      const account = getAccount();
      if (!account || account.email !== normalized || account.password !== password) {
        setMessage('E-mail ou senha incorretos.');
        return;
      }
    }
    sessionStorage.setItem('mr_demo_session', normalized);
    navigate('/', { replace: true });
  }

  return (
    <div className="auth-page">
      <section className="auth-info">
        <div className="brand-mark large">MR</div>
        <h1>Gestão completa para sua loja.</h1>
        <p>Produtos, clientes, estoque e orçamentos em um único lugar.</p>
        <div className="auth-benefit"><ShieldCheck /> Interface de demonstração</div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <span className="eyebrow">MR MATERIAL DE CONSTRUÇÃO</span>
          <h2>{setup ? 'Criar acesso demonstrativo' : 'Bem-vindo de volta'}</h2>
          <p>{setup ? 'Cadastre um acesso local para testar o sistema.' : 'Entre para acessar o painel de gestão.'}</p>
          <form onSubmit={submit} className="stack">
            <label className="field"><span>E-mail</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seuemail@exemplo.com" autoComplete="email" /></label>
            <label className="field"><span>Senha</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required autoComplete={setup ? 'new-password' : 'current-password'} placeholder="Mínimo 6 caracteres" /></label>
            {message && <p className="alert error" role="alert">{message}</p>}
            <button className="btn full" type="submit"><LockKeyhole size={16} /> {setup ? 'Criar conta e entrar' : 'Entrar'}</button>
          </form>
          {!setup && <Link to="/recuperar-senha" className="auth-link"><KeyRound size={15} /> Esqueci minha senha</Link>}
          <p className="auth-note">Atenção: login local apenas para demonstração. Não protege os dados da API e não deve ser usado em produção.</p>
        </div>
      </section>
    </div>
  );
}

export function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function reset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const account = getAccount();
    if (!account || account.email !== email.trim().toLowerCase()) {
      setMessage('Conta local não encontrada para este e-mail.');
      return;
    }
    if (password.length < 6) {
      setMessage('A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    localStorage.setItem(USER_KEY, JSON.stringify({ ...account, password }));
    setMessage('Senha local alterada. Volte para a tela de login.');
  }

  return (
    <div className="auth-page simple-auth">
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-symbol"><Mail size={25} /></div>
          <h2>Recuperar senha</h2>
          <p>Redefina a senha da conta demonstrativa cadastrada neste navegador.</p>
          <form className="stack" onSubmit={reset}>
            <label className="field"><span>E-mail cadastrado</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
            <label className="field"><span>Nova senha</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} /></label>
            {message && <p className="alert" role="status">{message}</p>}
            <button className="btn full" type="submit">Redefinir senha local</button>
          </form>
          <Link className="auth-link" to="/login">Voltar ao login</Link>
          <p className="auth-note">Não há envio de e-mail nem recuperação segura por token. Para produção, implemente autenticação e recuperação no backend.</p>
        </div>
      </section>
    </div>
  );
}
