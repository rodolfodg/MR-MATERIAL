import { useEffect, useState, type FormEvent } from 'react';
import type { ClienteDTO } from '../../types/cliente.types';

const EMPTY: ClienteDTO = { nomeCliente: '', telefone: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', cep: '', pontoReferencia: '' };
const FIELDS: { key: keyof ClienteDTO; label: string; required: boolean }[] = [
  { key: 'nomeCliente', label: 'Nome do cliente', required: true },
  { key: 'telefone', label: 'Telefone / WhatsApp', required: true },
  { key: 'rua', label: 'Rua', required: true },
  { key: 'numero', label: 'Número', required: true },
  { key: 'complemento', label: 'Complemento', required: false },
  { key: 'bairro', label: 'Bairro', required: true },
  { key: 'cidade', label: 'Cidade', required: true },
  { key: 'cep', label: 'CEP', required: true },
  { key: 'pontoReferencia', label: 'Ponto de referência', required: true }
];
export function ClientFormFields({ mode, initialValues, onSubmit, isLoading, onCancel }: {
  mode: 'create' | 'edit'; initialValues?: ClienteDTO; onSubmit: (value: ClienteDTO) => Promise<void>; isLoading?: boolean; onCancel: () => void;
}) {
  const [form, setForm] = useState<ClienteDTO>(initialValues || EMPTY);
  const [error, setError] = useState('');
  useEffect(() => { if (initialValues) setForm(initialValues); }, [initialValues]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    if (FIELDS.some(field => field.required && !String(form[field.key] || '').trim())) { setError('Preencha todos os campos obrigatórios.'); return; }
    if (!/^\d{5}-?\d{3}$/.test(form.cep.trim())) { setError('Informe um CEP válido com 8 dígitos.'); return; }
    await onSubmit(form);
  }
  return <form onSubmit={e => void submit(e)}>
    <div className="form-grid">{FIELDS.map(field => <label className="field" key={field.key}>
      <span>{field.label} {field.required ? '*' : ''}</span>
      <input name={field.key} required={field.required} value={form[field.key] || ''} onChange={e => setForm(previous => ({ ...previous, [e.target.name]: e.target.value }))} />
    </label>)}</div>
    {error && <p className="alert error" role="alert">{error}</p>}
    <div className="form-actions"><button className="btn" type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : mode === 'edit' ? 'Atualizar cliente' : 'Salvar cliente'}</button><button className="btn secondary" type="button" onClick={onCancel}>Cancelar</button></div>
  </form>;
}
