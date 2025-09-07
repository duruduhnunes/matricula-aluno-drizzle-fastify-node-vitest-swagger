BACKEND SOBRE MATRICULAS EM CURSOS DE ALUNOS, COM NODE.JS, FASTIFY, VITEST, SWAGGER.

# Rocket Fastify - API de Cursos e Alunos

Este projeto é uma API RESTful para gerenciamento de **cursos** e **alunos**, construída com [Fastify](https://www.fastify.io/), [Drizzle ORM](https://orm.drizzle.team/), e documentada com Swagger. O objetivo é fornecer uma base robusta para aplicações educacionais, com testes automatizados e2e utilizando [Vitest](https://vitest.dev/).

## Funcionalidades

- Cadastro e listagem de cursos
- Cadastro e listagem de alunos
- Matrícula de alunos em cursos
- Filtros de busca e paginação
- Testes end-to-end (e2e) com Vitest
- Documentação automática com Swagger

## Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente para Node.js.
- **Drizzle ORM**: ORM moderno, seguro e flexível, excelente para praticar SQL e manter controle total sobre as queries.
- **Vitest**: Testes rápidos e simples, com suporte a testes end-to-end.
- **Swagger**: Documentação interativa da API, facilitando o uso e integração.

## Por que usar Drizzle ORM?

O Drizzle ORM é uma ótima escolha para quem deseja praticar SQL de forma segura e tipada, sem abrir mão da flexibilidade. Ele permite escrever queries SQL diretamente em TypeScript, com autocomplete e validação de tipos, tornando o desenvolvimento mais produtivo e seguro.

## Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o banco de dados:**
   - Edite o arquivo `.env` com as credenciais do seu banco.

3. **Rode as migrations (se houver):**
   ```bash
   npm run migrate
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

5. **Acesse a documentação Swagger:**
   - Normalmente disponível em `http://localhost:3333/docs`

6. **Execute os testes e2e:**
   ```bash
   npm run test
   ```

## Estrutura dos Testes

Os testes end-to-end garantem que as rotas principais da API funcionam corretamente, simulando requisições reais e validando as respostas.

## Contribuição

Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests!

---

**Rocket Fastify** — Praticando SQL moderno, tipagem e boas práticas de API!
