const db = require("../db/connection");

exports.fetchEvents = () => {
    return db.query(`SELECT * FROM events`).then(({ rows }) => {
        return rows;
    });
};

exports.fetchEvent = (event_id) => {
    return db
        .query(
            `
      SELECT * 
      FROM events
      WHERE event_id=$1
      `,
            [event_id]
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
