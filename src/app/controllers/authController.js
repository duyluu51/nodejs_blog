const bcrypt = require("bcrypt");
const userModel = require("../models/usersModels");
const authMethod = require("../method/authMethods");
const jwtVariable=require("../../constant").jwtVariable
const randToken = require("rand-token");

// Khai báo const
const SALT_ROUNDS = 10;
// end

class authController {
  // [post] register
  register = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const userList = await userModel.find({ username });
    if (userList.length > 0) {
      res.status(409).send("Tên tài khoản đã tồn tại.");
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
      const newUser = {
        username,
        password: hashPassword,
        // ... Thêm các tham số khác tại đây ...
      };

      // save data
      try {
        const createUser = new userModel(newUser);
        await createUser.save();
        return res.send({
          username,
        });
      } catch {
        return res
          .status(400)
          .send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
      }
    }
  };

  // [post] log-in
  login = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const userList = await userModel.find({ username });
    if (!userList.length === 0) {
      return res.status(401).send("Tên đăng nhập không tồn tại.");
    }
    const user = userList[0];
    console.log(user);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Mật khẩu không chính xác.");
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
      username: user.username,
    };
    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );

    if (!accessToken) {
      return res
        .status(401)
        .send("Đăng nhập không thành công, vui lòng thử lại.");
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên

    if (!user.refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await userModel.updateOne({ username:user.username}, {...user,refreshToken });
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = user.refreshToken;
    }

    return res.json({
      msg: "Đăng nhập thành công.",
      accessToken,
      refreshToken,
      user,
    });
  };
}

module.exports = new authController();
