import axios from "axios";

const baseURL = "https://eventloop.onrender.com";

export function getEvents() {
    return axios.get(`${baseURL}/api/events`).then(({ data: { events } }) => {
        return events;
    });
}

export function getEvent(event_id) {
    return axios
        .get(`${baseURL}/api/events/${event_id}`)
        .then(({ data: { event } }) => {
            return event;
        });
}
