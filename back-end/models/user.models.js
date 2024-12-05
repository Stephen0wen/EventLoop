const db = require("../db/connection");

exports.varifyUser = (user_id, firebase_id) => {
    return db
        .query(
            `
    SELECT * FROM users 
    WHERE user_id=$1 
    AND user_firebase_id=$2`,
            [user_id, firebase_id]
        )
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 403,
                    msg: "Authentication Failed",
                });
            }
        });
};

exports.fetchUser = (firebase_id) => {
    return db
        .query(
            `
    SELECT user_id FROM users
    WHERE user_firebase_id = $1    
        `,
            [firebase_id]
        )
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    msg: "Resource Not Found",
                });
            }
            return rows[0];
        });
};

exports.fetchUserEvents = (user_id) => {
    return db
        .query(
            `
    SELECT events.event_id,
      events.event_created_by,
      events.event_title,
      events.event_start,
      events.event_end,
      events.event_location,
      events.event_thumbnail,
      events.event_thumbnail_alt,
      events.event_image,
      events.event_image_alt,
      events.event_description_short,
      events.event_description_long 
    FROM events
    JOIN attendance ON events.event_id=attendance.event_id
    JOIN users ON users.user_id=attendance.user_id
    WHERE users.user_id=$1
    `,
            [user_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.fetchUserEventAttending = (user_id, event_id) => {
    return db
        .query(
            `
    SELECT events.event_id,
      events.event_created_by,
      events.event_title,
      events.event_start,
      events.event_end,
      events.event_location,
      events.event_thumbnail,
      events.event_thumbnail_alt,
      events.event_image,
      events.event_image_alt,
      events.event_description_short,
      events.event_description_long 
    FROM events
    JOIN attendance ON events.event_id=attendance.event_id
    JOIN users ON users.user_id=attendance.user_id
    WHERE users.user_id=$1
    AND events.event_id=$2
    `,
            [user_id, event_id]
        )
        .then(({ rows }) => {
            if (rows[0]) {
                rows[0].is_user_attending = true;
                return rows[0];
            } else return null;
        });
};

exports.insertAttendance = (user_id, event_id) => {
    return db
        .query(
            `
    INSERT INTO attendance
      (user_id, event_id)
    VALUES
      ($1, $2)
    RETURNING *
      `,
            [user_id, event_id]
        )
        .then(({ rows }) => {
            return rows[0];
        });
};
