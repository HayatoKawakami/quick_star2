import React, { useState, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { useConstContext } from '../../../contexts/ConstContext';
import { useUserContext } from '../../../contexts/UserContext';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useCostContext } from '../../../contexts/CostContext';
import { format, addDays } from 'date-fns';

export const ItemShow = () => {

  const { baseURL } = useConstContext();
  const { takeHomePaySet, takeHomePay, loggedIn } = useUserContext();
  const {
    videosSet,
    videos,
    sitesSet,
    sites,
    itemSet,
    item,
    price,
  } = useItemContext();

  const { totalCostPriceSet ,totalCostPrice } = useCostContext();
  const { itemId }  = useParams();

  // 所要日数
  const getCount =  Math.round(price / ((takeHomePay - totalCostPrice) / 30 ))
  // 今日の日付
  const today = new Date()
  // スタートボタンを押した日付
  const startDay = new Date(item.start)
  // スタートボタン押した日付をミリ表示
  const startDayMs = Date.parse(startDay)
  // スタートボタンを押した後に確定する日付を計算
  const dateGet = addDays( startDay, getCount )
  console.log(dateGet)
  // スタートボタンを押した後に確定する日付表示
  const dateGetting = format(today, "yyyy年MM月dd日")
  // 手に入るまでの日数
  const dateCounting = Math.round((dateGet - today) / (24*60*60*1000))

  useEffect(()=> {
    itemSet(itemId);
    videosSet();
    sitesSet();
    takeHomePaySet();
    totalCostPriceSet();
  },[])

  return(
    <>
      <div className='item-image-name-box'>
        <img className='item-image' src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
        <p className='item-name'>{item.name}</p>
      </div>
      <p className='item-get-count'>
        <span className='big-number'>{dateCounting}</span>
        日後
      </p>
      <p className='item-get-day'>{dateGetting}予定</p>
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