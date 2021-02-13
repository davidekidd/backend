const express = require("express");
const router = express.Router();

const OccasionTypeCtrl = require("./../controllers/OccasionType");
const checkAuth = require("./../middleware/check-auth");


router.post("/create", checkAuth, OccasionTypeCtrl.CreateOccasionType);
router.post("/update", checkAuth, OccasionTypeCtrl.UpdateOccasionType);
router.get("/lists", checkAuth, OccasionTypeCtrl.GetOccasionTypes);
router.post("/get-by-id", checkAuth, OccasionTypeCtrl.GetOccasionTypeById);
router.post("/delete", checkAuth, OccasionTypeCtrl.DeleteOccasionType);

module.exports = router;