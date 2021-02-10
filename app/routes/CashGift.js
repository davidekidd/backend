const express = require("express");
const router = express.Router();

const CashGiftCtrl = require("./../controllers/CashGift");
const localAuth = require("./../middleware/local-auth");


router.post("/save", localAuth, CashGiftCtrl.SaveCashGift);

module.exports = router;