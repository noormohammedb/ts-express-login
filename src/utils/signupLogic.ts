import dbutil from "./db-connection";
const singupLogic = async (reqData: any) => {
  try {
    const user = await dbutil.db
      .collection("user")
      .findOne({ user_name: reqData.user_name });
    console.info("user:", user);
    if (user) {
      console.log("user exist in db");
      return {
        message: "signup user exist",
      };
    } else {
      await dbutil.db.collection("user").insertOne(reqData);
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

export default singupLogic;
