import React, { useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { useConstContext } from '../../../contexts/ConstContext';
import { useUserContext } from '../../../contexts/UserContext';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCostContext } from '../../../contexts/CostContext';

export const ItemShow = () => {

  const { baseURL } = useConstContext();
  const { loadJSON, takeHomePaySet, takeHomePay } = useUserContext();
  const { videos, sites, itemSet, item } = useItemContext();
  const { totalCostPriceSet ,totalCostPrice } = useCostContext();
  const { itemId }  = useParams();

  useEffect(() => {
    itemSet(itemId);
    totalCostPriceSet();
    takeHomePaySet();
  },[])

  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login" />
  }

  return(
    <>
      
      <div className='item-image-name-box'>
        <img className='item-image' src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
        <p className='item-name'>{item.name}</p>
      </div>
      <p className='item-get-day'>
        <span className='big-number'>{Math.round(item.price / ((takeHomePay - totalCostPrice) / 30 ))}</span>
        日後
      </p>
      <p className='item-price'>必要額 <span className='big-number'>{Number(item.price).toLocaleString()}</span> 円</p>
      
      <h3>参考動画</h3>
      <ul className="youtube-video">
      {Object.values(videos).filter(video => {
        return video.item_id === Number(itemId);
      }).map((value, index) => {
        return(
          <li key={index}>
            <iframe height="230px" src={`https://www.youtube.com/embed/${value.url.split(/[= &]/).slice(1,2)}`} title="YouTube video player"></iframe>
          </li>
        );
      })}
      </ul>
      <br />
      <h3>購入サイト候補</h3>
      <ul className='sites-list'>
        {Object.values(sites).filter(site => {
          return site.item_id === Number(itemId);
        }).map((value, index) => {
          if (value.site_name === "amazon"){
            return(
              <li className='sites-item' key={index}>
                <a href={value.url} target="_blank">
                  <img className='site-item-image' src={`${baseURL}/sites/amazon.png`} alt="" />
                </a>
              </li>
            );
          } else if(value.site_name === "rakuten") {
            return(
              <li className='sites-item' key={index}>
                <a href={value.url} target="_blank">
                  <img className='site-item-image' src={`${baseURL}/sites/rakuten.png`} alt="" />
                </a>
              </li>
            );
          } else if(value.site_name === "bic") {
            return(
              <li className='sites-item' key={index}>
                <a href={value.url} target="_blank">
                  <img className='site-item-image' src={`${baseURL}/sites/bic.png`} alt="" />
                </a>
              </li>
            );
          } else if(value.site_name === "mercari") {
            return(
              <li className='sites-item' key={index}>
                <a href={value.url} target="_blank">
                  <img className='site-item-image' src={`${baseURL}/sites/mercari.png`} alt="" />
                </a>
              </li>
            );
          }
        })}
      </ul>
      <Link className='btn green-btn' to="edit">
        <p>商品情報変更</p>
      </Link>
      <Link className='btn gray-btn' to={`/items/`}>
        <p>戻る</p>
      </Link>
      <br />
    </>
  );
}