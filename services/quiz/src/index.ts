import "reflect-metadata";

import bodyParser from "body-parser";

import { AppDataSource, populateQuiz } from "@elsa-test/common/src/index";
import cors from 'cors';
import express from "express";
import { quizRoute } from "./routes";

const app = express(); 

AppDataSource.initialize().then(async (dataSource) => {
  console.debug("DATA SOURCE", dataSource.manager);

  await populateQuiz(dataSource);
  console.log("DB Initialized");
});
 
app.use(bodyParser.json());
app.use(cors())

app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});
app.use(quizRoute);

app.listen(3002, () => {
  console.log(`Server is running on http://localhost:3002`);
});

