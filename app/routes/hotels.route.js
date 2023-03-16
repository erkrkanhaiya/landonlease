const router = require('express').Router()


// const AuthMiddlewareClass = require('../middlewares/auth.middleware');
// const { isAuthenticated, isAuthorized } = new AuthMiddlewareClass();
// const { HotelControllerClass, HotelRoomsControllerClass } = require('../controllers/all.controllers');
// const HotelController = new HotelControllerClass();
// const HotelRoomsController = new HotelRoomsControllerClass();

 

const { HotelControllerClass: HC, HotelRoomsControllerClass: HRC } = require('../controllers/all.controllers');
const { isAuthenticated, isAuthorized } = new (require('../middlewares/auth.middleware'))();


const HotelController = new HC();
const HotelRoomsController = new HRC();

router
    .use(isAuthenticated,isAuthorized)

router
  .get('/hotels',HotelController.listAllHotels)
  .post('/hotel',HotelController.addHotel)
  .get('/hotel/:hotelId',HotelController.readHotel)
  .put('/hotel/:hotelId',HotelController.updateHotel)
  .patch('/hotel/:hotelId',HotelController.updateHotelFields)
  .delete('/hotel/:hotelId',HotelController.removeHotel)
  .get('/hotel/:hotelId/images',HotelController.readHotelImages)
  .get('/hotel/:hotelId/facilities',HotelController.readHotelFacilities)
  .post('/hotel/:hotelId/images',HotelController.addHotelImages)
  .post('/hotel/:hotelId/facilities',HotelController.addHotelFacilities)
  .get('/hotel/:hotelId/rooms',HotelRoomsController.readHotelRooms);

module.exports = router;
