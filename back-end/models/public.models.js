const db = require("../db/connection");

exports.fetchEvents = (sort_by, order = "ASC") => {
    const validSortBys = [
        "event_id",
        "event_created_by",
        "event_title",
        "event_start",
        "event_end",
        "event_location",
        "event_thumbnail",
        "event_thumbnail_alt",
        "event_image",
        "event_image_alt",
        "event_description_short",
        "event_description_long",
    ];
    const validOrders = ["ASC", "DESC"];

    if (
        (sort_by && !validSortBys.includes(sort_by)) ||
        (order && !validOrders.includes(order.toUpperCase()))
    ) {
        return Promise.reject({
            status: 404,
            msg: "Query Parameter Not Found",
        });
    }

    let queryStr = `
        SELECT * 
        FROM events`;

    if (sort_by) {
        queryStr += `
        ORDER BY ${sort_by} ${order}`;
    }

    return db.query(queryStr).then(({ rows }) => {
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
