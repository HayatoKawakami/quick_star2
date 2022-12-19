import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { UserContextProvider } from "./contexts/UserContext";
import { ConstContextProvider } from "./contexts/ConstContext";
import { ItemContextProvider } from "./contexts/ItemContext";
import { CostContextProvider } from "./contexts/CostContext";
import { BrowserRouter } from "react-router-dom";
import { useConstContext } from "./contexts/ConstContext";


export const App = () => {
    return(
        <BrowserRouter>
        <ConstContextProvider>
            <UserContextProvider>
                <CostContextProvider>
                    <ItemContextProvider>
                        <Menu />
                        <StatusBar />
                        <Container />
                    </ItemContextProvider>
                </CostContextProvider>
            </UserContextProvider>
        </ConstContextProvider>
        </BrowserRouter>
    );
}
