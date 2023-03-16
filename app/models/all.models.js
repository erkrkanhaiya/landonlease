const HotelModel = require('./hotel.model')
const HotelFacilitiesModel = require('./hotel_facilities.model')
const HotelImagesModel = require('./hotel_images.model')
const RoomModel = require('./room.model')
const RoomFacilitiesModel = require('./room_facilities.model')
const RoomImagesModel = require('./room_images.model')
const FacilitiesModel = require('./facilities.model')
const UsersAuthKeyModel = require('./users_auth_key.model')
const UserModel = require('./user.model')
const UsersModel = require('./users/users.model')
const AdminModel = require('./admin/adminmodel')

module.exports = {
  HotelModel,
  HotelFacilitiesModel,
  HotelImagesModel,
  RoomModel,
  RoomFacilitiesModel,
  RoomImagesModel,
  FacilitiesModel,
  UsersAuthKeyModel,
  UserModel,
  UsersModel,
  AdminModel
}
