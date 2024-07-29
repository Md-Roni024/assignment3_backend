const express = require("express");
const router = express.Router();
const { createHotel,getHotelBySlug} = require("../controllers/hotelController");

router.post("/",createHotel)
router.get("/:slug",getHotelBySlug)
// router.get("/:id",getEmployeeByID)
// router.put("/:id",employeeUpdateValidation,runValidation, updateEmployee);
// router.delete("/:id",deleteEmployee)
// router.put("/block/:id",blockEmployee)

module.exports = router