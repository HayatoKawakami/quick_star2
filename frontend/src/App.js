import React from "react";

import { StatusBar } from "./components/layouts/StatusBar";
import { Menu } from "./components/layouts/Menu";

import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { UserProfile } from "./components/pages/users/UserProfile";


const App = () => {
    return(
        <>
            <BrowserRouter>
                <Menu />
                <StatusBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="user" element={<UserProfile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export {App};