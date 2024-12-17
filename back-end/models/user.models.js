const { getFirebaseUser } = require("../auth/getEmail");
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
            return rows[0];
        });
};

exports.fetchUser = (firebase_id) => {
    return db
        .query(
            `
    SELECT user_id, user_is_staff, user_refresh_token 
    FROM users
    WHERE user_firebase_id = $1    
        `,
            [firebase_id]
        )
        .then(({ rows }) => {
            if (!rows.length) {
                return false;
            }
            const { user_id, user_is_staff, user_refresh_token } = rows[0];
            const user_calendar_allowed = user_refresh_token ? true : false;
            return { user_id, user_is_staff, user_calendar_allowed };
        });
};

exports.insertUser = (request) => {
    return getFirebaseUser(request)
        .then(({ email, uid }) => {
            return db.query(
                `
    INSERT INTO users
        (user_firebase_id, user_email, user_is_staff)
    VALUES ($1, $2, $3)
    RETURNING user_id, user_is_staff, user_refresh_token
        `,
                [uid, email, false]
            );
        })
        .then(({ rows }) => {
            const { user_id, user_is_staff, user_refresh_token } = rows[0];
            const user_calendar_allowed = user_refresh_token ? true : false;
            return { user_id, user_is_staff, user_calendar_allowed };
        });
};

exports.updateTokens = (refresh_token, user_id) => {
    return db
        .query(
            `
    UPDATE users
    SET user_refresh_token = $1
    WHERE user_id = $2
    RETURNING *    
        `,
            [refresh_token, user_id]
        )
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.dropUser = (firebase_id) => {
    return db
        .query(
            `
    SELECT user_id, user_is_staff
    FROM users
    WHERE user_firebase_id = $1 
        `,
            [firebase_id]
        )
        .then(({ rows }) => {
            if (!rows.length) return;
            const { user_id, user_is_staff } = rows[0];
            if (user_is_staff) {
                return Promise.reject({
                    status: 403,
                    msg: "Staff accounts can only be deleted by the administrator",
                });
            } else {
                return db.query(
                    `
    DELETE FROM attendance
    WHERE user_id = $1         
                    `,
                    [user_id]
                );
            }
        })
        .then(() => {
            return db.query(
                `
    DELETE FROM users
    WHERE user_firebase_id = $1
    RETURNING *
                `,
                [firebase_id]
            );
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

exports.dropAttendance = (user_id, event_id) => {
    return db
        .query(
            `
    DELETE FROM attendance
    WHERE user_id=$1
    AND event_id=$2
    RETURNING *    
        `,
            [user_id, event_id]
        )
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({
                    status: 404,
                    msg: "Resource Not Found",
                });
            }
        });
};
