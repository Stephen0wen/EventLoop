const userRouter = require("express").Router();
const {
    getUserEvents,
    postAttendance,
} = require("../controllers/user.controller");

userRouter.get("/:user_id/events", getUserEvents);
userRouter.post("/:user_id/events/:event_id", postAttendance);

module.exports = userRouter;
