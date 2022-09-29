import React, {useState, useEffect} from "react";

function UserShow() {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/users/", {method: "GET"})
    .then(response => response.json())
    .then(data => { setUsers(data); })
  }, [])

  console.log(users);

  return(
    <div>
      <p>これはuserのindexページです</p>
      <p></p>
    </div>
  );
}

export {UserShow};