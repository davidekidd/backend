const express = require("express");
const router = express.Router();

const EventSubCategoryCtrl = require("./../controllers/EventSubCategory");
const checkAuth = require("./../middleware/check-auth");
const localAuth = require("./../middleware/local-auth");

router.post("/create", checkAuth, EventSubCategoryCtrl.CreateEventSubCategory);
router.post("/update", checkAuth, EventSubCategoryCtrl.UpdateEventSubCategory);
router.get("/lists", checkAuth, EventSubCategoryCtrl.GetEventSubCategories);
router.post("/get-by-id", checkAuth, EventSubCategoryCtrl.GetEventSubCategoryById);
router.post("/delete", checkAuth, EventSubCategoryCtrl.DeleteEventSubCategory);

router.get("/all-events", localAuth, EventSubCategoryCtrl.GetEventSubCategoriesMobileApp);

module.exports = router;