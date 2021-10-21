import dbutil from "./db-connection";
const loginLogic = async (reqData: any) => {
  try {
    const user = await dbutil.db
      .collection("user")
      .findOne({ user_name: reqData.user_name });
    if (user) {
      //   console.log("user found");
      console.info(user);
      if (user.password == reqData.password) {
        console.log("password matched");
        const resData = {
          isLoggedin: true,
          message: "login success",
        };
        return resData;
      } else {
        console.log("password not matched");
        const resData = {
          message: "login failed, check username and password",
        };
        return resData;
      }
    } else {
      console.log("no user found");
      const resData = {
        message: "please try to signup",
      };
      return resData;
    }
  } catch (error) {
    console.log("error in login db operation");
    throw error;
  }
};

export default loginLogic;
