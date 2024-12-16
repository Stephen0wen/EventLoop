import { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { getEvents } from "../../apiRequests";
import EventGrid from "../EventGrid/EventGrid";
import LoadMsg from "../LoadMsg/LoadMsg";
import { ErrorContext } from "../../Contexts/ErrorContext";

function HomePage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useContext(ErrorContext);

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
                setError(apiError);
            });
    }, []);

    if (isLoading) {
        return <LoadMsg message="Loading Events..." />;
    }

    return (
        <main>
            <section id="welcome" aria-label="Welcome Message">
                <h2>Welcome to EventLoop!</h2>
            </section>
            <section id="events" aria-label="Events Section">
                <EventGrid events={events} />
            </section>
        </main>
    );
}

export default HomePage;
