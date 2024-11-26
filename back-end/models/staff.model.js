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
