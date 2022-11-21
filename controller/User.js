const { User, sequelize, Op, QueryTypes } = require("../models");
const jwt = require("../utils/jwt");
//const bcrypt = require("bcrypt");
const shortid = require("shortid");
const hashpw = require("../utils/hash");
require("dotenv").config();

module.exports = {
  Signup: async (req, res) => {
    try {
      let { name, email, user_id, passwd, number } = req.body;
      let hash = hashpw.Hash(passwd);
      const usertId = shortid.generate();
      let token = jwt.createToken({
        id: usertId,
        user_id: user_id,
      });
      let rtoken = jwt.refreshtoken({
        id: usertId,
      });
      if (user_id == undefined || email == undefined) {
        throw { code: 1 };
      }
      const tx = await sequelize.transaction();
      const check = await User.findOne({
        where: { user_id: user_id },
        transaction: tx,
      });
      if (check) {
        tx.rollback();
        return res.status(200).json({
          check: true,
        });
      }
      const row = await User.create({
        name: name,
        email: email,
        id: usertId,
        user_id: user_id,
        passwd: hash,
        number: number,
        refreshtoken: rtoken,
      });
      await tx.commit();
      return res.status(200).json({
        result: "success",
        resuelt: row,
        xauth: token,
        rxauth: rtoken,
      });
    } catch (err) {
      console.log(err);
    }
  },
  Login: async (req, res) => {
    try {
      const { user_id, passwd } = req.body;
      let token;
      let rtoken;
      const rows = await User.findOne({
        where: { user_id: user_id },
      });
      const compare = await hashpw.compare(passwd, rows.passwd);

      if (compare == true) {
        token = jwt.createToken({
          user_id: rows.user_id,
          id: rows.user_id,
        });
        rtoken = jwt.refreshtoken({ id: rows.id });
        await User.update(
          {
            refreshtoken: rtoken,
          },
          {
            where: {
              id: rows.id,
            },
          }
        );
        return res.status(200).json({ token: token, rtoken: rtoken });
      } else throw { code: 9 };
    } catch (err) {
      console.log(err);
    }
  },
  CheckToken: async (req, res) => {
    try {
      let auth = req.get("x_auth");
      console.log(auth);
      const token = authorization(" ", " ")[1];
      jwt.verify(token, secretKey, (err, encode) => {
        if (err) console.error(err);
        else {
          console.log(encode);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  Checkemail: async (req, res) => {
    try {
      const data = await User.findOne({ where: { email: req.body.email } });
      if (data) {
        // 반환 데이터가 있다면 이미 존재하는 이메일
        res.status(400).json({
          result: false,
          message: "이미 존재하는 이메일입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Checkid: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { id: req.body.id } });
      if (data) {
        // 반환 데이터가 있다면 이미 존재하는 아이디
        res.status(400).json({
          result: false,
          message: "이미 존재하는 아이디입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
