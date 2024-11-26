const { authenticate } = require("../auth/authenticate");
const {
    varifyUser,
    fetchUserEvents,
    insertAttendance,
} = require("../models/user.models");
const { fetchEvent } = require("../models/public.models");

exports.getUserEvents = (req, res, next) => {
    const { user_id } = req.params;
    authenticate(req)
        .then((firebase_id) => {
            return varifyUser(user_id, firebase_id);
        })
        .then(() => {
            return fetchUserEvents(user_id);
        })
        .then((events) => {
            res.status(200).send({ events });
        })
        .catch(next);
};

exports.postAttendance = (req, res, next) => {
    const { user_id, event_id } = req.params;
    fetchEvent(event_id)
        .then(() => {
            return authenticate(req);
        })
        .then((firebase_id) => {
            return varifyUser(user_id, firebase_id);
        })
        .then(() => {
            return insertAttendance(user_id, event_id);
        })
        .then((attendance) => {
            res.status(201).send({ attendance });
        })
        .catch(next);
};
