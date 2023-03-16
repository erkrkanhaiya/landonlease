const express = require("express");
const router = express.Router();

// const AuthMiddlewareClass = require("../middlewares/auth.middleware");
// const { isAuthenticated, isAuthorized } = new AuthMiddlewareClass();
const { FacilitiesControllerClass ,AdminControllerClass} =  require("../controllers/all.controllers");
const HelperClass = new (require("../helpers/helper.class"))();
const AdminController = new AdminControllerClass();
// router.get("/version", (req,res)=>{
//     res.send('03.16.00')
// });

router.post("/create", AdminController.createadmin);
router.post("/login", AdminController.login);

module.exports = router;
