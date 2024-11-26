const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/test-data/index");
const endpoints = require("../endpoints.json");
const { getToken } = require("../utils/getToken");

afterAll(() => {
    return db.end();
});

beforeEach(() => {
    return seed(data);
});

describe("/api", () => {
    test("GET:200 Should return the endpoints.json file", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual(endpoints);
            });
    });
    test("GET:404 Should return an error when an invalid path is requested", () => {
        return request(app)
            .get("/api/not_an_endpoint")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Endpoint Not Found");
            });
    });
});
describe("/api/events", () => {
    test("GET:200 Should return an array of event objects", () => {
        return request(app)
            .get("/api/events")
            .expect(200)
            .then(({ body: { events } }) => {
                expect(events.length).toBe(4);
                events.forEach((event) => {
                    expect(Object.keys(event).length).toBe(12);
                    expect(typeof event.event_id).toBe("number");
                    expect(typeof event.event_created_by).toBe("number");
                    expect(typeof event.event_title).toBe("string");
                    expect(typeof event.event_start).toBe("string");
                    expect(typeof event.event_end).toBe("string");
                    expect(typeof event.event_location).toBe("string");
                    expect(typeof event.event_thumbnail).toBe("string");
                    expect(typeof event.event_thumbnail_alt).toBe("string");
                    expect(typeof event.event_image).toBe("string");
                    expect(typeof event.event_image_alt).toBe("string");
                    expect(typeof event.event_description_short).toBe("string");
                    expect(typeof event.event_description_long).toBe("string");
                });
            });
    });
});
describe("/api/events/:event_id", () => {
    test("GET:200 Should return the event object with the specified event_id", () => {
        return request(app)
            .get("/api/events/2")
            .expect(200)
            .then(({ body: { event } }) => {
                expect(event).toEqual({
                    event_id: 2,
                    event_created_by: 1,
                    event_title: "Magical Gathering",
                    event_start: "2025-01-15T14:00:00.000Z",
                    event_end: "2025-01-15T16:00:00.000Z",
                    event_location: "The Leaky Cauldron",
                    event_thumbnail: "https://example.com/magic-thumbnail.jpg",
                    event_thumbnail_alt: "The Leaky Cauldron pub",
                    event_image: "https://example.com/magic-event.jpg",
                    event_image_alt: "Wizards enjoying a drink",
                    event_description_short:
                        "A magical gathering of wizards and witches",
                    event_description_long:
                        "Join us for a magical gathering where wizards and witches come together at The Leaky Cauldron.",
                });
            });
    });
    test("GET:400 Should return an error when given an invalid event_id", () => {
        return request(app)
            .get("/api/events/bad_id")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid Request");
            });
    });
    test("GET:404 Should return an error when given an event_id which doesn't exist", () => {
        return request(app)
            .get("/api/events/10")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Resource Not Found");
            });
    });
});
describe("/api/user/:user_id/events", () => {
    test("GET:200 Should return an array of events associated with the user", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .get("/api/user/4/events")
                    .set({ auth: idToken })
                    .expect(200);
            })
            .then(({ body: { events } }) => {
                expect(events.length).toBe(2);
                events.forEach((event) => {
                    expect(Object.keys(event).length).toBe(12);
                    expect(typeof event.event_id).toBe("number");
                    expect(typeof event.event_created_by).toBe("number");
                    expect(typeof event.event_title).toBe("string");
                    expect(typeof event.event_start).toBe("string");
                    expect(typeof event.event_end).toBe("string");
                    expect(typeof event.event_location).toBe("string");
                    expect(typeof event.event_thumbnail).toBe("string");
                    expect(typeof event.event_thumbnail_alt).toBe("string");
                    expect(typeof event.event_image).toBe("string");
                    expect(typeof event.event_image_alt).toBe("string");
                    expect(typeof event.event_description_short).toBe("string");
                    expect(typeof event.event_description_long).toBe("string");
                });
            });
    });
    test("GET:403 Should return an authentication error if no auth header is provided", () => {
        return request(app)
            .get("/api/user/4/events")
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("GET:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .get("/api/user/4/events")
            .set({ auth: "not a token" })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("GET:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(5).then((idToken) => {
            return request(app)
                .get("/api/user/4/events")
                .set({ auth: idToken })
                .expect(403)
                .then(({ body: { msg } }) => {
                    expect(msg).toBe("Authentication Failed");
                });
        });
    });
});
