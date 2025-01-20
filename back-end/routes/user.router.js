const userRouter = require("express").Router();
const {
    getUserEvents,
    postAttendance,
    getUser,
    getUserEvent,
    deleteAttendance,
    deleteUser,
    patchTokens,
} = require("../controllers/user.controller");

userRouter.get("/", getUser);
userRouter.delete("/", deleteUser);
userRouter.patch("/:user_id/tokens", patchTokens);
userRouter.get("/:user_id/events", getUserEvents);
userRouter.get("/:user_id/events/:event_id", getUserEvent);
userRouter.post("/:user_id/events/:event_id", postAttendance);
userRouter.delete("/:user_id/events/:event_id", deleteAttendance);

module.exports = userRouter;
