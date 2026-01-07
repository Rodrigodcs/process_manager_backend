import { config } from 'dotenv';

config();

export const ApiConfig = {
    PORT: Number(process.env.PORT) ?? 8080,
}

export const ormEnvConfig = {
    CONNECTION: process.env.TYPEORM_CONNECTION as
        | 'postgres'
        | 'mysql'
        | 'mariadb'
        | 'sqlite'
        | 'oracle'
        | 'mssql',
    HOST: process.env.TYPEORM_HOST,
    USERNAME: process.env.TYPEORM_USERNAME,
    PASSWORD: process.env.TYPEORM_PASSWORD,
    DATABASE: process.env.TYPEORM_DATABASE,
    PORT: process.env.TYPEORM_PORT,
    // SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
    // LOGGING: process.env.TYPEORM_LOGGING,
    // ENTITIES: process.env.TYPEORM_ENTITIES,
    // MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
    // MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,
};

export const mongoConfig = {
    MAIN_URL: process.env.MAIN_URL,
};

export const rabbitMqConnection = {
    PREFIX: process.env.RABBITMQ_PREFIX,
    URL: process.env.RABBITMQ_URL,
    PORT: process.env.RABBITMQ_PORT,
    USER: process.env.RABBITMQ_USER,
    PASSWORD: process.env.RABBITMQ_PASSWORD,
    MESSAGE_RETRY_MESSAGE_TIME:
        Number(process.env.RABBITMQ_RETRY_MESSAGE_TIME) || 180000,
    MESSAGE_TTL: Number(process.env.RABBITMQ_TTL) || 7200000,
    PREFETCH_COUNT: Number(process.env.RABBITMQ_PREFETCH_COUNT) || 50,
    RABBIT_MQ_RETRY_TIME_LIMIT:
        Number(process.env.RABBITMQ_RETRY_TIME_LIMIT) || 200,
};