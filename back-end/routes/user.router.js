const userRouter = require("express").Router();
const {
    getUserEvents: getUserEvents,
    postAttendance: postAttendance,
    getUser,
    getUserEvent,
    deleteAttendance,
    deleteUser,
    putTokens,
} = require("../controllers/user.controller");

userRouter.get("/", getUser);
userRouter.delete("/", deleteUser);
userRouter.patch("/:user_id/tokens", putTokens);
userRouter.get("/:user_id/events", getUserEvents);
userRouter.get("/:user_id/events/:event_id", getUserEvent);
userRouter.post("/:user_id/events/:event_id", postAttendance);
userRouter.delete("/:user_id/events/:event_id", deleteAttendance);

module.exports = userRouter;
