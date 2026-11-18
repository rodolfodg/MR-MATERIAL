# MR – Material de Construção

Aplicação web de gestão para lojas de materiais de construção, desenvolvida com **React, Vite e React Router DOM**, com interface responsiva e armazenamento local dos dados.

## 1. Tecnologias utilizadas

- React
- Vite
- JavaScript (JSX)
- React Router DOM
- CSS3
- LocalStorage

## 2. Requisitos para execução

- Node.js 18 ou superior
- npm
- Visual Studio Code (recomendado)

## 3. Como executar o projeto

1. Extraia o arquivo ZIP do projeto.
2. Abra a pasta `mr-material-construcao` no Visual Studio Code.
3. Abra o terminal na pasta raiz do projeto.
4. Instale as dependências:

```bash
npm install
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6. Acesse o endereço informado pelo Vite, normalmente:

[http://localhost:5173](http://localhost:5173)

## 4. Funcionalidades implementadas

### Dashboard
- Painel inicial com indicadores da loja.
- Resumo das informações de produtos, clientes e movimentações.

### Produtos
- Cadastro de produtos.
- Consulta, edição e exclusão.
- Pesquisa por código, nome ou código de barras.
- Informações de marca, preço e estoque.
- Controle de estoque mínimo.
- Informações de validade e promoção.
- Cadastro de custo, preço de venda e taxa de lucro.

### Clientes
- Cadastro de clientes.
- Consulta, edição e exclusão.
- Registro de telefone e endereço.

### Estoque
- Consulta dos produtos cadastrados.
- Visualização das quantidades disponíveis.
- Alertas de estoque mínimo.

### Orçamentos
- Criação de orçamentos.
- Seleção de clientes.
- Pesquisa e seleção de produtos.
- Definição de quantidades.
- Aplicação de descontos.
- Cálculo do valor total.
- Impressão de orçamentos.

### Vendas
- Registro demonstrativo de vendas.
- Seleção de produtos e quantidades.

### Configurações
- Configuração de taxas de juros.
- Parcelamento de 1x a 10x.

### Relatórios
- Consulta de vendas e orçamentos.
- Visualização dos registros.
- Opção de impressão.

### Despesas
- Lançamento de despesas.
- Consulta dos registros cadastrados.

## 5. Persistência de dados

Os cadastros deste protótipo são armazenados no `localStorage` do navegador.

Isso permite manter os dados no mesmo navegador após atualizar ou fechar a página.

**Importante:** o armazenamento local não substitui um backend ou banco de dados. Os dados não são compartilhados automaticamente entre computadores ou usuários diferentes.

## 6. Responsividade

A interface foi estruturada para funcionar em:

- Computadores (desktop).
- Tablets.
- Celulares.

O layout se adapta aos diferentes tamanhos de tela, facilitando o acesso às funcionalidades do sistema.

## 7. Limitações e melhorias futuras

O projeto representa um protótipo funcional de gestão comercial. Algumas funcionalidades ainda precisam de implementação complementar para uso em ambiente de produção:

- Autenticação e controle de acesso por usuário.
- Backend e banco de dados centralizado.
- Emissão de notas fiscais.
- Integração com meios de pagamento.
- Baixa automática de estoque após a venda.
- Relatórios reais de compras.
- Controle completo de entradas e saídas de mercadorias.
- Backup e recuperação de dados.

## 8. Considerações finais

O **MR – Material de Construção** tem como objetivo facilitar o gerenciamento das atividades de uma loja de materiais de construção, reunindo em uma única aplicação o controle de produtos, clientes, estoque, orçamentos, vendas, despesas e relatórios.

A estrutura foi desenvolvida para permitir futuras expansões, integrações e melhorias.