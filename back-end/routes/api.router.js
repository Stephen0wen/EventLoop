const apiRouter = require("express").Router();
const userRouter = require("./user.router");
const staffRouter = require("./staff.router");
const {
    getEndpoints,
    getEvents,
    getEvent,
    addToCalendar,
} = require("../controllers/public.controller");

apiRouter.get("/", getEndpoints);
apiRouter.get("/events", getEvents);
apiRouter.get("/events/:event_id", getEvent);

apiRouter.use("/user", userRouter);
apiRouter.use("/staff", staffRouter);

apiRouter.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Endpoint Not Found" });
});

module.exports = apiRouter;
