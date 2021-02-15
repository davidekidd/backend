const express = require("express");
const router = express.Router();

const EventTypeCtrl = require("./../controllers/EventTitle");
const checkAuth = require("./../middleware/check-auth");


router.post("/create", checkAuth, EventTypeCtrl.CreateEventType);
router.post("/update", checkAuth, EventTypeCtrl.UpdateEventType);
router.get("/lists", checkAuth, EventTypeCtrl.GetEventTypes);
router.post("/get-by-id", checkAuth, EventTypeCtrl.GetEventTypeById);
router.post("/delete", checkAuth, EventTypeCtrl.DeleteEventType);

module.exports = router;