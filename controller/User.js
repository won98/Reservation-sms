const { User, sequelize, Op, QueryTypes } = require("../models");
const jwt = require("../utils/jwt");
//const bcrypt = require("bcrypt");
const shortid = require("shortid");
const hashpw = require("../utils/hash");
const svc = require("../service");
require("dotenv").config();

module.exports = {
  Signup: async (req, res) => {
    try {
      if (req.body.user_id == undefined || req.body.email == undefined) {
        throw err;
      }
      let reply = await svc.U.SignService(req.body);
      let replyjson = {
        result: "success",
        token: reply.token,
        rtoken: reply.rtoken,
      };
      if (reply.check) {
        replyjson = {
          msg: "already singed",
        };
      }
      if (reply.err) {
        replyjson = {
          error: reply.err,
        };
      }
      return res.status(200).json(replyjson);
    } catch (err) {
      console.log(err);
      return res.stats(200).json(err);
    }
  },
  Login: async (req, res) => {
    try {
      let reply = await svc.U.LoginServer(req.body);
      console.log(reply);
      let replyjson = {
        result: "success",
        token: reply.token,
        rtoken: reply.rtoken,
      };

      if (reply.err) {
        replyjson = {
          err: reply.err,
        };
      }
      return res.status(200).json(replyjson);
    } catch (err) {
      console.log(err);
      return res.stats(200).json(err);
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
