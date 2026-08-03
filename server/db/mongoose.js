// email : za6968486@gmail.com
// project name : QuickDine

const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = connectDB;
