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
