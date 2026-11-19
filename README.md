# MR – Material de Construção

Aplicação de gestão de materiais de construção desenvolvida com **React 18, Vite 6, TypeScript e React Router DOM**. Contém os módulos Produtos (A), Clientes (B) e Orçamentos (C), além de dashboard, estoque, relatórios informativos e acesso demonstrativo.

## Identificação da entrega

- **Projeto:** MR – Material de Construção
- **Autor(a):** PREENCHER NOME COMPLETO
- **Turma:** PREENCHER TURMA
- **Repositório GitHub:** PREENCHER URL DO REPOSITÓRIO
- **Checkpoint:** dia 23, até 23h59 — módulos A e B
- **Entrega final:** dia 25, até 23h59 — módulos A, B e qualidade arquitetural; módulo C para bônus

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

**Atenção:** a compatibilidade exata dos campos do payload e o prefixo online dependem da documentação oficial e precisam ser validados no ambiente do professor. O proxy local não resolve problemas de CORS em requisições diretas à API online.

## Funcionalidades

### Módulo A — Produtos (obrigatório)

- `GET /api/produtos`: tabela com código, nome, marca, preço, estoque e unidade; pesquisa; loading e erro.
- `POST /api/produtos`: formulário controlado com EAN-13, marca, família, preço, estoque e unidade.
- `PUT /api/produtos/:id`: edição usando o mesmo formulário de cadastro.
- `DELETE /api/produtos/:id`: exclusão com confirmação e atualização da listagem.

### Módulo B — Clientes (obrigatório)

- `GET /api/clientes`: listagem com nome, telefone, bairro, cidade e ponto de referência.
- `POST /api/clientes`: cadastro com rua, número, bairro, cidade, CEP e ponto de referência obrigatório.
- `PUT /api/clientes/:id`: edição do cadastro.
- `DELETE /api/clientes/:id`: exclusão com confirmação.

### Módulo C — Orçamentos (bônus)

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

Testar manualmente criação, edição, listagem e exclusão de produtos e clientes; endereço e ponto de referência; inclusão de vários itens; cálculo dos totais; gravação do orçamento; erros HTTP; console sem avisos de `key`; e configuração de CORS. **A presença de código não comprova o funcionamento da API.**

## GitHub

```bash
git add .
git commit -m "feat: integra modulos de produtos clientes e orcamentos"
git push origin main
```

Preencha a identificação acima antes de enviar o link do repositório.
