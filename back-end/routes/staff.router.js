const staffRouter = require("express").Router();
const {
    getStaffEvents,
    patchEvent,
} = require("../controllers/staff.controller");

staffRouter.get("/:user_id/events", getStaffEvents);
staffRouter.patch("/:user_id/events/:event_id", patchEvent);

module.exports = staffRouter;
