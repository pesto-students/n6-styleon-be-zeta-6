const express = require('express');
const router = express.Router();
const groomingServiceController = require('../controllers/groomingService.controller');
// const { checkToken } = require("../../../utils/jwt");



router.get('/', groomingServiceController.getGroomingServiceData);
router.get("/id", groomingServiceController.getGroomingServiceByID);
router.get("/marketplace", groomingServiceController.getAllServiceData);
router.post('/create', groomingServiceController.createGroomingServiceData);
router.put('/update', groomingServiceController.updateGroomingServiceData);
router.delete('/delete', groomingServiceController.deleteGroomingServiceData);


module.exports = router;