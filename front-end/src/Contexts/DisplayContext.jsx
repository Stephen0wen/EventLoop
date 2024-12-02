import { createContext, useState } from "react";

export const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
    const [isWide, setIsWide] = useState(true);

    return (
        <DisplayContext.Provider value={{ isWide, setIsWide }}>
            {children}
        </DisplayContext.Provider>
    );
};
