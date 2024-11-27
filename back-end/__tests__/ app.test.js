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
        return getToken(5)
            .then((idToken) => {
                return request(app)
                    .get("/api/user/4/events")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
});

describe("/api/user/:user_id/events/:event_id", () => {
    test("POST:201 Should register the attendance of the user to the event and return the new attendance object", () => {
        return getToken(6)
            .then((idToken) => {
                return request(app)
                    .post("/api/user/6/events/1")
                    .set({ auth: idToken })
                    .expect(201);
            })
            .then(({ body: { attendance } }) => {
                expect(attendance).toEqual({
                    attendance_id: 9,
                    event_id: 1,
                    user_id: 6,
                });
            });
    });
    test("POST:400 Should return an error when given an invalid event_id", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .post("/api/user/4/events/bad_id")
                    .set({ auth: idToken })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid Request");
            });
    });
    test("POST:404 Should return an error when given an event_id which doesn't exist", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .post("/api/user/4/events/999")
                    .set({ auth: idToken })
                    .expect(404);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Resource Not Found");
            });
    });
    test("POST:403 Should return an authentication error if no auth header is provided", () => {
        return request(app)
            .post("/api/user/4/events/1")
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("POST:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .post("/api/user/4/events/1")
            .set({ auth: "not a token" })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("POST:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(5)
            .then((idToken) => {
                return request(app)
                    .post("/api/user/4/events/1")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
});

describe("/api/staff/:user_id/events", () => {
    test("GET:200 Should return an array of events created by the user", () => {
        return getToken(1)
            .then((idToken) => {
                return request(app)
                    .get("/api/staff/1/events")
                    .set({ auth: idToken })
                    .expect(200);
            })
            .then(({ body: { events } }) => {
                expect(events.length).toBe(3);
                events.forEach((event) => {
                    expect(Object.keys(event).length).toBe(12);
                    expect(typeof event.event_id).toBe("number");
                    expect(event.event_created_by).toBe(1);
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
            .get("/api/staff/1/events")
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("GET:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .get("/api/staff/1/events")
            .set({ auth: "not a token" })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("GET:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .get("/api/staff/1/events")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("GET:403 Should return an authentication if user_is_staff is false", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .get("/api/staff/4/events")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });

    test("POST:201 Should create an event and return the new event object", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .post("/api/staff/2/events")
                    .set({ auth: idToken })
                    .send({
                        event_title: "Potion Brewing Workshop",
                        event_start: "2025-04-12T10:00:00Z",
                        event_end: "2025-04-12T13:00:00Z",
                        event_location: "Snape's Dungeon",
                        event_thumbnail:
                            "https://example.com/potions-thumbnail.jpg",
                        event_thumbnail_alt: "Potions bottles and cauldrons",
                        event_image: "https://example.com/potions-workshop.jpg",
                        event_image_alt:
                            "Students brewing potions in a dark dungeon",
                        event_description_short:
                            "Learn the art of potion brewing",
                        event_description_long:
                            "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
                    })
                    .expect(201);
            })
            .then(({ body: { event } }) => {
                expect(event).toEqual({
                    event_id: 5,
                    event_created_by: 2,
                    event_title: "Potion Brewing Workshop",
                    event_start: "2025-04-12T09:00:00.000Z",
                    event_end: "2025-04-12T12:00:00.000Z",
                    event_location: "Snape's Dungeon",
                    event_thumbnail:
                        "https://example.com/potions-thumbnail.jpg",
                    event_thumbnail_alt: "Potions bottles and cauldrons",
                    event_image: "https://example.com/potions-workshop.jpg",
                    event_image_alt:
                        "Students brewing potions in a dark dungeon",
                    event_description_short: "Learn the art of potion brewing",
                    event_description_long:
                        "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
                });
            });
    });
    test("POST:400 Should return an error when given an incomplete request body", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .post("/api/staff/2/events")
                    .set({ auth: idToken })
                    .send({
                        event_title: "Potion Brewing Workshop",
                        event_start: "2025-04-12T10:00:00Z",
                        event_end: "2025-04-12T13:00:00Z",
                    })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toEqual("Invalid Request Body");
            });
    });
    test("POST:400 Should return an error when given a complete request with invalid data", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .post("/api/staff/2/events")
                    .set({ auth: idToken })
                    .send({
                        event_title: "Potion Brewing Workshop",
                        event_start: "not a datetime",
                        event_end: "not a datetime",
                        event_location: "Snape's Dungeon",
                        event_thumbnail:
                            "https://example.com/potions-thumbnail.jpg",
                        event_thumbnail_alt: "Potions bottles and cauldrons",
                        event_image: "https://example.com/potions-workshop.jpg",
                        event_image_alt:
                            "Students brewing potions in a dark dungeon",
                        event_description_short:
                            "Learn the art of potion brewing",
                        event_description_long:
                            "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
                    });
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid Request Body");
            });
    });
    test("POST:403 Should return an authentication error if no auth header is provided", () => {
        return request(app)
            .post("/api/staff/1/events")
            .send({
                event_title: "Potion Brewing Workshop",
                event_start: "2025-04-12T10:00:00Z",
                event_end: "2025-04-12T13:00:00Z",
                event_location: "Snape's Dungeon",
                event_thumbnail: "https://example.com/potions-thumbnail.jpg",
                event_thumbnail_alt: "Potions bottles and cauldrons",
                event_image: "https://example.com/potions-workshop.jpg",
                event_image_alt: "Students brewing potions in a dark dungeon",
                event_description_short: "Learn the art of potion brewing",
                event_description_long:
                    "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
            })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("POST:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .post("/api/staff/1/events")
            .set({ auth: "not a token" })
            .send({
                event_title: "Potion Brewing Workshop",
                event_start: "2025-04-12T10:00:00Z",
                event_end: "2025-04-12T13:00:00Z",
                event_location: "Snape's Dungeon",
                event_thumbnail: "https://example.com/potions-thumbnail.jpg",
                event_thumbnail_alt: "Potions bottles and cauldrons",
                event_image: "https://example.com/potions-workshop.jpg",
                event_image_alt: "Students brewing potions in a dark dungeon",
                event_description_short: "Learn the art of potion brewing",
                event_description_long:
                    "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
            })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("POST:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .post("/api/staff/1/events")
                    .set({ auth: idToken })
                    .send({
                        event_title: "Potion Brewing Workshop",
                        event_start: "2025-04-12T10:00:00Z",
                        event_end: "2025-04-12T13:00:00Z",
                        event_location: "Snape's Dungeon",
                        event_thumbnail:
                            "https://example.com/potions-thumbnail.jpg",
                        event_thumbnail_alt: "Potions bottles and cauldrons",
                        event_image: "https://example.com/potions-workshop.jpg",
                        event_image_alt:
                            "Students brewing potions in a dark dungeon",
                        event_description_short:
                            "Learn the art of potion brewing",
                        event_description_long:
                            "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
                    })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("POST:403 Should return an authentication if user_is_staff is false", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .post("/api/staff/4/events")
                    .set({ auth: idToken })
                    .send({
                        event_title: "Potion Brewing Workshop",
                        event_start: "2025-04-12T10:00:00Z",
                        event_end: "2025-04-12T13:00:00Z",
                        event_location: "Snape's Dungeon",
                        event_thumbnail:
                            "https://example.com/potions-thumbnail.jpg",
                        event_thumbnail_alt: "Potions bottles and cauldrons",
                        event_image: "https://example.com/potions-workshop.jpg",
                        event_image_alt:
                            "Students brewing potions in a dark dungeon",
                        event_description_short:
                            "Learn the art of potion brewing",
                        event_description_long:
                            "Join a hands-on workshop to master the delicate craft of potion brewing, guided by a potions expert.",
                    })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
});

describe("/api/staff/:user_id/events/:event_id", () => {
    test("PATCH:200 Should update the event and return the new event object", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/2/events/1")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(200);
            })
            .then(({ body: { event } }) => {
                expect(event).toEqual({
                    event_id: 1,
                    event_created_by: 2,
                    event_title: "A whole New Event Name",
                    event_start: "2024-12-25T10:30:00.000Z",
                    event_end: "2024-12-25T12:30:00.000Z",
                    event_location: "42 Privet Drive",
                    event_thumbnail:
                        "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                    event_thumbnail_alt: "A wizards childhood home",
                    event_image:
                        "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                    event_image_alt:
                        "A wizards aunt stood infront of his childhood home",
                    event_description_short:
                        "Lets say hello to the magical world of events",
                    event_description_long:
                        "A longer description of an event at Mr Potter's house",
                });
            });
    });
    test("PATCH:400 Should return an error when given an incomplete request body", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/2/events/1")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                    })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toEqual("Invalid Request Body");
            });
    });
    test("PATCH:400 Should return an error when given a complete request with invalid data", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/2/events/1")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "not a datetime",
                        event_end: "not a datetime",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toEqual("Invalid Request Body");
            });
    });
    test("PATCH:400 Should return an error when given an invalid event_id", () => {
        return getToken(1)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/1/events/bad_id")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid Request");
            });
    });
    test("PATCH:404 Should return an error when given an event_id which doesn't exist", () => {
        return getToken(1)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/1/events/999")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(404);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Resource Not Found");
            });
    });
    test("PATCH:403 Should return an authentication error if no auth header is provided", () => {
        return request(app)
            .patch("/api/staff/1/events/1")
            .send({
                event_title: "A whole New Event Name",
                event_start: "2024-12-25T10:30:00.000Z",
                event_end: "2024-12-25T12:30:00.000Z",
                event_location: "42 Privet Drive",
                event_thumbnail:
                    "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                event_thumbnail_alt: "A wizards childhood home",
                event_image:
                    "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                event_image_alt:
                    "A wizards aunt stood infront of his childhood home",
                event_description_short:
                    "Lets say hello to the magical world of events",
                event_description_long:
                    "A longer description of an event at Mr Potter's house",
            })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("PATCH:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .patch("/api/staff/1/events/1")
            .set({ auth: "not a token" })
            .send({
                event_title: "A whole New Event Name",
                event_start: "2024-12-25T10:30:00.000Z",
                event_end: "2024-12-25T12:30:00.000Z",
                event_location: "42 Privet Drive",
                event_thumbnail:
                    "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                event_thumbnail_alt: "A wizards childhood home",
                event_image:
                    "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                event_image_alt:
                    "A wizards aunt stood infront of his childhood home",
                event_description_short:
                    "Lets say hello to the magical world of events",
                event_description_long:
                    "A longer description of an event at Mr Potter's house",
            })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("PATCH:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/1/events/1")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("PATCH:403 Should return an authentication if user_is_staff is false", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .patch("/api/staff/4/events/1")
                    .set({ auth: idToken })
                    .send({
                        event_title: "A whole New Event Name",
                        event_start: "2024-12-25T10:30:00.000Z",
                        event_end: "2024-12-25T12:30:00.000Z",
                        event_location: "42 Privet Drive",
                        event_thumbnail:
                            "https://i2-prod.getsurrey.co.uk/incoming/article11906136.ece/ALTERNATES/s1200b/JS99791888.jpg",
                        event_thumbnail_alt: "A wizards childhood home",
                        event_image:
                            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/0B04/production/_91302820_privet8.jpg",
                        event_image_alt:
                            "A wizards aunt stood infront of his childhood home",
                        event_description_short:
                            "Lets say hello to the magical world of events",
                        event_description_long:
                            "A longer description of an event at Mr Potter's house",
                    })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });

    test("DELETE:204 Should delete the event along with all associated attendence data an empty object", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .delete("/api/staff/2/events/1")
                    .set({ auth: idToken })
                    .expect(204);
            })
            .then(({ body }) => {
                expect(body).toEqual({});
            });
    });
    test("DELETE:400 Should return an error when given an invalid event_id", () => {
        return getToken(1)
            .then((idToken) => {
                return request(app)
                    .delete("/api/staff/1/events/bad_id")
                    .set({ auth: idToken })
                    .expect(400);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Invalid Request");
            });
    });
    test("DELETE:404 Should return an error when given an event_id which doesn't exist", () => {
        return getToken(1)
            .then((idToken) => {
                return request(app)
                    .delete("/api/staff/1/events/999")
                    .set({ auth: idToken })
                    .expect(404);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Resource Not Found");
            });
    });
    test("DELETE:403 Should return an authentication error if no auth header is provided", () => {
        return request(app)
            .delete("/api/staff/1/events/1")
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("No Authentication Token");
            });
    });
    test("DELETE:403 Should return an authentication error if an invalid token is provided", () => {
        return request(app)
            .delete("/api/staff/1/events/1")
            .set({ auth: "not a token" })
            .expect(403)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("DELETE:403 Should return an authentication if the user_id does not match the token", () => {
        return getToken(2)
            .then((idToken) => {
                return request(app)
                    .delete("/api/staff/1/events/1")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
    test("DELETE:403 Should return an authentication if user_is_staff is false", () => {
        return getToken(4)
            .then((idToken) => {
                return request(app)
                    .delete("/api/staff/4/events/1")
                    .set({ auth: idToken })
                    .expect(403);
            })
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Authentication Failed");
            });
    });
});
