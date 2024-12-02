import AccountPage from "./Components/AccountPage/AccountPage";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import PublicEventPage from "./Components/PublicEventPage/PublicEventPage";
import { Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { getUserId } from "./apiRequests";

function App() {
    const { setUser, setIsLoggedIn, setUser_id, setToken } =
        useContext(UserContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((apiToken) => {
                        setToken(apiToken);
                        return getUserId(apiToken);
                    })
                    .then((apiUser_id) => {
                        setUser_id(apiUser_id);
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

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/events/:event_id" element={<PublicEventPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </>
    );
}

export default App;
