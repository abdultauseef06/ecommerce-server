// auth-router.js
const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers");
const authMiddleware = require("../middleware/auth-middleware")

const signupSchema = require("../validators/auth-validators");
const validate = require("../middleware/validate_middleware");

// Existing routes for authentication
router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route('/user').get(authMiddleware,authcontrollers.user);
// New routes for cart operations


module.exports = router;
