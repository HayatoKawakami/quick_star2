import React, { useState,useEffect, createContext, useContext } from "react";
import axios from "../../lib/axios";
import { useConstContext } from "./ConstContext";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [image, setImage] = useState('')
  const [sex, setSex] = useState(1);
  const [birthday, setBirthday] = useState('');

  const { baseURL, baseApiURL, navigate } = useConstContext();
  const [logged_in, setLogged_in] = useState(false);

  const handleChangeName = (e) => { setName(e.target.value); }
  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }
  const handleChangePasswordConfirmation = (e) => { setPasswordConfirmation(e.target.value); }
  const handleChangeSex = (e) => { setSex(e.target.value); }
  const handleBirthday = (e) => { setBirthday(e.target.value); }

  const saveJSON = (key, value) => {
    localStorage.setItem( key, JSON.stringify(value) );
  }
  const loadJSON = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data === "true") {
      return true;
    } else if (data === "false") {
      return false;
    } else {
      return data;
    }
  }

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
  }

  const [previewImage, setPreviewImage] = useState(`${baseURL}/uploads/user/image/${user.id}/icon.jpg`);

  const getPreviewImage = (event) => {
    if (event.target.files) {
      const img = event.target.files[0];
      setImage(img);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result)
        setPreviewImage(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0])

    } else if (!event.target.files) {
      return
    }
  }

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  }

  const createUser = (data) => {

    const config = {
      headers:{'Content-Type': 'multipart/form-data'},
    }
    axios.post(`${baseApiURL}/users`,data, config)
    .then(response =>{
      console.log('ユーザー新規作成完了'+ response.data);
      setUser(response.data.user);
      setLogged_in(true);
      saveJSON("logged_in", true)
      saveJSON("user", response.data.user);
      navigate("/");
    }).catch(error =>{
      console.log("ユーザー新規作成できません", error)
    })
  }

  const userSet = () => {
    axios.get(`${baseApiURL}/users/${loadJSON("user").id}`)
    .then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
      console.log("ユーザー情報取得完了",response.data)
    })
    .catch(error => {
      console.log("ユーザー情報取得処理エラー", error)
    })
  }

  const editUser = (data) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    axios.put(`${baseApiURL}/users/${user.id}`, data, config )
    .then(response => {
      console.log("送信したデータ" + response.data);
      saveJSON("user", response.data);
      setUser(response.data);
      navigate("users/profile");
    })
    .catch(error => {
      console.log("ユーザー情報更新エラー", error);
    })
  }

  const userDestroy = () => {
    axios.delete(`${baseApiURL}/users/${user.id}`)
    .then(response => {
      console.log("アカウント削除完了", response.data);
      Logout();
      // navigate("users/sign_up");
    })
    .catch(error => {
      console.log("アカウント削除処理エラー", error)
    })
  }

  const Login = (data) => {
    console.log("ログイン入力",data);
    axios.post(`${baseApiURL}/login`, data)
    .then(response => {
      if (response.data.logged_in){
        console.log("ログイン完了", response.data);
        setLogged_in(true);
        saveJSON("logged_in", true);
        setUser(response.data.user);
        saveJSON("user", response.data.user);
        navigate("/");
      } else {
        console.log("メールアドレス、またはパスワードが間違っています");
      }
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
  }

  const Logout = () => {
    axios.delete(`${baseApiURL}/logout`)
    .then(response => {
      console.log("ログアウト完了", response.data);
      setLogged_in(false);
      saveJSON("logged_in", false);
      removeLocalStorage("user");
      setUser('');
      navigate("/login");
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
  }

  useEffect(() => {
    checkLoginStatus();
  },[])

  const checkLoginStatus = () => {
    axios.get(`${baseApiURL}/logged_in`,
    {
      withCredentials: true
    })
    .then(response => {
      if (loadJSON("logged_in") === true){
        console.log("ログインチェックOK", response.data);
        setLogged_in(true);
        setUser(loadJSON("user"));
      } else if (loadJSON("logged_in") === false) {
        console.log("ログインチェックNG", response.data);
        setLogged_in(false);
        setUser({})
      }
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
  }

  const value = {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    handleChangeSex,
    handleBirthday,
    getImage,
    getPreviewImage,
    previewImage,
    user,
    name,
    email,
    password,
    passwordConfirmation,
    sex,
    image,
    birthday,
    Login,
    Logout,
    logged_in,
    saveJSON,
    loadJSON,
    removeLocalStorage,
    navigate,
    userSet,
    createUser,
    editUser,
    userDestroy,
  }

  return(
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}