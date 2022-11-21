const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_KEY, REFRESH_KEY } = process.env;

module.exports = {
  createToken: (payload) => {
    const token = jwt.sign(
      {
        id: payload.id,
        number: payload.number,
      },
      ACCESS_KEY,
      {
        algorithm: "HS256",
        expiresIn: "10m",
      }
    );
    return token;
  },
  verifyToken: (token) => {
    if (!token) {
      return "";
    }
    let decode = jwt.verify(token, ACCESS_KEY);
    return decode;
  },
  refreshtoken: (payload) => {
    const rtoken = jwt.sign({ id: payload.id }, REFRESH_KEY, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    return rtoken;
  },
};
