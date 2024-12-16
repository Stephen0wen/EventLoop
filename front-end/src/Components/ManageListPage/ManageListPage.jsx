import "./ManageListPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getStaffEvents } from "../../apiRequests";
import EventList from "../EventList/EventList";
import { ErrorContext } from "../../Contexts/ErrorContext";

function ManageListPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id) {
            getStaffEvents(token, user_id)
                .then((apiEvents) => {
                    setEvents(apiEvents);
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch((apiError) => {
                    setError(apiError);
                });
        }
    }, [token, user_id]);

    if (isLoading) {
        return (
            <main>
                <LoadMsg message="Loading your events..." />
            </main>
        );
    }

    return (
        <main>
            <section id="staff-events-title">
                <h2>The events you manage:</h2>
            </section>
            <section id="staff-events">
                <EventList destination="manage" events={events} />
                <button
                    id="new-event-button"
                    onClick={() => {
                        navigate("/create");
                    }}
                >
                    New Event +
                </button>
            </section>
        </main>
    );
}

export default ManageListPage;
