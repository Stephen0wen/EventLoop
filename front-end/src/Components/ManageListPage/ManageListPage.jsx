import "./ManageListPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";

function ManageListPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user_id } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
    }, [token, user_id]);

    if (isLoading) {
        return (
            <LoadMsg message="Loading the events you manage...">
                <p>{`Please ensure you are logged in (as a staff member)...`}</p>
            </LoadMsg>
        );
    }
}

export default ManageListPage;
