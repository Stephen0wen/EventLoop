import "./PlansPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { getPlans } from "../../apiRequests";
import EventGrid from "../EventGrid/EventGrid";

function PlansPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id } = useContext(UserContext);

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
        return <LoadMsg message="Loading Plans..." />;
    }

    return (
        <section id="plans" aria-label="Plans Section" className="page">
            <EventGrid events={events} />
        </section>
    );
}

export default PlansPage;
