const express = require("express");
const { getEvents } = require("./controllers/public.controller");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res, next) => {
    res.status(200).send("Welcome to the EventLoop api!");
});

app.get("/api/events", getEvents);

app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
