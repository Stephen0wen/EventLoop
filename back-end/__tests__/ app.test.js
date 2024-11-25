const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/test-data/index");

afterAll(() => {
    return db.end();
});

beforeEach(() => {
    return seed(data);
});

describe("errors", () => {
    test("GET:404 Should return an error when an invalid path is requested", () => {
        return request(app)
            .get("/api/not_an_endpoint")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Not Found");
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
