import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Cliente, ClienteDTO, AtualizarClienteParams } from '../types/cliente.types';
import type { Product, Quote } from '../types/models';
import { getToken } from './auth';

const baseUrl = import.meta.env.VITE_API_URL || '/api';
export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const token = getToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Clientes', 'Produtos', 'Orcamentos'],
  endpoints: builder => ({
    listarClientes: builder.query<Cliente[], string | void>({
      query: busca => busca ? `/clientes?busca=${encodeURIComponent(busca)}` : '/clientes',
      providesTags: result => result ? [
        ...result.map(({ id }) => ({ type: 'Clientes' as const, id })),
        { type: 'Clientes' as const, id: 'LIST' }
      ] : [{ type: 'Clientes' as const, id: 'LIST' }]
    }),
    obterClientePorId: builder.query<Cliente, string>({
      query: id => `/clientes/${encodeURIComponent(id)}`,
      providesTags: (_result, _error, id) => [{ type: 'Clientes', id }]
    }),
    criarCliente: builder.mutation<Cliente, ClienteDTO>({
      query: body => ({ url: '/clientes', method: 'POST', body }),
      invalidatesTags: [{ type: 'Clientes', id: 'LIST' }]
    }),
    atualizarCliente: builder.mutation<Cliente, AtualizarClienteParams>({
      query: ({ id, dados }) => ({ url: `/clientes/${encodeURIComponent(id)}`, method: 'PUT', body: dados }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Clientes', id }, { type: 'Clientes', id: 'LIST' }]
    }),
    excluirCliente: builder.mutation<unknown, string>({
      query: id => ({ url: `/clientes/${encodeURIComponent(id)}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Clientes', id }, { type: 'Clientes', id: 'LIST' }]
    }),
    listarProdutos: builder.query<Product[], void>({ query: () => '/produtos', providesTags: ['Produtos'] }),
    obterProdutoPorId: builder.query<Product, string>({ query: id => `/produtos/${encodeURIComponent(id)}`, providesTags: ['Produtos'] }),
    criarProduto: builder.mutation<Product, Omit<Product, 'id'>>({ query: body => ({ url: '/produtos', method: 'POST', body }), invalidatesTags: ['Produtos'] }),
    atualizarProduto: builder.mutation<Product, { id: string; dados: Omit<Product, 'id'> }>({ query: ({ id, dados }) => ({ url: `/produtos/${encodeURIComponent(id)}`, method: 'PUT', body: dados }), invalidatesTags: ['Produtos'] }),
    excluirProduto: builder.mutation<unknown, string>({ query: id => ({ url: `/produtos/${encodeURIComponent(id)}`, method: 'DELETE' }), invalidatesTags: ['Produtos'] }),
    listarOrcamentos: builder.query<Quote[], void>({ query: () => '/orcamentos', providesTags: ['Orcamentos'] }),
    criarOrcamento: builder.mutation<Quote, Omit<Quote, 'id' | 'status'>>({ query: body => ({ url: '/orcamentos', method: 'POST', body }), invalidatesTags: ['Orcamentos'] })
  })
});
export const { useListarClientesQuery, useObterClientePorIdQuery, useCriarClienteMutation, useAtualizarClienteMutation, useExcluirClienteMutation, useListarProdutosQuery, useObterProdutoPorIdQuery, useCriarProdutoMutation, useAtualizarProdutoMutation, useExcluirProdutoMutation, useListarOrcamentosQuery, useCriarOrcamentoMutation } = rtkApi;
