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

function App() {
    const { setUser, setIsLoggedIn, setUser_id, setToken } =
        useContext(UserContext);

    const { setIsWide } = useContext(DisplayContext);
    const windowSize = useWindowSize();

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
                        setUser(user);
                        setIsLoggedIn(true);
                    });
            } else {
                setUser({});
                setUser_id(null);
                setIsLoggedIn(false);
                setToken(null);
            }
        });
    }, []);

    useEffect(() => {
        if (windowSize.width > 750) {
            setIsWide(true);
        } else setIsWide(false);
    }, [windowSize]);

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </>
    );
}

export default App;
