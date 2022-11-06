import React, {useState} from "react";
import { Link } from "react-router-dom"
import { useLoggedInStatusContext } from "../../contexts/LoginContext";
import classNames from 'classnames';

export const Menu = () => {

  const baseURL = "http://localhost:3000";
  const { user, Logout, logged_in } = useLoggedInStatusContext();

  const [active, setActive] = useState(false);
  const [menuBtnImg, setMenuBtnImg] = useState('OPEN')

  const activeMenuBox = () => {
    if (active === true) {
      setActive(false);
      setMenuBtnImg('OPEN');
    } else if (active === false) {
      setActive(true);
      setMenuBtnImg('CLOSE');
    }
  }

  const LoginAndLogoutBox = () => {
    if (logged_in === true) {
      // ログイン時のメニュー
      return (
        <div className={classNames("menu-box", active ? "menu-active" : "menu-hide")}>
          <Link className="menu-user-box" to={`users/profile`}>
            <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} alt="" />
            <p>{user.name}</p>
          </Link>
          <ul className="menu-list">
            <Link className="menu-item" to={`/`}>ホーム</Link>
            <Link className="menu-item" to={`items`}>欲しいもの一覧</Link>
            <Link className="menu-item" to={``}>固定費を管理</Link>
            <Link className="menu-item" to={``}>設定</Link>
            <Link className="menu-item" to={``}>ライト/ダーク</Link>
            <Link className="menu-item" to={``}>ヘルプ</Link>
          </ul>
          <p className="btn red-btn" onClick={Logout}>ログアウト</p>
        </div>
      )
    } else {
      // ログアウト時のメニュー
      return(
        <div className={classNames("menu-box", active ? "menu-active" : "menu-hide")}>
          <Link className="btn blue-btn" to="users/sign_up">新規登録</Link>
          <Link className="btn green-btn" to="login">ログイン</Link>
        </div>
      );
    }
  }

  return(
    <>
      <p className="menu-btn" onClick={activeMenuBox}>{menuBtnImg}</p>
      {LoginAndLogoutBox()}
    </>
  );
}
