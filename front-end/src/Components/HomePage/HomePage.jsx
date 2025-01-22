import { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { getEvents } from "../../apiRequests";
import EventGrid from "../EventGrid/EventGrid";
import LoadMsg from "../LoadMsg/LoadMsg";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useSearchParams } from "react-router-dom";
import SortFAB from "../SortFAB/SortFAB";

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
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

    useEffect(() => {
        setIsLoading(true);
        const sort_by = searchParams.get("sort_by") || "event_id";
        const order = searchParams.get("order") || "desc";
        const queries = { params: { sort_by, order } };
        getEvents(queries)
            .then((apiArticles) => {
                setEvents(apiArticles);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((apiError) => {
                setError(apiError);
            });
    }, [searchParams]);

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
            <SortFAB />
        </main>
    );
}

export default HomePage;
