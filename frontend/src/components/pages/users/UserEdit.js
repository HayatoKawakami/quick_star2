import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

export const UserEdit = () => {

  const userId = useParams();
  const [user, setUser] = useState([]);

  useEffect(()=> {
    axios.get("http://localhost:3000/api/v1/users/1/edit")
    .then((response) => {
      setUser(response.data);
    })
  })


  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // const [image, setImage] = useState('');
  // const [sex, setSex] = useState('');
  // const [birthday, setBirthday] = useState('');


  const handleChangeName = (e) =>{
    
    setName(e.target.value)
  }
  return(
    <>
      <label htmlFor="name">名前</label>
      <input type="text" onChange={handleChangeName} name="name" value={name} />
    </>
  );
}
