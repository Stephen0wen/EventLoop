const { authenticate } = require("../auth/authenticate");
const { varifyStaff, fetchStaffEvents } = require("../models/staff.model");

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
