// user_name => 1
// 572

module.exports = (sequelize, DataTypes) => {
  const Reservationinfo = sequelize.define(
    "Reservationinfo",
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
      },
      shop_id: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER(13),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return Reservationinfo;
};
