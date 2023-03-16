class UsersModel {
    constructor(Sequelize, sequelize) {
      const baseTableName = "adminuser";
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
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING, allowNull: false },
        isactive: { type: Sequelize.INTEGER, allowNull: false },
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
  