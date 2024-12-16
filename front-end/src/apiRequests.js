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

export function getUser(token) {
    return axios(`${baseURL}/api/user`, {
        headers: { auth: token },
    }).then(({ data: { user } }) => {
        return user;
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
}

export function getPlan(token, user_id, event_id) {
    if (token && user_id) {
        return axios(`${baseURL}/api/user/${user_id}/events/${event_id}`, {
            headers: { auth: token },
        }).then(({ data: { event } }) => {
            return event;
        });
    }
}

export function deletePlan(token, user_id, event_id) {
    if (token && user_id) {
        return axios.delete(
            `${baseURL}/api/user/${user_id}/events/${event_id}`,
            {
                headers: { auth: token },
            }
        );
    }
}

export function postPlan(token, user_id, event_id) {
    if (token && user_id) {
        return axios.post(
            `${baseURL}/api/user/${user_id}/events/${event_id}`,
            {},
            {
                headers: { auth: token },
            }
        );
    }
}

export function getStaffEvents(token, user_id) {
    if (token && user_id) {
        return axios(`${baseURL}/api/staff/${user_id}/events`, {
            headers: { auth: token },
        }).then(({ data: { events } }) => {
            return events;
        });
    }
}

export function deleteEvent(token, user_id, event_id) {
    if (token && user_id) {
        return axios.delete(
            `${baseURL}/api/staff/${user_id}/events/${event_id}`,
            {
                headers: { auth: token },
            }
        );
    }
}

export function patchEvent(token, user_id, event_id, newEvent) {
    if (token && user_id) {
        return axios.patch(
            `${baseURL}/api/staff/${user_id}/events/${event_id}`,
            newEvent,
            { headers: { auth: token } }
        );
    }
}

export function postEvent(token, user_id, newEvent) {
    if (token && user_id) {
        return axios.post(`${baseURL}/api/staff/${user_id}/events`, newEvent, {
            headers: { auth: token },
        });
    }
}
