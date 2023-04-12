const Employee = (db, DataTypes) => {
  return db.define("employee", {
    fullName: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    //primaryContact: DataTypes.ABSTRACT,
    //secondaryContact: DataTypes.ABSTRACT,
  });
};
//Employee.hasMany(Contact, { foreignKey: "empid" });

export default Employee;
