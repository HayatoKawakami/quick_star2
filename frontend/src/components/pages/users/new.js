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
    loggedIn,
    createUser,
    flash,
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

  if (loggedIn === true) {
    return <Navigate replace to="/"/>;
  }

  const handleEnterKeyDown = (e) => {
    if(e && e.key !== 'Enter') {
      return
    } else {
      createUser(data)
    }
  }

  return(
    <div>
      <label name="name" className=" essencial" htmlFor="name">名前</label>
      <input
      data-testid="userNewNameInput"
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
      data-testid="userNewEmailInput"
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
      data-testid="userNewPasswordInput"
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
      data-testid="userNewPasswordConfirmationInput"
      name="passwordConfirmation"
      value={passwordConfirmation}
      onChange={handleChangePasswordConfirmation}
      type="password"
      placeholder="パスワード確認"
      />
      <br/>

      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />

      <div className="radio">
        <label  className=" essencial" htmlFor="sex">性別</label>
        <br/>
          <input
          type="radio"
          name={sex}
          value="1"
          onChange={handleChangeSex}
          defaultChecked={true}
          />
          男性
          <input
          type="radio"
          name={sex}
          value="2"
          onChange={handleChangeSex}
          />
          女性
      </div>

      <div className='form-block'>
        <label className=" essencial" htmlFor="userNewBirthday">生年月日</label>
        <input data-testid="userNewBirthdayInput" type="date" name="birthday" value={birthday} onChange={handleBirthday} />
      </div>

      <div className='form-block '>
        <label className="essencial" htmlFor="userNewIncome">収入※額面</label>
        <input 
        data-testid="userNewIncomeInput"
        type="number"
        name="income"
        onKeyDown={handleEnterKeyDown}
        onChange={handleChangeIncome}
        value={income}
        />
      </div>

      <input data-testid="userNewSubmitButton" type="button" onClick={()=> {createUser(data)}} value="新規登録" />
      <p>{flash}</p>
    </div>
  );
}