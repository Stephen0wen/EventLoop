import "./PlansPage.css";
import { useEffect, useState } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";

function PlansPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <LoadMsg message="Loading Plans..." />;
    }
}

export default PlansPage;
