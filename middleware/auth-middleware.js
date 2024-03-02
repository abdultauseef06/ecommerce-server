const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const authmiddleware = async (req, res, next) => {
    console.log("Request Headers:", req.headers);

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token Not Provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    console.log("Token from middleware:", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, 'yubiApparels');
        console.log("Decoded Token:", isVerified);
        const userData = await User.findOne({email:isVerified.email}).select({password:0})
        console.log(userData);
        req.user=userData;
        req.token=token;
        req.userId=userData.id
        next();
    } catch (error) {
        console.error("Error during token verification:", error);
        return res.status(401).json({ message: "Unauthorized token" });
    }
};

module.exports = authmiddleware;
