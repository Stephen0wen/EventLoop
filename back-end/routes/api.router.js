const apiRouter = require("express").Router();
const {
    getEndpoints,
    getEvents,
    getEvent,
} = require("../controllers/public.controller");

apiRouter.get("/", getEndpoints);
apiRouter.get("/events", getEvents);
apiRouter.get("/events/:event_id", getEvent);

apiRouter.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Endpoint Not Found" });
});

module.exports = apiRouter;
