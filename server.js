import express from "express";
import bodyParser from "body-parser";
import db from "./model/index.js";
import dotenv from "dotenv";
import employeeRouter from "./routes/employee.js";

dotenv.config();
const database = process.env.DATABASE;
console.log("db" + database);
// Create Express app
const app = express();

// Parse JSON request body
app.use(bodyParser.json());

app.use("/", employeeRouter);
app.use("/", (req, res) => {
  res.send("404 not found");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await db.sequelize.sync();
  db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
  console.log(`Server running on port ${port}`);
});
