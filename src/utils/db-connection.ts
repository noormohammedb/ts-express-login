import * as  dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017";
const database = process.env.DB_NAME || "login";
const client = new MongoClient(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

async function dbConnection() {
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log("connection error");
    // console.error(error);
    throw error;
  }
}

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("db connected");
//   db_insertin();
//   // client.close();
// });

// async () => {
const db_insertin = async () => {
  try {
    console.log("trying to db insertion");
    await client.db("test").collection("test").insertOne({ key: "value" });
    console.log("db insertion success");
  } catch (error) {
    console.log("db insertion error");

    console.error(error);
  }
};

export default {
  dbconnect: dbConnection,
  db: client.db(database),
  db_insertin,
};
