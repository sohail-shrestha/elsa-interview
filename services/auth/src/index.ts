import "reflect-metadata";

import bodyParser from "body-parser";

import cors from 'cors';
import express from "express";

const app = express(); 

 
app.use(bodyParser.json());
app.use(cors())

app.get("auth/test", (req, res) => {
    res.json({ status: "ok" });
  });
  
  app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);
  });