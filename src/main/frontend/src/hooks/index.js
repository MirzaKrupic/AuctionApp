import {createContext, useContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const[token, setToken] = useState(null)

    const isUserLoggedIn = () => !!token

    return(
        <AuthContext.Provider value = {{token, setToken, isUserLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)