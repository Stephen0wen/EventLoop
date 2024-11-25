const express = require("express");
const {
    getEndpoints,
    getEvents,
    getEvent,
} = require("./controllers/public.controller");
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
} = require("./errors/index.js");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEvent);

app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Endpoint Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
