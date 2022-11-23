//여러가지 방법??

const {
  User,
  Item,
  Shop,
  sequelize,
  Reservation,
  Reservationinfo,
  QueryTypes,
} = require("../models");
const shortid = require("shortid");
const sms = require("./Sms");
const { compare } = require("bcrypt");
module.exports = {
  //setInterval로 설정한 시간마다 검색하면 count +1
  Tomorrow: async (req, res) => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + (date.getDate() + 1)).slice(-2);
      const dateStr = year + "-" + month + "-" + day;
      console.log(dateStr.toLocaleString());
      const row = await Reservation.findAll({
        where: {
          date: dateStr.toLocaleString(),
        },
      });
      for (let i = 0; i < row1.length; i++) {
        let id = row[i].user_id;
        console.log(id);
        const row2 = await sequelize.query(
          `update reservationinfo set count = count +1 where user_id = ? and count = 0`,
          {
            replacements: [row1[i].user_id],
            type: QueryTypes.UPDATE,
          }
        );
        console.log("row2", row2);
        const row3 = await Reservationinfo.findAll({
          where: {
            count: 0,
          },
        });
        console.log(row3);
        for (let j = 0; j < row3.length; j++) {
          if (row3[j].count == 1) {
            let name = row1[i].user_name;
            const shop = row1[i].shop_id;
            const number = row1[i].number;
            const send = await sms.Today({
              name: name,
              shop: shop,
              number: number,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  //보내고싶은 시간을 설정 00시 00분 00초
  Today: async (req, res) => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      const time = [hour, min, sec].join(":");
      const dateStr = year + "-" + month + "-" + day;
      console.log(dateStr.toLocaleString());
      console.log(time);
      const row = await Reservation.findAll({
        where: {
          date: dateStr.toLocaleString(),
        },
        raw: true,
      });
      if (time == "9:49:0") {
        //for (let i = 0; i < row.length; i++) {
        // let name = row[i].user_name;
        // const shop = row[i].shop_id;
        // const number = row[i].number;
        // const send = await sms.Tomorrow({
        //   name: name,
        //   shop: shop,
        //   number: number,
        // });
        console.log("hahaahahahahahahahh");
        //}
      }
    } catch (err) {
      console.log(err);
    }
  },
};
