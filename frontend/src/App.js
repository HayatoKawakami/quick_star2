import React, { useState } from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";
import { LoggedInStatusProvider } from "./contexts/context";


export const App = () => {

    

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
