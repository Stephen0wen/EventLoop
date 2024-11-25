const db = require("../db/connection");

exports.fetchEvents = () => {
    return db.query(`SELECT * FROM events`).then(({ rows }) => {
        return rows;
    });
};
