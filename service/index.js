const { User, Item, Shop, Reservation, sequelize, Op } = require("../models");
const jwt = require("../utils/jwt");
//const bcrypt = require("bcrypt");
const shortid = require("shortid");
const hashpw = require("../utils/hash");

module.exports = (() => {
  // user_service
  const U = {};
  // Reservation
  const R = {};

  U.SignService = async (obj) => {
    try {
      let hash = hashpw.Hash(obj.passwd);
      const usertId = shortid.generate();
      let tokenGroup = jwt.createTokenGroup(usertId);
      const check = await User.findOne({
        where: { user_id: obj.user_id },
      });
      if (check) {
        return { check: true };
      }
      await User.create({
        name: obj.name,
        email: obj.email,
        id: usertId,
        user_id: obj.user_id,
        passwd: hash,
        number: obj.number,
        refreshtoken: tokenGroup.rtoken,
      });
      return tokenGroup;
    } catch (err) {
      return { err: err };
    }
  };
  U.LoginServer = async (obj) => {
    try {
      const check = await User.findOne({
        where: { user_id: obj.user_id },
      });
      console.log(check.passwd);

      let compare = await hashpw.compare(obj.passwd, check.passwd);

      if (compare == true) {
        let tokenGroup = jwt.createTokenGroup({
          id: check.id,
          user_id: check.user_id,
        });

        await User.update(
          {
            refreshtoken: tokenGroup.rtoken,
          },
          {
            where: {
              id: check.id,
            },
          }
        );
        return tokenGroup;
      }
    } catch (err) {
      console.log(err);
      return { err: err };
    }
  };
  R.ReservationServer = async (obj) => {
    try {
      let shorid = shortid.generate();
      let decode = jwt.verifyToken(obj.xauth);
      console.log(decode.id);
      const row1 = await User.findOne({
        where: { id: decode.id },
      });
      const row2 = await Item.findOne({
        where: { item_id: obj.item_id },
      });
      const row3 = await Shop.findOne({
        where: { shop_id: obj.shop_id },
      });
      const row4 = await Reservation.create({
        id: shorid,
        user_id: decode.id,
        user_name: row1.name,
        number: row1.number,
        date: obj.date,
        shop_id: row3.id,
        item_id: row2.id,
        check: false,
      });
    } catch (err) {
      return { err: err };
    }
  };
  R.CancleServer = async (obj) => {
    try {
      let decoded = jwt.verifyToken(obj.xauth);
      console.log(decoded.id);
      let data = [decoded.id];
      const query = `select * from item left outer join shop
       on shop.id = item.shop_id
       inner join reservation on item.id = reservation.item_id where reservation.user_id = ?`;
      const row = await sequelize.query(query, { replacements: data });
      //console.log(row);
      console.log(row[0][0]);

      const row2 = await Reservation.destroy({
        where: {
          id: row[0][0].id,
        },
      });
    } catch (err) {
      return { err: err };
    }
  };
  return { U, R };
})();
