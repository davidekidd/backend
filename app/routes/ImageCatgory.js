const express = require("express");
const router = express.Router();

const ImageCategoryCtrl = require("./../controllers/ImageCategory");
const checkAuth = require("./../middleware/check-auth");


router.post("/create", checkAuth, ImageCategoryCtrl.CreateImageCategory);
router.post("/update", checkAuth, ImageCategoryCtrl.UpdateImageCategory);
router.get("/lists", checkAuth, ImageCategoryCtrl.GetImageCategories);
router.post("/get-by-id", checkAuth, ImageCategoryCtrl.GetImageCategoryById);
router.post("/delete", checkAuth, ImageCategoryCtrl.DeleteImageCategory);

module.exports = router;