import React, { useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useUserContext } from '../../../contexts/UserContext';
import { useItemContext } from '../../../contexts/ItemContext';
import { Navigate, Link } from 'react-router-dom';
import Select from 'react-select';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const ItemNew = () => {
  const { FontAwesomeIcon } = useConstContext();
  const { user, userId, loggedIn } = useUserContext();
  const { 
    name,
    price,
    url,
    site_url,
    handleChangeName,
    handleChangePrice,
    handleChangeSiteName,
    handleChangeSiteUrl,
    handleChangeUrl,
    options,
    getImage,
    createItem,
    setName,
    setPrice,
  } = useItemContext();

  const handleEnterKeyDown = (e) => {
    if(e && e.key !== 'Enter') {
      return
    } else {
      createItem(userId)
    }
  }

  useEffect(()=>{
    setName("");
    setPrice("");
  },[])

  if (loggedIn === true) {
    return <Navigate replace to="/"/>;
  }


  return(
    <>
      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />
      <label className='input-label essencial' htmlFor="name">商品名</label>
      <input className='integer-input' type="text"
              value={name}
              onChange={handleChangeName}
      />
      <label className='input-label essencial' htmlFor="text">価格</label>
      <br />
      <input className='integer-input' type="number"
              value={price}
              onChange={handleChangePrice}
              onKeyDown={handleEnterKeyDown}
      />

      <label className='input-label' htmlFor="">参考動画URL</label>
      <input type="text" value={url} onKeyDown={handleEnterKeyDown} onChange={handleChangeUrl} placeholder="https://www.youtube.com/embed/3IsR..." />
      <label className='input-label' htmlFor="">購入サイト候補</label>
      <Select className='select-input' options={options} onChange={handleChangeSiteName}/>
      <input type="text" value={site_url} onKeyDown={handleEnterKeyDown} onChange={handleChangeSiteUrl} placeholder="購入サイトURL" />
      <input type="hidden" name="user_id" value={userId} />

      <button className='btn cyan-btn' onClick={()=>{createItem(userId)}} >
        <FontAwesomeIcon className='awesome-icon' icon={faCirclePlus}/>
        <p>欲しいもの追加</p>
      </button>
      <Link to="/items">欲しいもの一覧へ</Link>
    </>
  );
}