import React from "react";
import {UserShow} from "./contents/users/show";

class Container extends React.Component {
  render(){
    return( 
      <div className="container">
        <h1>これはcontainerです</h1>
        <UserShow />
      </div>
    );
  } 

}

export { Container };