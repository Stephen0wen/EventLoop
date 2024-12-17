const { authenticate } = require("../auth/authenticate");
const { exchangeTokens } = require("../auth/exchangeTokens");
const {
    varifyUser,
    fetchUserEvents,
    insertAttendance,
    fetchUser,
    fetchUserEventAttending,
    dropAttendance,
    insertUser,
    dropUser,
    updateTokens,
} = require("../models/user.models");
const { fetchEvent } = require("../models/public.models");
const { google } = require("googleapis");
const {
    client_id,
    client_secret,
} = require(`${__dirname}/../.env.google.json`);

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

exports.deleteUser = (req, res, next) => {
    authenticate(req)
        .then((firebase_id) => {
            return dropUser(firebase_id);
        })
        .then(() => {
            res.status(204).send({});
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

exports.patchTokens = (req, res, next) => {
    const { user_id } = req.params;
    const { code } = req.body;

    authenticate(req)
        .then((firebase_id) => {
            return varifyUser(user_id, firebase_id);
        })
        .then(() => {
            return exchangeTokens(code);
        })
        .then(({ tokens }) => {
            if (tokens.refresh_token) {
                return updateTokens(tokens.refresh_token, user_id);
            }
            res.status(201).send({ user_calendar_allowed: true });
        })
        .then(() => {
            res.status(201).send({ user_calendar_allowed: true });
        })
        .catch(next);
};

exports.addToCalendar = (req, res, next) => {
    const { user_id, event_id } = req.params;
    authenticate(req).then((firebase_id) => {
        return Promise.all([
            varifyUser(user_id, firebase_id),
            fetchEvent(event_id),
        ])
            .then(([{ user_refresh_token }, event]) => {
                const GOOGLE_CLIENT_ID = client_id;
                const GOOGLE_CLIENT_SECRET = client_secret;
                const REFRESH_TOKEN = user_refresh_token;

                const oauth2Client = new google.auth.OAuth2(
                    GOOGLE_CLIENT_ID,
                    GOOGLE_CLIENT_SECRET,
                    "http://localhost:5173"
                );

                oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
                const calendar = google.calendar("v3");

                return calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: "primary",
                    requestBody: {
                        summary: event.event_title,
                        description: event.event_description_long,
                        location: event.event_location,
                        colorId: "2",
                        start: { dateTime: new Date(event.event_start) },
                        end: { dateTime: new Date(event.event_end) },
                    },
                });
            })
            .then(({ data }) => {
                res.status(201).send({ calendar_event: data });
            })
            .catch(next);
    });
};
