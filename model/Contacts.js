const Contact = (db, DataTypes) =>
  db.define("contact", {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    relationship: DataTypes.STRING,

    //primaryContact: DataTypes.ABSTRACT,
    //secondaryContact: DataTypes.ABSTRACT,
  });
export default Contact;
