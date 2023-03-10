export default async function UsersModel(sequelize, Sequelize) {
  return sequelize.define("users", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.DataTypes.STRING,
    },
    username: {
      type: Sequelize.DataTypes.STRING(20),
      unique: true,
    },
    phone_number: {
      type: Sequelize.DataTypes.STRING(12),
      unique: true,
    },
    otp_id: {
      type: Sequelize.DataTypes.STRING,
    },
  });
}
