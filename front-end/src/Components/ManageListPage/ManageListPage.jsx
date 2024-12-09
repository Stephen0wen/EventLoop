import "./ManageListPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getStaffEvents } from "../../apiRequests";
import EventList from "../EventList/EventList";

function ManageListPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id, isLoggedIn, user_is_staff } =
        useContext(UserContext);
    const navigate = useNavigate();

    setTimeout(() => {
        if (!isLoggedIn) navigate("/login");
        if (!user_is_staff) navigate("/");
    }, 5000);

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
                <LoadMsg message="Loading the events you manage...">
                    <p>{`Please ensure you are logged in (as a staff member)...`}</p>
                </LoadMsg>
            </main>
        );
    }

    return (
        <main>
            <section id="staff-events-title">
                <h2>The events you manage:</h2>
            </section>
            <section id="staff-events">
                <EventList destination="events" events={events} />
            </section>
        </main>
    );
}

export default ManageListPage;
