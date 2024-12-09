import "./PlansPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { getPlans } from "../../apiRequests";
import EventList from "../EventList/EventList";
import { useNavigate } from "react-router-dom";

function PlansPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id, isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    setTimeout(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, 5000);

    useEffect(() => {
        setIsLoading(true);
        getPlans(token, user_id)
            .then((plans) => {
                setEvents(plans);
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
            <LoadMsg message="Loading Plans...">
                <p>Please ensure you are logged in...</p>
            </LoadMsg>
        );
    }

    return (
        <main>
            <section id="plans-title">
                <h2>Your Current Plans:</h2>
            </section>
            <section id="plans" aria-label="Plans Section">
                <EventList destination="plans" events={events} />
            </section>
        </main>
    );
}

export default PlansPage;
