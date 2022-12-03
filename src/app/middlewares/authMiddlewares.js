const jwtVariable = require("../../constant").jwtVariable;

const userModel = require("../models/usersModels");

const authMethod = require("../method/authMethods");

exports.isAuth = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send("Không tìm thấy access token!");
  }
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  console.log(accessTokenSecret);
  const verified = await authMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );
  console.log(verified);
  if (!verified) {
    return res
      .status(401)
      .send("Bạn không có quyền truy cập vào tính năng này!");
  }
  const userList = await userModel.find({ _id: verified.payload.userId });

  if (userList.length === 0) {
    return res.status(401).send("User không tồn tại.");
  }

  const user = userList[0];
  req.user = user;

  return next();
};
