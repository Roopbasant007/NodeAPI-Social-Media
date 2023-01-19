const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const DB_URI="mongodb+srv://roop_179:Roop007wa9@cluster0.2dhgovk.mongodb.net/sociogram?retryWrites=true&w=majority"
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
