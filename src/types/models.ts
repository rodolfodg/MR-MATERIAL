export interface Product {
  id: string;
  nome: string;
  codigoBarras: string;
  marca: string;
  familia: string;
  precoVenda: number;
  estoqueAtual: number;
  unidade: string;
  fornecedor?: string;
  custo?: number;
  estoqueMinimo?: number;
  validade?: string;
  garantia?: string;
  promocional?: boolean;
  descontoVista?: number;
  precoPrazo?: number;
  taxaLucro?: number;
}

export interface Client {
  id: string;
  nomeCliente: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  pontoReferencia: string;
  complemento?: string;
}

export interface QuoteItem {
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
  nome?: string;
}

export interface Quote {
  id: string;
  clienteId: string;
  vendedor: string;
  itens: QuoteItem[];
  desconto: number;
  formaPagamento: string;
  valorTotal: number;
  status: string;
  criadoEm?: string;
}
