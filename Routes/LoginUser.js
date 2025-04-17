const express = require("express");
const router = express.Router();

const AuthUser = require("../Controllers/AuthUser");

router.post("/signup", AuthUser.createadmin);
router.post("/loginadmin", AuthUser.loginadmin);

module.exports = router; // ✅ This is what app.use() expects!
