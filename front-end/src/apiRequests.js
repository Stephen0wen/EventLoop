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

export function getPlans(token, user_id) {
    if (token && user_id) {
        return axios(`${baseURL}/api/user/${user_id}/events`, {
            headers: { auth: token },
        }).then(({ data: { events } }) => {
            return events;
        });
    }
    return Promise.reject("No token or user_id");
}

export function getPlan(token, user_id, event_id) {
    if (token && user_id) {
        return axios(`${baseURL}/api/user/${user_id}/events/${event_id}`, {
            headers: { auth: token },
        }).then(({ data: { event } }) => {
            return event;
        });
    }
    return Promise.reject("No token or user_id");
}
