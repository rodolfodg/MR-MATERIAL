# Integração Swagger — estado de validação

- Removido o cadastro de conta demonstrativa com senha em texto simples no localStorage.
- Login usa a API, guarda o token apenas na sessão e envia Bearer nas requisições RTK Query e REST legadas.
- Rota de login configurável via VITE_LOGIN_PATH (padrão provisório `/auth/login`).
- O corpo de login `{email, senha}` e os nomes de retorno `token`/`accessToken` **não foram validados contra o JSON OpenAPI**.
- Recuperação de senha local insegura desabilitada; requer endpoint real.
- Produtos e Orçamentos ainda usam REST legado; os contratos completos precisam de confirmação no OpenAPI.
- Não foi possível acessar a documentação online a partir deste ambiente; **não declarar conformidade total**.
- Sem dependências instaladas, não foi possível executar o build nesta sessão.

## Teste manual
1. `npm install`
2. `npm run typecheck && npm run build`
3. Copie `.env.example` para `.env` e ajuste `VITE_API_URL` e `VITE_LOGIN_PATH`.
4. `npm run dev`; valide login e chamadas na aba Network do navegador.
