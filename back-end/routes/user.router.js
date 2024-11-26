const userRouter = require("express").Router();
const { getUserEvents } = require("../controllers/user.controller");

userRouter.get("/:user_id/events", getUserEvents);

module.exports = userRouter;
