import express from "express";
import { quizController } from "./controller/quiz.controller";

const app = express();

app.use("/quiz", quizController);

export { app as quizRoute };
