import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";
import { Container } from "./components/layouts/Container";


export const App = () => {
    return(
        <>
            <Menu />
            <StatusBar />
            <Container />
        </>
    );
}
