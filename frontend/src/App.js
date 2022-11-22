import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { LoginContextProvider } from "./contexts/LoginContext";
import { ConstContextProvider } from "./contexts/ConstContext";
import { ItemContextProvider } from "./contexts/ItemContext";
import { CostContextProvider } from "./contexts/CostContext";


export const App = () => {
    return(
        <ConstContextProvider>
            <LoginContextProvider>
                <ItemContextProvider>
                    <CostContextProvider>
                        <Menu />
                        <StatusBar />
                        <Container />
                        
                    </CostContextProvider>
                </ItemContextProvider>
            </LoginContextProvider>
        </ConstContextProvider>
    );
}
