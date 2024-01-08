const express = require("express");
const router = express.Router();
const addressController = require('../controllers/Address-controller');

router.put('/edit-Address', addressController.editAddress);
router.post('/add-Address', addressController.addAddress);
router.get('/api/address/get-Address/:email', addressController.getAddressesByEmail);

// Add more routes for other address-related operations if needed

module.exports = router;
