const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          customValidator(value) {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
              throw new Error("Invalid email address.");
            }
          },
        },
      },
      password: { type: Sequelize.STRING, allowNull: false,
      
        validate: {
          notNull: { msg: 'User must have a role' },
          notEmpty: { msg: 'role must not be empty' },
        },
        
      },
      isactive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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

// UsersModel.beforeCreate(async user => {
//   user.password = await bcrypt.hash(user.password, 8)
// })

// UsersModel.afterCreate(async user => {
//   delete user.dataValues.password
// })

// UsersModel.beforeBulkUpdate(async user => {
//   if (user.attributes.password) {
//     user.attributes.password = await bcrypt.hash(user.attributes.password, 8)
//   }
// })

UsersModel.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET)
}

UsersModel.prototype.verifyPassword = async function (password) {
  return bcrypt.compareSync(password, this.password, (err, result) => {
    if (err) {
      console.log('verifyPassword -> error:', err)
    }

    return result
  })
}

// associate function

// UsersModel.associate = function(models) {
//   Company.belongsTo(models.User, { foreignKey: 'user_id' });
// };


// UsersModel.beforeCreate(user => {
//   bcrypt.hash(User.password, 10, (err, hash) => {
//     return User.update({
//       password: hash
//     });
//   });
// });

module.exports = UsersModel;
