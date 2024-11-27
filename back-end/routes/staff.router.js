const staffRouter = require("express").Router();
const {
    getStaffEvents,
    patchEvent,
    postEvent,
} = require("../controllers/staff.controller");

staffRouter.get("/:user_id/events", getStaffEvents);
staffRouter.post("/:user_id/events", postEvent);
staffRouter.patch("/:user_id/events/:event_id", patchEvent);

module.exports = staffRouter;
