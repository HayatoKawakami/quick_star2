import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useLoginContext } from '../../../contexts/LoginContext';

import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useItemContext } from '../../../contexts/ItemContext';

import Select from 'react-select'

export const ItemEdit = () => {

  const { baseURL, baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useLoginContext();
  const {
    item,
    name,
    price,
    image,
    videos,
    sites,
    url,
    options,
    site_name,
    site_url,
    setItem,
    setName,
    setPrice,
    setImage,
    ItemSet,
    handleChangeName,
    handleChangePrice,
    handleChangeUrl,
    handleChangeSiteName,
    handleChangeSiteUrl,
    VideoDestroy,
    SiteDestroy,
    ItemDestroy,
  } = useItemContext();

  const { itemId } = useParams();


  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
    console.log(img)
  }

  const EditItem = () => {
    const itemData = {
      name: name,
      price: price,
    }

    axios.put(`${baseApiURL}/items/${itemId}`, itemData)
    .then(response => {
      console.log("欲しいもの情報更新完了", response.data);
      navigate(`/items/${itemId}`)
    })
    .catch(error => {
      console.log("欲しいもの情報更新処理エラー", error);
    })

    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("item_id", itemId);

    const config = {
      headers:{'Content-Type': 'multipart/form-data'},
    }
    axios.post(`${baseApiURL}/images`, imageData, config)
    .then(response => {
      console.log("欲しいもの画像追加完了", response.data);
    })
    .catch(error => {
      console.log("欲しいもの画像追加処理エラー", error);
    })

    const videoData = {
      url: url,
      item_id: itemId,
    }
    axios.post(`${baseApiURL}/videos`, videoData)
    .then(response => {
      console.log("動画URL登録完了", response.data);
    })
    .catch(error => {
      console.log("動画URL登録処理エラー", error);
    })

    const siteData = {
      site_name: site_name,
      url: site_url,
      item_id: itemId,
    }

    axios.post(`${baseApiURL}/sites`, siteData)
    .then(response => {
      console.log("購入サイト情報追加完了", response.data);
    })
    .catch(error => {
      console.log("購入サイト情報追加処理エラー", error);
    })
  }


  useEffect(() => {
    ItemSet(itemId);
  },[])

  if (loadJSON("logged_in") === false){
    return <Navigate replace to="/login" />
  }


  return(
    <>
      <img className='item-image' src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
      <br />
      <label htmlFor="">商品名</label>
      <br />
      <input type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
      />
      <br />
      <label htmlFor="">価格</label>
      <br />
      <input type="number"
        name="price"
        value={price}
        onChange={handleChangePrice}
      />
      <br />
      <label htmlFor="">画像</label>
      <br />
      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />
      <br />
      <label htmlFor="">参考動画</label>
      <br />
      <ul>
      {Object.values(videos).filter(video => {
        return video.item_id === Number(itemId);
      }).map((value, index) => {
        return(
          <li key={index}>
            <iframe width="250" height="155" src={`https://www.youtube.com/embed/${value.url.split(/[= &]/).slice(1,2)}`} title="YouTube video player"></iframe>
            <input type="button" onClick={() => { VideoDestroy(value.id) }} value="動画削除" />
          </li>
        );
      })}
      </ul>
      <label htmlFor="">参考動画追加</label>
      <br />
      <input type="text" value={url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/embed/3IsR..." />
      <br />
      <label htmlFor="">購入サイト候補</label>
      <br />
      <ul className='sites-list'>
        {Object.values(sites).filter(site => {
          return site.item_id === Number(itemId);
        }).map((value, index) => {
          if (value.site_name === "amazon"){
            return(
              <li className='sites-item' key={index}>
                <img className='site-item-image' src={`${baseURL}/sites/amazon.png`} alt="" />
                <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{SiteDestroy(value.id)}} alt="" />
              </li>
            );
          } else if(value.site_name === "rakuten") {
            return(
              <li className='sites-item' key={index}>
                <img className='site-item-image' src={`${baseURL}/sites/rakuten.png`} alt="" />
                <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{SiteDestroy(value.id)}} alt="" />
              </li>
            );
          } else if(value.site_name === "bic") {
            return(
              <li className='sites-item' key={index}>
                <img className='site-item-image' src={`${baseURL}/sites/bic.png`} alt="" />
                <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{SiteDestroy(value.id)}} alt="" />
              </li>
            );
          } else if(value.site_name === "mercari") {
            return(
              <li className='edit-sites-item' key={index}>
                <img className='site-item-image' src={`${baseURL}/sites/mercari.png`} alt="" />
                <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{SiteDestroy(value.id)}} alt="" />
              </li>
            );
          }
        })}
      </ul>
      <Select options={options} onChange={handleChangeSiteName} />

      <input type="text" value={site_url} onChange={handleChangeSiteUrl} placeholder="購入サイトURL" />
      <br />
      <br />
      <input type="button" onClick={EditItem} value="変更" />
      <br />
      <Link to={`/items/${item.id}`}>戻る</Link>

    </>
  );
}