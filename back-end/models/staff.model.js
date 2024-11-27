const db = require("../db/connection");

exports.varifyStaff = (user_id, firebase_id) => {
    return db
        .query(
            `
    SELECT * FROM users 
    WHERE user_id=$1 
    AND user_firebase_id=$2
    AND user_is_staff=true`,
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

exports.fetchStaffEvents = (user_id) => {
    return db
        .query(
            `
    SELECT event_id,
      event_created_by,
      event_title,
      event_start,
      event_end,
      event_location,
      event_thumbnail,
      event_thumbnail_alt,
      event_image,
      event_image_alt,
      event_description_short,
      event_description_long 
    FROM events
    WHERE event_created_by=$1`,
            [user_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.updateEvent = (event_id, requestBody) => {
    return db
        .query(
            `
    UPDATE events
    SET event_title = $1,
      event_start = $2,
      event_end = $3,
      event_location = $4,
      event_thumbnail = $5,
      event_thumbnail_alt = $6,
      event_image = $7,
      event_image_alt = $8,
      event_description_short = $9,
      event_description_long = $10
    WHERE event_id = $11
    RETURNING *`,
            [
                requestBody.event_title,
                requestBody.event_start,
                requestBody.event_end,
                requestBody.event_location,
                requestBody.event_thumbnail,
                requestBody.event_thumbnail_alt,
                requestBody.event_image,
                requestBody.event_image_alt,
                requestBody.event_description_short,
                requestBody.event_description_long,
                event_id,
            ]
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
