const express = require("express");
const router = express.Router();

const AdminAuthCtrl = require("../controllers/AdminAuth");

router.post("/login", AdminAuthCtrl.Login);

module.exports = router;