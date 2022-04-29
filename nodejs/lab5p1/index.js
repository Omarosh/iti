import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import clientRoutes from "./routes/clientRoutes.js";
dotenv.config({ path: "./.env" });
db().catch((err) => console.log(err));
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
clientRoutes(app);
app.use((err, req, res, next) => {
  res.status(400).send({
    error: err.message,
    stackTrace: err,
  });
});
const port = 5001;
app.listen(port, () => {
  console.log(`App is Running on port ${port} : http://localhost:${port}`);
});
