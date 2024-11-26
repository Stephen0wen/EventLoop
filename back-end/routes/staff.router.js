const staffRouter = require("express").Router();
const { getStaffEvents } = require("../controllers/staff.controller");

staffRouter.get("/:user_id/events", getStaffEvents);

module.exports = staffRouter;
