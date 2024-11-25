const { fetchEvents } = require("../models/public.models");

exports.getEvents = (req, res, next) => {
    fetchEvents().then((events) => {
        res.status(200).send({ events });
    });
};
