# MR – Material de Construção

Aplicação de gestão de materiais de construção desenvolvida com **React 18, Vite 6, TypeScript e React Router DOM**. Contém os módulos Produtos (A), Clientes (B) e Orçamentos (C), além de dashboard, estoque, relatórios informativos e acesso demonstrativo.

## Executar

Requer Node.js 18+ e npm.

```bash
npm install
cp .env.example .env
npm run dev
```

No Windows, copie manualmente `.env.example` para `.env` ou execute `copy .env.example .env` no Prompt de Comando. Abra o endereço exibido pelo Vite (normalmente http://localhost:5173).

## Configuração da API

Por padrão, `.env.example` contém `VITE_API_URL=/api`. O Vite encaminha chamadas `/api/*` para `http://localhost:3000`, portanto **o backend local deve estar em execução**. Para usar a API online, edite `VITE_API_URL` com a URL base correta, verificada na documentação Swagger:

https://winnicius.com/tecinfo/labs/api-mr-construcao/docs/



## Funcionalidades

### Módulo A — Produtos 

- `GET /api/produtos`: tabela com código, nome, marca, preço, estoque e unidade; pesquisa; loading e erro.
- `POST /api/produtos`: formulário controlado com EAN-13, marca, família, preço, estoque e unidade.
- `PUT /api/produtos/:id`: edição usando o mesmo formulário de cadastro.
- `DELETE /api/produtos/:id`: exclusão com confirmação e atualização da listagem.

### Módulo B — Clientes 

- `GET /api/clientes`: listagem com nome, telefone, bairro, cidade e ponto de referência.
- `POST /api/clientes`: cadastro com rua, número, bairro, cidade, CEP e ponto de referência obrigatório.
- `PUT /api/clientes/:id`: edição do cadastro.
- `DELETE /api/clientes/:id`: exclusão com confirmação.

### Módulo C — Orçamentos 

- Seleção de cliente, vendedor e produtos.
- Quantidade, subtotais reativos, remoção de itens e desconto.
- Forma de pagamento à vista, com desconto ou parcelada de 1x a 10x.
- `POST /api/orcamentos`: envio de orçamento à API.
- `GET /api/orcamentos`: listagem dos orçamentos e status retornados.

### Outros recursos

- Dashboard e consulta de estoque com indicadores obtidos da API.
- Rotas com `Outlet`, tipagem TypeScript e estados de carregamento/erro.
- Login e redefinição de senha **somente demonstrativos**, usando armazenamento local. **Não é autenticação segura, não envia e-mail e não protege os endpoints da API.**
- Relatórios e vendas são telas informativas; emissão fiscal e baixa automática de estoque não foram implementadas.

## Verificação antes da entrega

```bash
npm run typecheck
npm run build
npm run dev
```
