import { Router } from "express";
import employeeController from "../controller/employee.js";
const employeeRouter = Router();
employeeRouter.get("/get-employee/:id", employeeController.getById);
employeeRouter.get("/get-employee", employeeController.getList);
employeeRouter.post("/add-employee", employeeController.addEmployee);
employeeRouter.post("/update-employee/:id", employeeController.updateEmployee);
employeeRouter.delete("/delete-employee/:id", employeeController.deleteById);
export default employeeRouter;
