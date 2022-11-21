const {
  User,
  Item,
  Shop,
  sequelize,
  Reservation,
  Reservationinfo,
  Op,
} = require("../models");
const jwt = require("../utils/jwt");
const shortid = require("shortid");
const sms = require("../utils/Sms");

module.exports = {
  Reservation: async (req, res) => {
    try {
      const { xauth, date, shop_id, item_id } = req.body;
      const tx = await sequelize.transaction();
      const shorid = shortid.generate();
      let decode = jwt.verifyToken(xauth);
      const row1 = await User.findOne(
        {
          where: { user_id: decode.id },
        },
        { transaction: tx }
      );
      const row2 = await Item.findOne(
        {
          where: { item_id: item_id },
        },
        {
          transaction: tx,
        }
      );
      const row3 = await Shop.findOne(
        {
          where: { shop_id: shop_id },
        },
        {
          transaction: tx,
        }
      );
      const row4 = await Reservation.create(
        {
          id: shorid,
          user_id: decode.id,
          user_name: row1.name,
          number: row1.number,
          date: date,
          shop_id: shop_id,
          item_id: row2.id,
          check: false,
        },
        { transaction: tx }
      );
      const row5 = await Reservationinfo.create({
        id: shorid,
        user_id: decode.id,
        user_name: row1.name,
        number: row1.number,
        date: date,
        shop_id: row3.id,
        item_id: item_id,
      });
      await tx.commit();
      return res.status(200).json({
        result: "success",
        resuelt: row4,
        resuelt: row5,
      });
    } catch (err) {
      console.log(err);
    }
  },
  Registrationlist: async (req, res) => {
    try {
      const { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      let data = [decoded.id];
      //console.log(data);
      const query = `select * from shop left outer join item 
      on shop.shop_id = item.shop_id inner join reservation on item.item_id = reservation.item_id 
      where reservation.user_id = ?`;

      const row = await sequelize.query(query, { replacements: data });
      return res.status(200).json({
        result: "success",
        result: row[0],
      });
    } catch (err) {
      console.log(err);
    }
  },
  Cancel: async (req, res) => {
    try {
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      let data = [decoded.id];
      let query = `select * from item left outer join shop
      on shop.id = item.shop_id 
      inner join reservation on item.id = reservation.item_id where reservation.user_id = ?`;
      const row = await sequelize.query(query, { replacements: data });
      console.log(row[0][0].id);
      const row2 = await Reservation.destroy({
        where: {
          id: row[0][0].id,
        },
      });
      return res.status(200).json({
        result: "success",
        resuelt: row,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
// findAll 에 raw:true 조건추가
// const keyword = await PrivateApt.findAll({attributes:['houseName'], raw:true})
//예약하기전에 가게와 상품이 있는지 체크
