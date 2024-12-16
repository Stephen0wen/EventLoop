import "./ManageListPage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getStaffEvents } from "../../apiRequests";
import EventList from "../EventList/EventList";

function ManageListPage() {
    const { event_id } = useParams();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id, isLoggedIn, user_is_staff } =
        useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getStaffEvents(token, user_id)
            .then((apiEvents) => {
                setEvents(apiEvents);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((apiError) => {
                console.log(apiError);
            });
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
