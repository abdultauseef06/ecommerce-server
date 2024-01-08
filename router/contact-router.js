const express = require("express");
const router = express.Router();
const { contactForm, getContacts } = require("../controllers/contact-controllers");
router.route("/contact").post(contactForm);
router.route("/contacts").get(getContacts);

module.exports = router;