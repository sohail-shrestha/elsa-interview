import "reflect-metadata";

import bodyParser from "body-parser";
import { AppDataSource } from "config/db-config";
import express from "express";
import { leadershipRoute } from "leadership/routes";
import { quizRoute } from "quiz/routes";
import { populateQuiz } from "scripts/populate-db";
import { userRoute } from "user/routes";
import cors from 'cors';

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

app.use(leadershipRoute, userRoute);
app.use(quizRoute);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});




