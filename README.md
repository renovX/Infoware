# Infoware
Backend Assignment for Infoware 

# Installing
```console
npm i
```
# Commands to Start Server
```console
npm start 
npm run dev //nodemon
```
# API Endpoints
```console
http://localhost:8000/get-employee?limit=1&skip=0  //list employee
http://localhost:8000/get-employee/:id //get employee(get)
http://localhost:8000/add-employee  //add employee(post)
http://localhost:8000/delete-employee/2 //delete employee (delete)
http://localhost:8000/update-employee/1 //update employee(post)
```
# Form JSON Format
```console
//Add Employee,Update Employee
{
  "fullName":"Basit Shaikh",
  "jobTitle":"Unemployed",
  "email":"bac@gmail.com",
  "phoneNumber":"124342432",
  "address":"",
  "city":"kottayam",
  "state":"kerela",
  "primaryContact":"BBBBA",
  "primaryContactNumber":"91313212",
  "primaryContactRelation":"brother",
  "secondaryContact":"AAAX",
  "secondaryContactNumber":"9131321222",
  "secondaryContactRelation":"father"
}
```
