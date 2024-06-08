import { DataSource } from "typeorm";
import { Answer, Question, Quiz, User } from "../entities/index";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "elsa-db",
  synchronize: true,
  logging: true,
  entities:[Answer, Question, Quiz, User],
  subscribers: [],
  migrations: [],
});

export { AppDataSource };
