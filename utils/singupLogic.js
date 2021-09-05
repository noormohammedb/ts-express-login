const db = require("../utils/db-connection").db;
const singupLogic = async (reqData) => {
  try {
    const user = await db
      .collection("user")
      .findOne({ user_name: reqData.user_name });
    console.info("user:", user);
    if (user) {
      console.log("user exist in db");
      return {
        message: "signup user exist",
      };
    } else {
      await db.collection("user").insertOne(reqData);
      console.log("db insertion done");
      return {
        message: "signup success",
      };
    }
  } catch (error) {
    console.log("error in signup db operation");
    throw error;
  }
};

module.exports = singupLogic;
