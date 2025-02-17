const { authenticate } = require("../auth/authenticate");
const {
    varifyStaff,
    fetchStaffEvents,
    insertEvent,
    updateEvent,
    dropEvent,
} = require("../models/staff.model");

exports.getStaffEvents = (req, res, next) => {
    const { user_id } = req.params;
    return authenticate(req)
        .then((firebase_id) => {
            return varifyStaff(user_id, firebase_id);
        })
        .then(() => {
            return fetchStaffEvents(user_id);
        })
        .then((events) => {
            res.status(200).send({ events });
        })
        .catch(next);
};

exports.postEvent = (req, res, next) => {
    const { user_id } = req.params;
    return authenticate(req)
        .then((firebase_id) => {
            return varifyStaff(user_id, firebase_id);
        })
        .then(() => {
            return insertEvent(user_id, req.body);
        })
        .then((event) => {
            res.status(201).send({ event });
        })
        .catch(next);
};

exports.patchEvent = (req, res, next) => {
    const { user_id, event_id } = req.params;
    return authenticate(req)
        .then((firebase_id) => {
            return varifyStaff(user_id, firebase_id);
        })
        .then(() => {
            return updateEvent(event_id, req.body);
        })
        .then((event) => {
            res.status(200).send({ event });
        })
        .catch(next);
};

exports.deleteEvent = (req, res, next) => {
    const { user_id, event_id } = req.params;
    return authenticate(req)
        .then((firebase_id) => {
            return varifyStaff(user_id, firebase_id);
        })
        .then(() => {
            return dropEvent(event_id);
        })
        .then((event) => {
            res.status(204).send(event);
        })
        .catch(next);
};
