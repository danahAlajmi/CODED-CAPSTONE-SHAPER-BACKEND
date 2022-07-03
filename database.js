require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.databaseKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
