import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [user_id, setUser_id] = useState(null);
    const [user_is_staff, setUser_is_staff] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                user_id,
                setUser_id,
                user_is_staff,
                setUser_is_staff,
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
