
import React, {useState} from "react";
class UserShow extends React.Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     name: this.user.name,
  //   }
  // }
  
  render(){
  
    return(
      <div>
        <p>これはuserのshowページです</p>
        {/* <p>{this.user.name}</p> */}
      </div>
    );
  }
}

export {UserShow};