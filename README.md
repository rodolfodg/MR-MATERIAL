# MR - Material de Construção

Aplicação web de gestão para loja de materiais de construção, desenvolvida com React, Vite e React Router DOM.

## Requisitos
- Node.js 18 ou superior
- npm

## Como executar
1. Extraia o arquivo ZIP.
2. Abra a pasta `mr-material-construcao` no VS Code.
3. Abra o terminal na pasta do projeto.
4. Execute:

```bash
npm install
npm run dev
```

5. Acesse o endereço informado pelo Vite (normalmente http://localhost:5173).

## Funcionalidades incluídas
- Dashboard com indicadores.
- Cadastro, consulta, edição e exclusão de produtos.
- Pesquisa de produtos por código, nome ou código de barras.
- Cadastro, consulta, edição e exclusão de clientes.
- Consulta de estoque e alerta de estoque mínimo.
- Criação de orçamento com seleção de cliente, produtos, quantidades, desconto e impressão.
- Registro demonstrativo de venda.
- Configuração de juros de 1x a 10x.
- Relatório de vendas/orçamentos e impressão.
- Lançamento e consulta de despesas.
- Layout responsivo para desktop, tablet e celular.

## Persistência
Os cadastros deste protótipo são armazenados no `localStorage` do navegador. Isso permite manter os dados no mesmo navegador após atualizar a página, mas não substitui um backend ou banco de dados multiusuário.

## Observação
O projeto foi implementado a partir da descrição textual e da captura de telas fornecidas. Recursos como autenticação, emissão fiscal, integração com meios de pagamento, baixa automática de estoque e relatório real de compras ainda exigem backend e regras de negócio adicionais.
