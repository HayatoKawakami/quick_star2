import React from "react";
import {Container} from "./component/Container";
import {Menu} from "./component/Menu";
import {StatusBar} from "./component/StatusBar";


class App extends React.Component {

    render() {
        
        
        return(
            <div>
                <StatusBar />
                <Menu />
                <Container />
            </div>
            
        );
    }
}

export {App};