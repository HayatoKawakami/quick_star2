import axios from '../../../../lib/axios';
import React, { useEffect, useState } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useLoginContext } from '../../../contexts/LoginContext';
import { useItemContext } from '../../../contexts/ItemContext';

import { Navigate, Link } from 'react-router-dom';
import Select from 'react-select';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const ItemNew = () => {

  const { baseApiURL, navigate, FontAwesomeIcon } = useConstContext();
  const { loadJSON } = useLoginContext();
  const { options } = useItemContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [user_id, setUser_id] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [site_name, setSite_name] = useState('');
  const [site_url, setSite_url] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  }

  const handleChangeSiteName = (e) => {
    setSite_name(e.value);
  }

  const handleChangeSiteUrl = (e) => {
    setSite_url(e.target.value);
  }

  const setUserId = () => {
    if (loadJSON("logged_in") === true) {
      setUser_id(loadJSON("user").id);
    } else {
      return;
    }
  }

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
  }

  const CreateItem = () => {
    const itemData = {
      name: name,
      price: price,
      user_id: user_id
    }

    const config = {
      headers: {  'Content-Type': 'application/json'}
    }
    axios.post(`${baseApiURL}/items`, itemData, config)
    .then(response => {
      console.log("欲しいもの追加完了",response.data);
      createImage(response.data.item);
      createVideo(response.data.item);
      createSite(response.data.item)
    })
    .catch(error => {
      console.log("欲しいもの追加処理エラー", error);
    })
  }

  const createImage = (item) => {
    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("item_id", item.id)

    axios.post(`${baseApiURL}/images`, imageData,
    {
      headers: {  'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
      console.log("欲しいもの画像追加完了", response.data);
    })
    .catch(error => {
      console.log("欲しいもの画像追加処理エラー", error);
    })
  }

  const createVideo = (item) => {
    const videoData = {
      url: url,
      item_id: item.id,
    }

    axios.post(`${baseApiURL}/videos`, videoData)
    .then(response => {
      console.log("欲しいもの参考動画登録完了", response.data)
    })
    .catch(error => {
      console.log("欲しいもの参考動画登録処理エラー", error);
    })
  }

  const createSite = (item) => {

    const siteData = {
      site_name: site_name,
      url: site_url,
      item_id: item.id,
    }
    axios.post(`${baseApiURL}/sites`, siteData)
    .then(response => {
      console.log("購入サイト登録完了", response.data);
      navigate(`/items/${item.id}`)
    })
    .catch(error => {
      console.log("購入サイト登録処理エラー", error)
    })
  }

  useEffect(()=>{
    setUserId();
  },[])

  // ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false){
    return <Navigate replace to="login" />
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
      />
      <label className='input-label' htmlFor="">参考動画URL</label>
      <input type="text" value={url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/embed/3IsR..." />
      <label className='input-label' htmlFor="">購入サイト候補</label>
      <Select className='select-input' options={options} onChange={handleChangeSiteName}/>
      <input type="text" value={site_url} onChange={handleChangeSiteUrl} placeholder="購入サイトURL" />
      <input type="hidden" name="user_id" value={user_id} />

      <button className='btn cyan-btn' onClick={CreateItem} >
        <FontAwesomeIcon className='awesome-icon' icon={faCirclePlus}/>
        <p>欲しいもの追加</p>
      </button>
      <Link to="/items">欲しいもの一覧へ</Link>
    </>
  );
}