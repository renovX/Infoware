import express from "express";
import bodyParser from "body-parser";
import db from "../model/index.js";

const Employee = db.employees;
const Contact = db.contacts;

const employeeController = {
  getById: async (req, res) => {
    // GET user by ID
    const id = parseInt(req.params.id);
    try {
      const employee = await Employee.findByPk(id, {
        include: [
          {
            model: Contact,
            attributes: ["name", "phoneNumber", "relationship"],
          },
        ],
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });
      if (employee) {
        res.send(employee);
      } else {
        res.send("Employee not found");
      }
    } catch (e) {
      res.send(e.message);
    }
  },

  getList: async (req, res) => {
    // GET user by ID
    const skip = req.query["skip"] ? parseInt(req.query["skip"]) : 0;
    const limit = req.query["limit"] ? parseInt(req.query["limit"]) : 1;
    try {
      const employee = await Employee.findAll({
        offset: skip,
        limit: limit,
        include: [
          {
            model: Contact,
            attributes: ["name", "phoneNumber", "relationship"],
          },
        ],
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });
      if (employee) {
        res.send(employee);
      } else {
        res.send("Employee not found");
      }
    } catch (e) {
      res.send(e.message);
    }
  },
  addEmployee: async (req, res) => {
    // POST new user
    const data = req.body;
    try {
      const newEmployee = await Employee.create({
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,

        //secondaryContact: data.secondaryContact,
      });
      if (data.primaryContact)
        await Contact.create({
          name: data.primaryContact,
          phoneNumber: data.primaryContactNumber,
          relationship: data.primaryContactRelation,
          employeeId: newEmployee.id,
        });
      if (data.secondaryContact)
        await Contact.create({
          name: data.secondaryContact,
          phoneNumber: data.secondaryContactNumber,
          relationship: data.secondaryContactRelation,
          employeeId: newEmployee.id,
        });
      res.send(newEmployee);
    } catch (e) {
      res.send(e.message);
      console.log(e);
    }
  },
  updateEmployee: async (req, res) => {
    // POST new user
    const id = parseInt(req.params.id);
    const data = req.body;
    try {
      const edoc = await Employee.findByPk(id, { include: Contact });
      if (edoc) {
        const newEmployee = await Employee.update(
          {
            fullName: data.fullName ? data.fullName : edoc.fullName,
            jobTitle: data.jobTitle ? data.jobTitle : edoc.jobTitle,
            phoneNumber: data.phoneNumber ? data.phoneNumber : edoc.phoneNumber,
            email: data.email ? data.email : edoc.email,
            address: data.address ? data.address : edoc.address,
            city: data.city ? data.city : edoc.city,
            state: data.state ? data.state : edoc.state,
            //primaryContact: data.primaryContact,
            //secondaryContact: data.secondaryContact,
          },
          { where: { id: id } }
        );
        //updating contacts

        if (data.primaryContact) {
          const pcontact = edoc.contacts[0].dataValues;
          //console.log(pcontact);
          await Contact.update(
            {
              name: data.primaryContact,
              phoneNumber: data.primaryContactNumber
                ? data.primaryContactNumber
                : pcontact.phoneNumber,
              relationship: data.primaryContactRelation
                ? data.primaryContactRelation
                : pcontact.relationship,
            },
            { where: { id: pcontact.id } }
          );
        }
        if (data.secondaryContact) {
          const scontact = edoc.contacts[1].dataValues;
          await Contact.update(
            {
              name: data.secondaryContact,
              phoneNumber: data.secondaryContactNumber
                ? data.secondaryContactNumber
                : scontact.phoneNumber,
              relationship: data.secondaryContactRelation
                ? data.secondaryContactRelation
                : scontact.relationship,
            },
            { where: { id: scontact.id } }
          );
        }
        res.send(newEmployee);
      } else {
        res.send("Employee not found");
      }
    } catch (e) {
      res.send(e.message);
    }
  },

  deleteById: async (req, res) => {
    // DELETE user by ID
    const id = parseInt(req.params.id);
    try {
      await Employee.destroy({ where: { id: id } });
      res.send("Deleted Succesfully");
    } catch (e) {
      res.send(e.message);
    }
  },
};
export default employeeController;
