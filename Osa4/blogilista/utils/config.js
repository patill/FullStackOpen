require("dotenv").config();

let PORT = process.env.PORT;
const password = process.env.MONGO_PASSWD;
let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI.replace("<password>", password)
    : process.env.MONGODB_URI.replace("<password>", password);

module.exports = {
  MONGODB_URI,
  PORT,
};
