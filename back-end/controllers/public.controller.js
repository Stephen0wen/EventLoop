const { fetchEvents, fetchEvent } = require("../models/public.models");

exports.getEndpoints = (req, res, next) => {
    res.status(200).send("Welcome to the EventLoop api!");
};

exports.getEvents = (req, res, next) => {
    fetchEvents().then((events) => {
        res.status(200).send({ events });
    });
};

exports.getEvent = (req, res, next) => {
    const { event_id } = req.params;
    fetchEvent(event_id)
        .then((event) => {
            res.status(200).send({ event });
        })
        .catch(next);
};
