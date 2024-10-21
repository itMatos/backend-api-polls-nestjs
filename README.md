<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Teste técnico

## Descrição
Este backend gerencia um sistema de enquetes, permitindo que usuários criem enquetes, definam opções de resposta e registrem seus votos. A aplicação segue um modelo baseado em RESTful APIs.

## Tecnologias

Para esse teste foram utilizadas as seguintes tecnologias:
- NodeJS
- Typescript
- NestJS
- Postgres

## Para executar o projeto

```bash
# development
$ npm run start:dev
```

## Estrutura do Banco de Dados

### 1. Tabela `polls`
Armazena as informações das enquetes criadas.

- **poll_id** (UUID): Identificador único da enquete (chave primária).
- **title** (VARCHAR 50): Título da enquete, obrigatório.
- **description** (VARCHAR 100): Descrição da enquete, opcional.
- **beginning_date** (DATE): Data de início da enquete, obrigatória.
- **end_date** (DATE): Data de término da enquete, opcional. Deve ser maior que `beginning_date`.
- **mult_choice** (BOOLEAN): Define se a enquete permite múltiplas escolhas. Padrão: `FALSE`.

**Constraints**:
- `PK_polls`: Chave primária composta por `poll_id`.
- `ck_start_end`: Valida que a data de término (`end_date`) deve ser maior que a data de início (`beginning_date`).

### 2. Tabela `answer_options`
Armazena as opções de resposta para cada enquete.

- **poll_id** (UUID): Identificador da enquete (chave estrangeira).
- **answer** (VARCHAR 50): Texto da resposta. É uma chave primária composta com o `poll_id`.

**Constraints**:
- `PK_answers`: Chave primária composta por `poll_id` e `answer`.
- `FK_answers_options`: Chave estrangeira referenciando `polls(poll_id)`, com `ON DELETE CASCADE` e `ON UPDATE CASCADE`.

### 3. Tabela `users`
Armazena os usuários da aplicação.

- **user_uuid** (UUID): Identificador único do usuário (chave primária).
- **name** (VARCHAR 60): Nome do usuário, obrigatório.
- **email** (VARCHAR 50): E-mail do usuário, obrigatório.

**Constraints**:
- `PK_user`: Chave primária composta por `user_uuid`.

### 4. Tabela `votes`
Armazena os votos de cada usuário para as enquetes.

- **user_id** (UUID): Identificador do usuário (chave estrangeira).
- **poll_id** (UUID): Identificador da enquete (chave estrangeira).
- **answer** (VARCHAR 50): Resposta escolhida pelo usuário (chave estrangeira).
- **vote_date** (DATE): Data em que o voto foi registrado, obrigatória.

**Constraints**:
- `PK_votes`: Chave primária composta por `user_id`, `poll_id` e `answer`.
- `FK_user_vote`: Chave estrangeira referenciando `users(user_uuid)`.
- `FK_poll_vote`: Chave estrangeira referenciando `answer_options(poll_id, answer)`.

## Funcionalidades da API

### Endpoints

#### 1. Criar Enquete
- **Endpoint**: `POST /polls`
- **Descrição**: Cria uma nova enquete com as opções fornecidas.
- **Body**:
  ```json
  {
    "title": "Título da enquete",
    "description": "Descrição da enquete",
    "beginning_date": "2024-10-20",
    "end_date": "2024-10-25",
    "mult_choice": false,
    "options": ["Opção 1", "Opção 2"]
  }
 #### 2. Listar Enquetes
- **Endpoint**: `GET /polls`
- **Descrição**: Retorna uma lista de todas as enquetes criadas.
  ```json
  {
    "title": "Título da enquete",
    "description": "Descrição da enquete",
    "beginning_date": "2024-10-20",
    "end_date": "2024-10-25",
    "mult_choice": false,
    "answer_options": ["Opção 1", "Opção 2"]
  }

### 3. Obter Detalhes de uma Enquete
- **Endpoint**: `GET /polls/:poll_id`
- **Descrição**: Traz detalhes de uma enquete a partir do id


### 4. Registrar Voto
- **Endpoint**: `POST /votes`
- **Descrição**: Registra o voto de um usuário para uma enquete específica.
- **Body**:
  ```json
  {
    "user_id": "uuid-usuario",
    "answer": "Opção 1"
  }
### 5. Listar Votos
- **Endpoint**: `GET /votes`
- **Descrição**: Retorna todos os votos de todas as enquetes
- **Body**:
  ```json
  {
    "user_id uuid": "uuid-usuario",
    "answer": "Opção 1",
    "poll_id": "id da enquete"
  }
### 6. Listar usuários
- **Endpoint**: `GET /user`
- **Descrição**: Lista todos os usuários criados
- **Body**:
  ```json
  {
    "user_id": "id do usuario",
    "name": "Nome do usuario",
    "email": "Email do usuário"
  }
