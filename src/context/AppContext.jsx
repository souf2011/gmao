import { createContext, useContext, useState } from "react";

export const AppContext = createContext({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
});

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    
    return (
        <AppContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AppContext.Provider>
    );
};

export const useStateContext = () => useContext(AppContext);
