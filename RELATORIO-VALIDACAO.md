# Revisão dos requisitos — 23/11/2026

## Alterações desta versão
- Produtos: listagem, leitura individual, criação, edição e exclusão migradas para hooks RTK Query; invalidação automática da tag Produtos.
- Orçamentos: consultas de clientes/produtos/orçamentos e criação migradas para hooks RTK Query; invalidação automática de Orçamentos.
- Clientes: CRUD com RTK Query mantido; validação do ponto de referência mantida.
- Layout, rotas, estilos e formulários existentes preservados.

## Limitações importantes
- Não foi possível obter a especificação OpenAPI completa do Swagger oficial neste ambiente. Os nomes dos campos e payloads, principalmente de Produtos e Orçamentos, ainda exigem comparação com o JSON do Swagger.
- Login `/auth/login` permanece configurável e provisório, aguardando confirmação do contrato oficial.
- A instalação das dependências excedeu o tempo de execução disponível; não foi possível comprovar `npm run build` nem integração real.
- Nenhuma alteração foi enviada ao GitHub.

## Execução
`npm install`, `npm run typecheck`, `npm run build`, `npm run dev`.
Configure `.env` a partir de `.env.example` com URL de API adequada.
