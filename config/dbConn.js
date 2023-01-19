const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
