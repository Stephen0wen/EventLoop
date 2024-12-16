const { authenticate } = require("../auth/authenticate");
const {
    varifyUser,
    fetchUserEvents,
    insertAttendance,
    fetchUser,
    fetchUserEventAttending,
    dropAttendance,
    insertUser,
} = require("../models/user.models");
const { fetchEvent } = require("../models/public.models");

exports.getUser = (req, res, next) => {
    authenticate(req)
        .then((firebase_id) => {
            return fetchUser(firebase_id);
        })
        .then((user) => {
            if (user) res.status(200).send({ user });
            else {
                return insertUser(req);
            }
        })
        .then((user) => {
            res.status(201).send({ user });
        })
        .catch(next);
};

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

exports.getUserEvent = (req, res, next) => {
    const { user_id, event_id } = req.params;
    authenticate(req)
        .then((firebase_id) => {
            return varifyUser(user_id, firebase_id);
        })
        .then(() => {
            return fetchUserEventAttending(user_id, event_id);
        })
        .then((event) => {
            if (event) res.status(200).send({ event });
            else return fetchEvent(event_id);
        })
        .then((event) => {
            event.is_user_attending = false;
            res.status(200).send({ event });
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

exports.deleteAttendance = (req, res, next) => {
    const { user_id, event_id } = req.params;
    fetchEvent(event_id)
        .then(() => {
            return authenticate(req);
        })
        .then((firebase_id) => {
            return varifyUser(user_id, firebase_id);
        })
        .then(() => {
            dropAttendance(user_id, event_id);
        })
        .then(() => {
            res.status(204).send({});
        })
        .catch(next);
};
