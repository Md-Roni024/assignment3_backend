const express = require("express");
const router = express.Router();
const { createRoom,getRoomByHotelSlug } = require("../controllers/roomController");

router.post("/create-room",createRoom)
router.get("/:hotelSlug/rooms",getRoomByHotelSlug)

module.exports = router