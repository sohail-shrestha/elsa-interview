import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "elsa-db",
  synchronize: true,
  logging: true,
  entities: ["./src/**/entity/*.ts"],
  subscribers: [],
  migrations: [],
});

export { AppDataSource };
