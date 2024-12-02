import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [user_id, setUser_id] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                user_id,
                setUser_id,
                isLoggedIn,
                setIsLoggedIn,
                token,
                setToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
