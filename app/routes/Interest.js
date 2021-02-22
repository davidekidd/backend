const express = require("express");
const router = express.Router();

const InterestCtrl = require("./../controllers/Interest");
const checkAuth = require("./../middleware/check-auth");
const localAuth = require("./../middleware/local-auth");

router.post("/create", checkAuth, InterestCtrl.CreateInterest);
router.post("/update", checkAuth, InterestCtrl.UpdateInterest);
router.get("/lists", checkAuth, InterestCtrl.GetInterests);
router.post("/get-by-id", checkAuth, InterestCtrl.GetInterestById);
router.post("/delete", checkAuth, InterestCtrl.DeleteInterest);

router.get("/get-all", localAuth, InterestCtrl.GetInterestMobileApp);

module.exports = router;