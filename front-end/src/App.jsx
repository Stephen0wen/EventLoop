import AccountPage from "./Components/AccountPage/AccountPage";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import EventPage from "./Components/EventPage/EventPage";
import { Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { getUser } from "./apiRequests";
import FooterNav from "./Components/FooterNav/FooterNav";
import { DisplayContext } from "./Contexts/DisplayContext";
import useWindowSize from "./Hooks/useWindowSize";
import PlansPage from "./Components/PlansPage/PlansPage";
import PlanDetailsPage from "./Components/PlanDetailsPage/PlanDetailsPage";
import ManageListPage from "./Components/ManageListPage/ManageListPage";
import ManageEventPage from "./Components/ManageEventPage/ManageEventPage";
import EditEventForm from "./Components/EditEventPage/EditEventPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import { ErrorContext } from "./Contexts/ErrorContext";
import ErrorDisplay from "./Components/ErrorDisplay/ErrorDisplay";

function App() {
    const { setUser, setIsLoggedIn, setUser_id, setToken, setUser_is_staff } =
        useContext(UserContext);

    const { setIsWide } = useContext(DisplayContext);
    const windowSize = useWindowSize();

    const { error } = useContext(ErrorContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((apiToken) => {
                        setToken(apiToken);
                        return getUser(apiToken);
                    })
                    .then(({ user_id, user_is_staff }) => {
                        setUser_id(user_id);
                        setUser_is_staff(user_is_staff);
                        setUser(user);
                        setIsLoggedIn(true);
                    });
            } else {
                setUser(null);
                setUser_id(true);
                setIsLoggedIn(false);
                setToken(true);
            }
        });
    }, []);

    useEffect(() => {
        if (windowSize.width > 750) {
            setIsWide(true);
        } else setIsWide(false);
    }, [windowSize]);

    if (error) {
        return (
            <>
                <Header />
                <ErrorDisplay />
                <FooterNav />
            </>
        );
    }

    return (
        <>
            <Header />
            <FooterNav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<HomePage />} />
                <Route path="/events/:event_id" element={<EventPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/plans/:event_id" element={<PlanDetailsPage />} />
                <Route path="/manage" element={<ManageListPage />} />
                <Route path="/manage/:event_id" element={<ManageEventPage />} />
                <Route
                    path="/manage/:event_id/edit"
                    element={<EditEventForm />}
                />
                <Route path="/create" element={<CreateEventPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/*" element={<ErrorDisplay notFound={true} />} />
            </Routes>
        </>
    );
}

export default App;
