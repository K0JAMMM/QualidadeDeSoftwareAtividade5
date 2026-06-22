# Testes E2E e de API — SQA Social Media

Projeto de testes automatizados criado com **Playwright** (TypeScript), cobrindo:

- **2+ testes E2E** (caixa-preta, navegador) sobre o frontend Next.js
- **4+ testes de API** (caixa-preta) sobre os endpoints Spring Boot

> Continuação da Atividade 4. Os testes validam o sistema **em execução**,
> simulando um usuário real no navegador e exercitando os endpoints públicos da API.

## Estrutura

```
tests/
├── package.json
├── playwright.config.ts        # dois projetos: "api" e "e2e"
├── tsconfig.json
└── tests/
    ├── api/
    │   ├── auth.spec.ts        # signup/signin (sucesso, duplicado, inválido, 401)
    │   └── posts.spec.ts       # GET /posts e /posts/liked
    ├── e2e/
    │   ├── signup.spec.ts      # fluxo de cadastro -> feed
    │   └── like.spec.ts        # curtir sem autenticação -> alerta
    └── utils/
        └── data.ts             # geradores de e-mail/senha de teste
```

## Pré-requisitos

O sistema precisa estar **rodando** antes dos testes:

```bash
# Terminal 1 — API (porta 8080), requer MySQL configurado
cd ../api
./mvnw spring-boot:run

# Terminal 2 — Frontend (porta 3000)
cd ../client
npm install
npm run dev
```

## Como configurar (do zero)

Este projeto foi inicializado seguindo a documentação oficial do Playwright.
Para reproduzir a instalação:

```bash
cd tests
npm install
npx playwright install        # baixa os navegadores
```

## Como executar

```bash
npm test            # roda todos os testes (API + E2E)
npm run test:api    # apenas testes de API
npm run test:e2e    # apenas testes E2E
npm run test:headed # E2E com navegador visível
npm run test:ui     # modo interativo do Playwright
npm run report      # abre o último relatório HTML
```

## Configuração de URLs

As URLs podem ser sobrescritas por variáveis de ambiente (padrões entre parênteses):

- `BASE_URL` — frontend, usado nos testes E2E (`http://localhost:3000`)
- `API_URL` — API, usada nos testes de API (`http://localhost:8080`)

```bash
API_URL=http://localhost:8080 BASE_URL=http://localhost:3000 npm test
```

## Testes implementados

### API (`tests/api`)

| # | Teste | Esperado |
|---|-------|----------|
| 1 | `POST /auth/signup` com dados válidos | 200 + `{ id, email }` |
| 2 | `POST /auth/signup` com e-mail duplicado | 409 "E-mail já está em uso" |
| 3 | `POST /auth/signup` com senha inválida | 422 "Senha inválida" |
| 4 | `POST /auth/signin` com credenciais válidas | 200 + `{ id, email }` |
| 5 | `POST /auth/signin` com senha incorreta | 401 "Credenciais inválidas" |
| 6 | `GET /posts` paginado | 200 + lista de posts |
| 7 | `GET /posts/liked` sem `userId` | erro 4xx |

### E2E (`tests/e2e`)

| # | Teste | Fluxo |
|---|-------|-------|
| 1 | Cadastro de usuário | preencher formulário → redireciona ao feed autenticado |
| 2 | Curtir sem autenticação | clicar em "Curtir" → alerta pedindo login |

## Observações

- Os e-mails de teste são gerados com timestamp único para evitar conflito de
  duplicidade entre execuções (ver `tests/utils/data.ts`).
- A senha de teste (`Senha@123`) satisfaz a regra da API: mínimo 8 caracteres,
  com maiúscula, minúscula, número e caractere especial.
