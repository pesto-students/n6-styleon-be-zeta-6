const express = require('express');
const router = express.Router();
const salonController = require('../controllers/salon.controller');
// const { checkToken } = require("../../../utils/jwt");

router.get('/', salonController.getSalonData);
router.get("/id", salonController.getSalonByID);
router.post('/create', salonController.createSalonData);
router.put('/update', salonController.updateSalonData);
router.delete('/delete', salonController.deleteSalonData);

module.exports = router;
