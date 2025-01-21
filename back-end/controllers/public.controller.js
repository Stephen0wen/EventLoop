const { fetchEvents, fetchEvent } = require("../models/public.models");
const endpoints = require("../endpoints.json");
const { exchangeTokens } = require("../auth/exchangeTokens");

exports.getEndpoints = (req, res, next) => {
    res.status(200).send(endpoints);
};

exports.getEvents = (req, res, next) => {
    const { sort_by, order } = req.query;
    fetchEvents(sort_by, order)
        .then((events) => {
            res.status(200).send({ events });
        })
        .catch(next);
};

exports.getEvent = (req, res, next) => {
    const { event_id } = req.params;
    fetchEvent(event_id)
        .then((event) => {
            res.status(200).send({ event });
        })
        .catch(next);
};
