export default (): IEnv => ({
  port: parseInt(String(process.env.PORT), 10) || 3000,
  postgres: {
    host: String(process.env.POSTGRES_HOST),
    port: parseInt(String(process.env.POSTGRES_PORT), 10) || 5432,
    username: String(process.env.POSTGRES_USER_NAME),
    password: String(process.env.POSTGRES_PASSWORD),
    name: String(process.env.POSTGRES_DATABASE_NAME),
  },
  mongoReadUri: String(process.env.MONGO_READ_DB_URI),
  mongoEventStoreUri: String(process.env.MONGO_EVENT_STORE_DB_URI),
});

export interface IPostgresDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface IEnv {
  port: number;
  postgres: IPostgresDatabaseConfig;
  mongoReadUri: string;
  mongoEventStoreUri: string;
}
