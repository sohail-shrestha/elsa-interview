import { AppDataSource } from "@elsa-test/common/src";
import bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import "reflect-metadata";
import { authRouter } from "routes";

const app = express(); 

AppDataSource.initialize().then(appDataSource => {
  console.log("App data source initialized.")
})

app.use(bodyParser.json());
app.use(cors())

app.get("auth/test", (req, res) => {
    res.json({ status: "ok" });
  });
  
app.use(authRouter)

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);
  });


export { authMiddleware } from '../src/middleware/auth.middleware';
