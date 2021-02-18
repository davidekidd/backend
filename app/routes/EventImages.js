const express = require("express");
const router = express.Router();

const EventImageCtrl = require("./../controllers/EventImages");
const checkAuth = require("../middleware/check-auth");


router.post("/create", checkAuth, EventImageCtrl.CreateEventImage);
router.post("/update", checkAuth, EventImageCtrl.UpdateEventImage);
router.get("/lists", checkAuth, EventImageCtrl.GetImageCategories);
router.post("/get-by-id", checkAuth, EventImageCtrl.GetEventImageById);
router.post("/delete", checkAuth, EventImageCtrl.DeleteEventImage);

router.post("/upload-image", checkAuth, EventImageCtrl.UploadImage);
router.post("/upload-image-data", checkAuth, EventImageCtrl.UploadImageData);
router.get("/image-lists", checkAuth, EventImageCtrl.GetEventImageList);
router.post("/delete-image", checkAuth, EventImageCtrl.DeleteUploadedImage);

module.exports = router;