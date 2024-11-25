const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData, eventData, attendanceData }) => {
    return db
        .query("DROP TABLE IF EXISTS attendance;")
        .then(() => {
            return db.query("DROP TABLE IF EXISTS events;");
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS users;");
        })
        .then(() => {
            return db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        user_firebase_id VARCHAR NOT NULL,
        user_email VARCHAR NOT NULL,
        user_is_staff BOOL NOT NULL
      );`);
        })
        .then(() => {
            return db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        event_created_by INT REFERENCES users(user_id) NOT NULL,
        event_title VARCHAR(40) NOT NULL,
        event_start TIMESTAMP,
        event_end TIMESTAMP,
        event_location VARCHAR,
        event_thumbnail VARCHAR,
        event_thumbnail_alt VARCHAR,
        event_image VARCHAR,
        event_image_alt VARCHAR,
        event_description_short VARCHAR(120),
        event_description_long TEXT
      );`);
        })
        .then(() => {
            return db.query(`
      CREATE TABLE attendance (
        attendance_id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(event_id),
        user_id INT REFERENCES users(user_id)
      );`);
        })
        .then(() => {
            const insertUsersQueryStr = format(
                `INSERT INTO users (
              user_firebase_id,
              user_email,
              user_is_staff)
            VALUES %L`,
                userData.map(
                    ({ user_firebase_id, user_email, user_is_staff }) => [
                        user_firebase_id,
                        user_email,
                        user_is_staff,
                    ]
                )
            );
            return db.query(insertUsersQueryStr);
        })
        .then(() => {
            const insertEventsQueryStr = format(
                `INSERT INTO events (
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
        event_description_long)
      VALUES %L`,
                eventData.map(
                    ({
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
                        event_description_long,
                    }) => [
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
                        event_description_long,
                    ]
                )
            );
            return db.query(insertEventsQueryStr);
        })
        .then(() => {
            const insertAttendanceQueryStr = format(
                `INSERT INTO attendance (event_id, user_id)
      VALUES %L`,
                attendanceData.map(({ event_id, user_id }) => [
                    event_id,
                    user_id,
                ])
            );
            return db.query(insertAttendanceQueryStr);
        });
};

module.exports = seed;
