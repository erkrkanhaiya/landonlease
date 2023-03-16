class UsersModel {
  constructor(Sequelize, sequelize) {
    const baseTableName = "allusers";
    const baseTableFields = {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: { type: Sequelize.STRING },
      country_code: { type: Sequelize.STRING },
      phone_number: { type: Sequelize.STRING },
      whats_app: { type: Sequelize.STRING },
      user_qr: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      avtar: { type: Sequelize.STRING },
      user_type: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING, allowNull: false },
      isactive: { type: Sequelize.INTEGER, allowNull: false },
      ismember: { type: Sequelize.INTEGER, allowNull: false },
      is_approve: { type: Sequelize.STRING, allowNull: false },
      account_type: { type: Sequelize.STRING, allowNull: false },
      social_network: { type: Sequelize.STRING },
      // userName: { type: Sequelize.STRING, allowNull: false, unique: true },
    };
    const baseTableOptions = {
      tableName: baseTableName,
      freezeTableName: true,
      timestamps: true,
    };

    const UserModel = sequelize.define(
      baseTableName,
      baseTableFields,
      baseTableOptions
    );
    UserModel.sync();

    return UserModel;
  }
}

module.exports = UsersModel;
