import "./ManageListPage.css";
import { useEffect, useState, useContext } from "react";
import LoadMsg from "../LoadMsg/LoadMsg";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

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
}

export default ManageListPage;
