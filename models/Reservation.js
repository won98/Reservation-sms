module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
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
      item_id: {
        type: DataTypes.STRING(10),
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
      check: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return Reservation;
};
