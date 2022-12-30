import React, {useState} from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext";
import { useConstContext } from "../../contexts/ConstContext";
import classNames from 'classnames';

import { faHouse, faChevronRight, faCoins, faCog, faAdjust, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

export const Menu = () => {

  const { baseURL, FontAwesomeIcon, ellipsisWord } = useConstContext();
  const { user, loggedIn } = useUserContext();

  const [active, setActive] = useState(false);

  const activeMenuBox = () => {
    if (active === true) {
      setActive(false);
    } else if (active === false) {
      setActive(true);
    }
  }

  const LoginAndLogoutBox = () => {
    if (loggedIn === true) {
      // ログイン時のメニュー
      return (
        <div className={classNames("menu-box", active ? "menu-active" : "menu-hide")}>
          <div className="menu-box-after" onClick={activeMenuBox}></div>
          <div className="menu-user-box">
            <Link to={`users/profile`} onClick={activeMenuBox}>
              <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg?${new Date().getTime()}`} alt="" />
            </Link>
            <Link className="menu-user-text" to={`users/profile`} onClick={activeMenuBox}>
              <p className="">{user.name}</p>
              <p className="">{ellipsisWord(`${user.email}`)(22)('...')}</p>
            </Link>
            <Link className='menu-user-dot' to={`users/profile`} onClick={activeMenuBox}>
              <FontAwesomeIcon icon={faEllipsisH}/>
            </Link>
          </div>
          <ul className="menu-list">
            <Link className="menu-item" to={`/`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faHouse}/>
              <p>ホーム</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={`items`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faCheckSquare}/>
              <p>欲しいもの一覧</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={`costs`} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faCoins}/>
              <p>固定費を管理</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
            <Link className="menu-item" to={``} onClick={activeMenuBox}>
              <FontAwesomeIcon className='menu-icon' icon={faCog}/>
              <p>設定</p>
              <FontAwesomeIcon className='menu-icon-chevron' icon={faChevronRight}/>
            </Link>
          </ul>
          <Link className="menu-item menu-bottom-left" to={``} onClick={activeMenuBox}>
            <FontAwesomeIcon className='menu-bottom-icon' icon={faAdjust}/>
          </Link>
          <Link className="menu-item menu-bottom-right" to={``} onClick={activeMenuBox}>
            <FontAwesomeIcon className='menu-bottom-icon' icon={faQuestionCircle}/>
          </Link>
        </div>
      )
    } else {
      // ログアウト時のメニュー
      return(
        <div className={classNames("menu-box", active ? "menu-active" : "menu-hide")}>
          <div className="menu-box-after" onClick={activeMenuBox}></div>
          <Link className="btn blue-btn" to="users/sign_up" onClick={activeMenuBox}>新規登録</Link>
          <Link className="btn green-btn" to="login" onClick={activeMenuBox}>ログイン</Link>
        </div>
      );
    }
  }

  return(
    <>
      <button className={classNames(active ? 'btn_menu_active' : 'btn_menu')} href="" onClick={activeMenuBox}></button>
      {LoginAndLogoutBox()}
      <div className={classNames(active ? 'shadow-container-active' : 'shadow-container')} ></div>
    </>
  );
}
