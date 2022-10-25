import React, { useState, createContext } from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";

export const LoggedInStatus = createContext()

export const App = () => {

    const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
    const [user, setUser] = useState({})

    return(
        <>
            <Menu />
            <LoggedInStatus.Provider value={loggedInStatus}>
                <StatusBar />
            </LoggedInStatus.Provider>
            <Container />
        </>
    );
}
