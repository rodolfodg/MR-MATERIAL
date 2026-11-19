import type { Client, Product, Quote } from '../types/models';

const ROOT = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');
export const apiBase = ROOT;

type Envelope<T> = T | { data?: T; resultado?: T; produto?: T; cliente?: T; orcamento?: T };
type Collection<T> = T[] | { data?: T[] | { items?: T[] }; items?: T[]; results?: T[]; produtos?: T[]; clientes?: T[]; orcamentos?: T[] };

function unwrapList<T>(value: Collection<T>): T[] {
  if (Array.isArray(value)) return value;
  const data = value.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return value.items || value.results || value.produtos || value.clientes || value.orcamentos || [];
}

function unwrapOne<T>(value: Envelope<T>, key: 'produto' | 'cliente' | 'orcamento'): T {
  if (typeof value === 'object' && value !== null) {
    const record = value as { data?: T; resultado?: T; produto?: T; cliente?: T; orcamento?: T };
    return record.data || record.resultado || record[key] || value as T;
  }
  return value as T;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${ROOT}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers
      }
    });
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique o servidor, a URL configurada e a política CORS.');
  }
  if (!response.ok) {
    const body = await response.text();
    let detail = body.slice(0, 240);
    try {
      const json = JSON.parse(body) as { message?: string | string[]; erro?: string; error?: string };
      detail = Array.isArray(json.message) ? json.message.join('; ') : json.message || json.erro || json.error || detail;
    } catch { /* Corpo de erro não JSON */ }
    throw new Error(`Erro HTTP ${response.status}: ${detail || response.statusText}`);
  }
  if (response.status === 204) return undefined as T;
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}

export const productsApi = {
  list: async (): Promise<Product[]> => unwrapList(await request<Collection<Product>>('/produtos')),
  get: async (id: string): Promise<Product> => unwrapOne(await request<Envelope<Product>>(`/produtos/${encodeURIComponent(id)}`), 'produto'),
  create: async (data: Omit<Product, 'id'>): Promise<Product> => unwrapOne(await request<Envelope<Product>>('/produtos', { method: 'POST', body: JSON.stringify(data) }), 'produto'),
  update: async (id: string, data: Omit<Product, 'id'>): Promise<Product> => unwrapOne(await request<Envelope<Product>>(`/produtos/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) }), 'produto'),
  remove: (id: string): Promise<void> => request<void>(`/produtos/${encodeURIComponent(id)}`, { method: 'DELETE' })
};

export const clientsApi = {
  list: async (): Promise<Client[]> => unwrapList(await request<Collection<Client>>('/clientes')),
  get: async (id: string): Promise<Client> => unwrapOne(await request<Envelope<Client>>(`/clientes/${encodeURIComponent(id)}`), 'cliente'),
  create: async (data: Omit<Client, 'id'>): Promise<Client> => unwrapOne(await request<Envelope<Client>>('/clientes', { method: 'POST', body: JSON.stringify(data) }), 'cliente'),
  update: async (id: string, data: Omit<Client, 'id'>): Promise<Client> => unwrapOne(await request<Envelope<Client>>(`/clientes/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) }), 'cliente'),
  remove: (id: string): Promise<void> => request<void>(`/clientes/${encodeURIComponent(id)}`, { method: 'DELETE' })
};

export const quotesApi = {
  list: async (): Promise<Quote[]> => unwrapList(await request<Collection<Quote>>('/orcamentos')),
  create: async (data: Omit<Quote, 'id' | 'status'>): Promise<Quote> => unwrapOne(await request<Envelope<Quote>>('/orcamentos', { method: 'POST', body: JSON.stringify(data) }), 'orcamento')
};
