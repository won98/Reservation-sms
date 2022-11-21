const { sequelize, Reservation } = require("./models");

sequelize.sync({ force: false }).then(() => {
  console.log("OK");
});
async () => {
  try {
    let today = new Date();
    const tomorrow = today.setDate(today.getDate() + 1);
    //const data = [tomorrow];
    //let query = `select * from reservation
    // where date = ? `;
    //const row = await sequelize.query(query, { replacements: data });
    const row = await Reservation.findAll({
      where: {
        date: tomorrow,
      },
    });
    //   return res.status(200).json({
    //     result: "success",
    //     result: row,
    //   });
    console.log(row);
    console.log(test);
  } catch (err) {
    console.log(err);
  }
};
