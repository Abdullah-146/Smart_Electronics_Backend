const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://arherear:Hamza12@cluster0.m1qu1vy.mongodb.net/theElectronicMart?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
