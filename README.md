# 🚀 Backend - Process Manager

Backend da aplicação Process Manager - Sistema de gestão de processos desenvolvido com NestJS, TypeORM e PostgreSQL.

## 🔧 Instalação com Docker

## 📋 Pré-requisitos

- Ter Docker instalado
- Liberar as portas 5432 e 8080

1. **Criar containers**

```bash
docker-compose up --build
```

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

Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:

```env
CONNECTION=postgres
HOST=localhost
PORT=5432
USERNAME=seu_usuario
PASSWORD=sua_senha
DATABASE=nome_do_banco
```

3. **Criar o banco de dados**

Crie o banco de dados no PostgreSQL com o nome especificado no `.env`:

```sql
CREATE DATABASE nome_do_banco;
```

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

### Modo desenvolvimento (com hot-reload)

```bash
npm run start:dev
```

### Modo produção


O servidor estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:

```
http://localhost:3000/api/docs
```
