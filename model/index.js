import { Sequelize, DataTypes } from "sequelize";
import Employee from "./Employee.js";
import Contact from "./Contacts.js";
import dotenv from "dotenv";
dotenv.config();
const database = process.env.DATABASE;
const user = process.env.USER;
const passwd = process.env.PASSWORD;
console.log("db" + database);
const sequelize = new Sequelize(database, user, passwd, {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = Employee(sequelize, DataTypes);
db.contacts = Contact(sequelize, DataTypes);

db.employees.hasMany(db.contacts, { onDelete: "cascade" });
db.contacts.belongsTo(db.employees);

export default db;
