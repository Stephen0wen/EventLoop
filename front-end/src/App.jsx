import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import PublicEventPage from "./Components/PublicEventPage/PublicEventPage";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events/:event_id" element={<PublicEventPage />} />
            </Routes>
        </>
    );
}

export default App;
