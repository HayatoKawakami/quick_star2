import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
// import {Container} from "./component/Container";
// import {Menu} from "./component/Menu";
// import {StatusBar} from "./component/StatusBar";

function App() {
    return(
        // <div>
        //     <StatusBar />
        //     <Menu />
        //     <Container />
        // </div>
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/register/`} element={<Register />}/>
                <Route path={`/login/`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}



export {App};