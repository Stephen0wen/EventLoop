import { useEffect, useState } from "react";
import "./HomePage.css";
import { getEvents } from "../../apiRequests";
import EventGrid from "../EventGrid/EventGrid";

function HomePage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getEvents()
            .then((apiEvents) => {
                setEvents(apiEvents);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((apiError) => {
                console.log(apiError);
            });
    }, []);

    if (isLoading) {
        return (
            <section id="events" className="page">
                <h2>Loading...</h2>
            </section>
        );
    }

    return (
        <section id="events" className="page">
            <EventGrid events={events} />
        </section>
    );
}

export default HomePage;
