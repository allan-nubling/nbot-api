# api-development-setup

Este repositório tem como objetivo ser a base para outros projetos de microserviços que usem  Node.js dockerizado, Express como framework de api, sejam desenvolvidos em TS, Jest para testes unitarios e github-actions para CI.

Tenha certeza que você possui o Docker e Docker Compose(>=1.27.4) instalados.

- Crie /.env igual o /.env.example

## Testes:

Utilizamos Jest e Supertest para realizar os testes da aplicação.

```sh
run $ docker-compose -f docker-test.yml up
ou
run $ npm run docker:test
ou
run $ npm run test
```

## Dev:

Utilizamos ts-node-dev para recarregar a api sempre que salvarmos um arquivo.

```sh
run $ docker-compose up
ou
run $ npm run docker:dev
ou
run $ npm run dev
```

## Deploy:

Ainda em construção.
