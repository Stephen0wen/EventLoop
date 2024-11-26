const { authenticate } = require("../auth/authenticate");
const {
    varifyStaff,
    fetchStaffEvents,
    updateEvent,
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

exports.patchEvent = (req, res, next) => {
    const { user_id, event_id } = req.params;
    return authenticate(req)
        .then((firebase_id) => {
            return varifyStaff(user_id, firebase_id);
        })
        .then(() => {
            return updateEvent(user_id, event_id, req.body);
        })
        .then((event) => {
            res.status(200).send({ event });
        })
        .catch(next);
};
