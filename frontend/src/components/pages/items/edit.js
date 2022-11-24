import React, { useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useUserContext } from '../../../contexts/UserContext';
import { Navigate, useParams } from 'react-router-dom';
import { useItemContext } from '../../../contexts/ItemContext';
import Select from 'react-select'

export const ItemEdit = () => {

  const { baseURL } = useConstContext();
  const { loadJSON } = useUserContext();
  const {
    item,
    name,
    price,
    videos,
    sites,
    url,
    options,
    site_url,
    itemSet,
    getImage,
    handleChangeName,
    handleChangePrice,
    handleChangeUrl,
    handleChangeSiteName,
    handleChangeSiteUrl,
    videoDestroy,
    siteDestroy,
    itemDestroy,
    editItem,
  } = useItemContext();

  const { itemId } = useParams();

  useEffect(() => {
    itemSet(itemId);
  },[])

  if (loadJSON("logged_in") === false){
    return <Navigate replace to="/login" />
  }

  return(
    <>
      <img className='item-image' src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
      <br />
      <div className='form-block'>
        <label htmlFor="">商品名</label>
        <input type="text"
                name="name"
                value={name}
                onChange={handleChangeName}
        />
      </div>
      <div className='form-block'>
        <label htmlFor="">価格</label>
        <input type="number"
          name="price"
          value={price}
          onChange={handleChangePrice}
        />
      </div>

      <div className='form-block'>
        <label htmlFor="">画像</label>
        <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />

      </div>
      <div className='form-block'>
        <label htmlFor="">参考動画追加</label>
        <br />
        <input type="text" value={url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/embed/3IsR..." />
        <ul>
        {Object.values(videos).filter(video => {
          return video.item_id === Number(itemId);
        }).map((value, index) => {
          return(
            <li key={index}>
              <iframe width="250" height="155" src={`https://www.youtube.com/embed/${value.url.split(/[= &]/).slice(1,2)}`} title="YouTube video player"></iframe>
              <input type="button" onClick={() => { videoDestroy(value.id) }} value="動画削除" />
            </li>
          );
        })}
        </ul>
      </div>

      <div className='form-block'>
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
                  <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{siteDestroy(value.id)}} alt="" />
                </li>
              );
            } else if(value.site_name === "rakuten") {
              return(
                <li className='sites-item' key={index}>
                  <img className='site-item-image' src={`${baseURL}/sites/rakuten.png`} alt="" />
                  <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{siteDestroy(value.id)}} alt="" />
                </li>
              );
            } else if(value.site_name === "bic") {
              return(
                <li className='sites-item' key={index}>
                  <img className='site-item-image' src={`${baseURL}/sites/bic.png`} alt="" />
                  <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{siteDestroy(value.id)}} alt="" />
                </li>
              );
            } else if(value.site_name === "mercari") {
              return(
                <li className='sites-item' key={index}>
                  <img className='site-item-image' src={`${baseURL}/sites/mercari.png`} alt="" />
                  <img className='site-item-delete' src={`${baseURL}/sites/delete.png`} onClick={()=>{siteDestroy(value.id)}} alt="" />
                </li>
              );
            }
          })}
        </ul>
        <Select options={options} onChange={handleChangeSiteName} />
        <input type="text" value={site_url} onChange={handleChangeSiteUrl} placeholder="購入サイトURL" />
      </div>

      <button className='btn green-btn' onClick={()=>{editItem(itemId)}}>
        <p>変更</p>
      </button>
      <button className='btn red-btn' onClick={() =>{itemDestroy(itemId)}}>
        <p>削除</p>
      </button>

    </>
  );
}