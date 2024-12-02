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

export function getUserId(token) {
    return axios(`${baseURL}/api/user`, {
        headers: { auth: token },
    }).then(({ data: { user_id } }) => {
        return user_id;
    });
}
