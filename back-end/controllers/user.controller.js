const { authenticate } = require("../auth/authenticate");
const { varifyUser, fetchUserEvents } = require("../models/user.models");

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
