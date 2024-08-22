require("dotenv").config();
const mongoose = require("mongoose");

//require('dotenv').config() //to read variables from process.env

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

console.log(process.env.PORT);

//const password = process.argv[2];
const password = process.env.PASSWD;

const url = process.env.MONGODB_URI.replace("<password>", password);

console.log(url);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

async function saveName() {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  const newPerson = await person.save();
  console.log(newPerson);
  mongoose.connection.close();
}

const printAll = async () => {
  const res = await Person.find({});
  console.log("Phonebook:");
  res.forEach((element) => {
    console.log(`${element.name} ${element.number}`);
  });

  mongoose.connection.close();
  return res;
};

//on top leven you can use only .then, inside functions await
// const allNotes = findAll().then((res) => {
//   console.log(res);
// });

if (process.argv.length > 3) {
  saveName();
} else {
  printAll();
}

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
