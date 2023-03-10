export default async function OTPModel(sequelize, Sequelize) {
  return sequelize.define("otps", {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    otp: {
      type: Sequelize.DataTypes.STRING,
    },
    expiration_time: {
      type: Sequelize.DataTypes.DATE,
      unique: true,
    },
    verified: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
}
