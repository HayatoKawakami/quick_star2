import React, { useState,useEffect, createContext, useContext } from "react";
import { useConstContext } from "./ConstContext";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [image, setImage] = useState('')
  const [sex, setSex] = useState(1);
  const [birthday, setBirthday] = useState('');
  const [income, setIncome] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');
  const [welfarePensionInsurance, setWelfarePensionInsurance] = useState('');
  const [employmentInsurance, setEmploymentInsurance] = useState('');
  const [socialInsurance, setSocialInsurance] = useState('');
  const [incomeTax, setincomeTax] = useState('');
  const [takeHomePay, setTakeHomePay] = useState('');

  const { 
    navigate,
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  } = useConstContext();

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChangeName = (e) => { setName(e.target.value); }
  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }
  const handleChangePasswordConfirmation = (e) => { setPasswordConfirmation(e.target.value); }
  const handleChangeSex = (e) => { setSex(e.target.value); }
  const handleBirthday = (e) => { setBirthday(e.target.value); }
  const handleChangeIncome = (e) => { setIncome(e.target.value); }

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
  }
  const [previewImage, setPreviewImage] = useState('');

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

  const createUser = async (data) => {
    const config = {
      headers:{'Content-Type': 'multipart/form-data'},
    }

    try {
      const res = await axiosPost("users", data, config)
      console.log('ユーザー新規作成完了'+ res.data);
      setUser(res.data.user);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("ユーザー新規作成できません", error);
    }
  }

  const userSet = async () => {
    try {
      const res = await axiosGet("users", user.id)
      setUserId(res.data.id)
      setName(res.data.name);
      setEmail(res.data.email);
      setIncome(res.data.income)
      console.log("ユーザー情報取得完了",res.data)
      setPreviewImage(res.data.image.url)
    } catch (error) {
      console.log("ユーザー情報取得処理エラー", error)
    }
  }

  const takeHomePaySet = async () => {
    try {
      const res = await axiosGet("take_home_pay");
      console.log("手取り収入情報取得完了", res.data);
      setHealthInsurance(res.data.health_insurance);
      setWelfarePensionInsurance(res.data.welfare_pension_insurance);
      setEmploymentInsurance(res.data.employment_insurance);
      setSocialInsurance(res.data.social_insurance);
      setincomeTax(res.data.income_tax);
      setTakeHomePay(res.data.take_home_pay);
    } catch (error) {
      console.log("手取り収入情報取得処理エラー", error);
    }
  }

  const editUser = async (data) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    try {
      const res = await axiosPut("users", user.id, data, config);
      console.log("送信したデータ", res.data);
      setUser(res.data);
      navigate("users/profile");
    } catch (error) {
      console.log("ユーザー情報更新エラー", error);
    }
  }

  const userDestroy = async () => {
    try {
      const res = await axiosDelete("users", user.id);
      console.log("アカウント削除完了", res.data);
      Logout();
    } catch (error) {
      console.log("アカウント削除処理エラー", error)
    }
  }

  const Login = async (data) => {
    try {
      const res = await axiosPost("login", data);
      console.log("ログイン完了", res.data);
      setLoggedIn(true);
      setUser(res.data.user);
      takeHomePaySet();
      navigate("/");
    } catch (error) {
      console.log("メールアドレス、またはパスワードが間違っています");
    }
  }

  const Logout = async () => {
    try {
      const res = await axiosDelete("logout")
      console.log("ログアウト完了", res.data);
      setLoggedIn(false);
      setUser('');
      navigate("/login");
    } catch (error) {
      console.log("ログイン処理エラー", error);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  },[])

  const checkLoginStatus = async () => {
    try {
      const res = await axiosGet("logged_in");
      if (res.data.logged_in){
        console.log("ログインチェックOK", res.data);
        setLoggedIn(true);
        setUser(res.data.user);
        setUserId(res.data.user.id);
      } else if (res.data.logged_in === false) {
        console.log("ログインチェックNG", res.data);
        setLoggedIn(false);
        setUser({})
      }
    } catch (error) {
      console.log("ログイン処理エラー", error);
    }
  }

  const value = {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    handleChangeSex,
    handleBirthday,
    handleChangeIncome,
    getImage,
    getPreviewImage,
    previewImage,
    user,
    userId,
    name,
    email,
    password,
    passwordConfirmation,
    sex,
    image,
    birthday,
    income,
    healthInsurance,
    welfarePensionInsurance,
    employmentInsurance,
    socialInsurance,
    incomeTax,
    takeHomePay,
    Login,
    Logout,
    loggedIn,
    userSet,
    takeHomePaySet,
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