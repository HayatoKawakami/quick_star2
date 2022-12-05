import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { UserContextProvider } from "./contexts/UserContext";
import { ConstContextProvider } from "./contexts/ConstContext";
import { ItemContextProvider } from "./contexts/ItemContext";
import { CostContextProvider } from "./contexts/CostContext";


export const App = () => {
    return(
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
    );
}
