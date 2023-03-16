const {
  UsersAuthKeyModel,
  UserModel,
  AdminModel,
} = require("../../models/all.models");
const { InvalidDataError, DatabaseError,ResourceNotFoundError } = require("../../errors/errors");
const SequelizeConnection = require("../../config/database.config");
const Sequelize = SequelizeConnection.Sequelize;
const sequelize = SequelizeConnection.sequelize;

class AdminAuthService {
  constructor() {
    this.User = new UserModel(Sequelize, sequelize);

    this.AdminUser = new AdminModel(Sequelize, sequelize);

    this.UsersAuthKey = new UsersAuthKeyModel(Sequelize, sequelize);

    this.User.hasMany(this.UsersAuthKey);

    this.UsersAuthKey.belongsTo(this.User, {
      as: "U",
      foreignKey: "userId",
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.AdminUser.findOne({where:data})
        .then((user) => {
          if (
            user === undefined ||
            user === null ||
            user.length === 0
          ) {
            reject(new ResourceNotFoundError("User"));
          } else {
            resolve(user);
          }
        })
        .catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name));
        });
    });
  }

  createadmin(data) {
    return new Promise((resolve, reject) => {
      this.AdminUser.create(data)
        .then((user) => {
          if (user === undefined || user === null || user.length === 0) {
            reject(new ResourceNotFoundError("User"));
          } else {
            resolve(user);
          }
        })
        .catch(Sequelize.Error, function (err) {
          reject(new DatabaseError(err.message, err.name));
        });
    });
  }

  getApiKeyUser(data) {
    return new Promise((resolve, reject) => {
      if (data.apiKey === "") {
        reject(new InvalidDataError("Api Key!!"));
      } else {
        this.User.findOne({
          where: {
            inactive: { $or: [0, null] },
          },
          include: [
            {
              model: this.UsersAuthKey,
              where: {
                apiKey: data.apiKey,
              },
            },
          ],
        })
          .then((user) => {
            // console.log(user, "LL");
            if (user === undefined || user === null || user.length === 0) {
              reject(new InvalidDataError("User or Api Key"));
            } else {
              resolve(user);
            }
          })
          .catch(Sequelize.Error, function (err) {
            reject(new DatabaseError(err.message, err.name));
          });
      }
    });
  }
}

module.exports = AdminAuthService;
