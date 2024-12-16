import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: false,
    entities: ['**/*.entity.ts'],
    migrations: ['src/database/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true,
  });
  
  export default AppDataSource;