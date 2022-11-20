import React, {useState} from "react";
import { Link } from "react-router-dom"
import { useLoginContext } from "../../contexts/LoginContext";
import { useConstContext } from "../../contexts/ConstContext";
import classNames from 'classnames';

import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Menu = () => {

  const { baseURL, FontAwesomeIcon } = useConstContext();
  const { user, Logout, logged_in } = useLoginContext();

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
          <div className="menu-box-after" onClick={activeMenuBox}></div>
          <Link className="menu-user-box" to={`users/profile`} onClick={activeMenuBox}>
            <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} alt="" />
            <div className="menu-user-text">
              <p className="">{user.name}</p>
              <p className="">{user.email}</p>
            </div>
          </Link>
          <ul className="menu-list">
            <Link className="menu-item" to={`/`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faHouse}/>
              <p>ホーム</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={`items`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faHouse}/>
              <p>欲しいもの一覧</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={`costs`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faHouse}/>
              <p>固定費を管理</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={``} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faHouse}/>
              <p>設定</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={``} onClick={activeMenuBox}>ライト/ダーク</Link>
            <Link className="menu-item" to={``} onClick={activeMenuBox}>ヘルプ</Link>
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
