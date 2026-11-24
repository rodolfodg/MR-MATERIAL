# MR Material de Construção — Atualização pelos quatro PDFs

## Mudanças
- Ponto de entrada TypeScript (`src/main.tsx`), React Router e Provider do Redux.
- Serviço RTK Query central em `src/services/rtkApi.ts`, com tags para Clientes, Produtos e Orçamentos.
- CRUD de Clientes usando `nomeCliente`, DTO, formulário compartilhado, confirmação de exclusão, mensagens de erro e invalidação automática de cache.
- Layout e telas originais de Produtos, Orçamentos, Estoque, Vendas e Relatórios preservados.
- Os demais módulos ainda utilizam o serviço REST anterior em `src/services/api.ts`; endpoints RTK correspondentes estão preparados para migração.

## Executar
```bash
npm install
npm run typecheck
npm run build
npm run dev
```
Configure `VITE_API_URL=http://localhost:3000/api` em `.env` ou utilize o proxy `/api` do Vite.

## Atenção
- O login do repositório original é **somente demonstrativo**, com senha armazenada no navegador, e não protege a API. Não use em produção.
- O endpoint `/api/clientes` do guia exige Bearer Token; configure um token válido em `sessionStorage` sob `mr_api_token` apenas para teste. A integração com login real depende do backend.
- O guia sequencial exige ponto de referência obrigatório, embora o dicionário de dados do guia de integração o descreva como opcional. Neste pacote o formulário exige o campo, conforme o requisito do módulo B.
- A API deve responder arrays de clientes e objetos de cliente diretamente, conforme contrato do PDF.
- Não foi possível executar `npm install` neste ambiente (tempo esgotado), portanto a compilação e integração com servidor real ainda precisam ser validadas localmente.
