import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { LoggedInStatusProvider } from "./contexts/LoginContext";
import { ConstContextProvider } from "./contexts/ConstContext";
import { ItemContextProvider } from "./contexts/ItemContext";


export const App = () => {

    return(
        <ConstContextProvider>
            <LoggedInStatusProvider>
                <Menu />
                <StatusBar />
                <ItemContextProvider>
                    <Container />
                </ItemContextProvider>
            </LoggedInStatusProvider>
        </ConstContextProvider>
    );
}
