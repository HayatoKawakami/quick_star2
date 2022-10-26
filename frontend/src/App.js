import React, { useState, createContext } from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { LoggedInStatusProvider } from "./contexts/context";



export const App = () => {

    const [user, setUser] = useState({})

    return(
        <>
            <Menu />
            <LoggedInStatusProvider>
                <StatusBar />
            </LoggedInStatusProvider>
            <Container />
        </>
    );
}
