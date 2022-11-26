import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

export const UserNew = () => {

  const {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    handleChangeSex,
    handleBirthday,
    handleChangeIncome,
    getImage,
    name,
    email,
    password,
    passwordConfirmation,
    image,
    sex,
    birthday,
    income,
    loadJSON,
    createUser
  } = useUserContext();

  const data = new FormData()
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", passwordConfirmation);
    data.append("image", image);
    data.append("sex", sex);
    data.append("birthday", birthday);
    data.append("income", income)
    console.log([...data.entries()]);

  if (loadJSON("logged_in") === true) {
    return <Navigate replace to="/"/>;
  }

  return(
    <div>
      <label className=" essencial" htmlFor="name">名前</label>
      <br/>
      <input
      id="name"
      name="name"
      value={name}
      onChange={handleChangeName}
      type="text"
      placeholder="名前"
      />
      <br/>

      <label className=" essencial" htmlFor="email">メールアドレス</label>
      <br/>
      <input
      id="email"
      name="email"
      value={email}
      onChange={handleChangeEmail}
      type="email"
      placeholder="メールアドレス"
      />
      <br/>

      <label className=" essencial" htmlFor="password">パスワード</label>
      <br/>
      <input
      id="password"
      name="password"
      value={password}
      onChange={handleChangePassword}
      type="password"
      placeholder="パスワード"
      />
      <br/>

      <label className=" essencial" htmlFor="passwordConfirmation">パスワード確認</label>
      <br/>
      <input
      id="passwordConfirmation"
      name="passwordConfirmation"
      value={passwordConfirmation}
      onChange={handleChangePasswordConfirmation}
      type="password"
      placeholder="パスワード確認"
      />
      <br/>

      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />

      <div className="radio">
        <label className=" essencial" htmlFor="sex">性別</label>
        <br/>
        <label>
          <input
          type="radio"
          name={sex}
          value="1"
          onChange={handleChangeSex}
          checked="checked"
          />
          男性
        </label>
        <label>
          <input
          type="radio"
          name={sex}
          value="2"
          onChange={handleChangeSex}
          />
          女性
        </label>
      </div>

      <div className='form-block'>
        <label className=" essencial" htmlFor="birthday">生年月日</label>
        <br/>
        <input type="date" name="birthday" value={birthday} onChange={handleBirthday} />
      </div>

      <div className='form-block'>
        <label htmlFor="email">収入※額面</label>
        <input type="number"
        name="income"
        onChange={handleChangeIncome}
        value={income}
        />
      </div>

      <input type="button" onClick={()=> {createUser(data)}} value="新規登録" />
    </div>
  );
}