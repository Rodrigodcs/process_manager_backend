# 🚀 Backend - Process Manager

Backend da aplicação Process Manager - Sistema de gestão de processos desenvolvido com NestJS, TypeORM e PostgreSQL.

## 🔧 Instalação com Docker

## 📋 Pré-requisitos

- Ter Docker instalado
- Liberar as portas 5432 e 8080

## ▶️ Executar o Servidor

```bash
docker-compose up --build
```

O servidor estará disponível em: `http://localhost:8080`
A documentação estará disponível em: `http://localhost:8080/api/docs`


## 🔧 Instalação para desenvolvimento

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 12+ instalado e rodando
- npm ou yarn

1. **Instalar dependências**

```bash
npm install
```

2. **Configurar variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto backend com as mesmas variáveis do .env.example:

3. **Criar o banco de dados**

Crie o banco de dados no PostgreSQL ou suba um container com as expecificações do `.env`:

## 🗃️ Migrations

Execute as migrations para criar as tabelas no banco de dados:

```bash
npm run migration:run
```

## 🌱 Seeds (Opcional)

Para popular o banco com dados iniciais (5 departamentos, 3 documentos, 11 ferramentas e 20 pessoas):

```bash
npm run seed
```

## ▶️ Executar o Servidor

```bash
npm run start:dev
```

O servidor estará disponível em: `http://localhost:8080`
A documentação estará disponível em: `http://localhost:8080/api/docs`
