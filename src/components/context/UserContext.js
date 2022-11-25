import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const handleSetCurrentUser = (user) => {
        setCurrentUser(user);
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const values = {
        currentUser,
        handleSetCurrentUser,
    };

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
