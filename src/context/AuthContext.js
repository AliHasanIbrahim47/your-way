import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState();
    // const [role, setRole] = useState();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        // const savedRole = localStorage.getItem('role');
    
        if(savedToken) setToken(savedToken);
        // if(savedRole) setRole(savedRole);
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        // setRole(newRole);

        localStorage.setItem('token', newToken);
        // localStorage.setItem('role', newRole);
    }

    const logout = () => {
        setToken(null);
        // setRole(null);

        localStorage.removeItem('token');
        // localStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider value={{token ,login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };