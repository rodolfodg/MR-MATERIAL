export interface Cliente {
  id: string;
  nomeCliente: string;
  telefone: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  cep: string;
  pontoReferencia?: string;
}
export type ClienteDTO = Omit<Cliente, 'id'>;
export interface AtualizarClienteParams { id: string; dados: ClienteDTO }
