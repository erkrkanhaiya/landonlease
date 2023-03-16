const FacilitiesServiceClass = require('../../services/facilities.service')
const AdminServiceClass = require('../../services/adminservices/adminauth.service')
const ErrorHandler = require('../../handlers/error.handler')
const ResponseHandler = require('../../handlers/response.handler')
const FacilitiesService = new FacilitiesServiceClass()
const AdminService = new AdminServiceClass()


class AdminController {

  async listAllFacilities (req, res) {
    try {
      var data = await FacilitiesService.getAllFacilities()
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async readFacility (req, res) {
    try {
      var data = await FacilitiesService.getFacility({ facilityId: req.params.facilityId })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async createadmin (req, res) {
    try {
      var saveuser = req.body
      var data = await AdminService.createadmin(saveuser)
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

 

  async login (req, res) {
    try {
      const userData = req.body
      var data = await AdminService.login(userData)
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async addFacility (req, res) {
    try {
      var facilityData = req.body
      var facility = {}
      facility.facility = (facilityData.facility !== undefined) ? facilityData.facility : null
      var data = await FacilitiesService.createFacility({ facilityData: facility })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }

  async updateFacility (req, res) {
    try {
      var facilityData = req.body
      var facility = {}
      facility.facility = (facilityData.facility !== undefined) ? facilityData.facility : null
      var data = await FacilitiesService.updateFacility({ facilityId: req.params.facilityId, facilityData: facility })
      return new ResponseHandler(data, req.method, res)
    } catch (err) {
      return new ErrorHandler(err, res)
    }
  }
}

module.exports = AdminController
