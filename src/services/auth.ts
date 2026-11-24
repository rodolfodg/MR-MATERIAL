/** Integração de autenticação. Confirme o caminho e o JSON no OpenAPI da instalação. */
const base = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
const loginPath = import.meta.env.VITE_LOGIN_PATH || '/auth/login';
const TOKEN_KEY = 'mr_api_token';

export function getToken(): string | null { return sessionStorage.getItem(TOKEN_KEY); }
export function logout(): void { sessionStorage.removeItem(TOKEN_KEY); }

export async function login(email: string, senha: string): Promise<void> {
  const response = await fetch(`${base}${loginPath}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body && typeof body === 'object' && 'message' in body && typeof body.message === 'string' ? body.message : `Erro HTTP ${response.status} ao autenticar.`;
    throw new Error(message);
  }
  const record = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const nested = record.data && typeof record.data === 'object' ? record.data as Record<string, unknown> : {};
  const token = record.token ?? record.accessToken ?? nested.token ?? nested.accessToken;
  if (typeof token !== 'string' || !token) throw new Error('A resposta de login não contém token. Confira o contrato do Swagger.');
  sessionStorage.setItem(TOKEN_KEY, token);
}
