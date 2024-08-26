require("dotenv").config();

let PORT = process.env.PORT;
const password = process.env.MONGO_PASSWD;
let MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI.replace("<password>", password)
    : process.env.MONGODB_URI.replace("<password>", password);

let JWT_TEST = process.env.NODE_ENV === "test" ? process.env.JWT_TESTUSER : "";

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_TEST,
};
