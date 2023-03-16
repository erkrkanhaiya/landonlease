const express = require("express");
const router = express.Router();

const AuthMiddlewareClass = require("../middlewares/auth.middleware");

const { isAuthenticated, isAuthorized } = new AuthMiddlewareClass();

const { FacilitiesControllerClass } = require("../controllers/all.controllers");
const HelperClass = new (require("../helpers/helper.class"))();

const FacilitiesController = new FacilitiesControllerClass();

router.get("/version", HelperClass.checkAuth);

module.exports = router;
