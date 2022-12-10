import React, { useState, createContext, useContext } from "react";
import { useConstContext } from "./ConstContext";
import { useUserContext } from "./UserContext";
import { format, addDays} from 'date-fns';
import { useCostContext } from "./CostContext";


const ItemContext = createContext();

export const useItemContext = () => {
  return useContext(ItemContext);
}

export const ItemContextProvider = ({children}) => {
  const [items, setItems] = useState({});
  const [item, setItem] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [videos, setVideos] = useState({});
  const [video, setVideo] = useState({});
  const [sites, setSites] = useState({});
  const [ url, setUrl] = useState('');

  const [ site_name, setSite_name] = useState('');
  const [ site_url, setSite_url] = useState('');

  const [getDay, setGetDay] = useState('');
  const [countDay, setCountDay] = useState('');

  const {
    navigate,
    location,
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  } = useConstContext();
  const { loggedIn, takeHomePay } = useUserContext();
  const { totalCostPrice } = useCostContext();

  const options = [
    {value: "amazon", label: "Amazon"},
    {value: "rakuten", label: "楽天ショッピング"},
    {value: "bic", label: "ビックカメラ"},
    {value: "mercari", label: "メルカリ"},
  ]

  const handleChangeName = (e) => {setName(e.target.value);}
  const handleChangePrice = (e) => {setPrice(e.target.value);}
  const handleChangeUrl = (e) => {setUrl(e.target.value);}
  const handleChangeSiteName = (e) => {setSite_name(e.value);}
  const handleChangeSiteUrl = (e) => {setSite_url(e.target.value);}

  

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
    console.log(img)
  }

  const itemsSet = async () => {
    try {
      const res = await axiosGet("items")
      setItems(res.data);
      console.log("欲しいもの一覧取得完了", res.data);
    } catch (error) {
      console.log("欲しいもの一覧データ取得エラー", error)
    }
  }

  const itemSet = async (id) => {
    try {
      const res = await axiosGet("items", id)
      console.log("欲しいもの情報取得完了", res.data);
      setItem(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
    } catch (error) {
      console.log("欲しいものデータ取得エラー", error);
    }
  }

  const createItem = async (userId) => {
    const itemData = {
      name: name,
      price: price,
      user_id: userId
    }
    const config = {
      headers: {  'Content-Type': 'application/json'}
    }
    try {
      const res = await axiosPost("items", itemData, config)
      console.log("欲しいもの追加完了",res.data);
      createImage(res.data.item);
      createVideo(res.data.item);
      createSite(res.data.item);
      navigate(`/items/${res.data.item.id}`);
    } catch (error) {
      console.log("欲しいもの追加処理エラー", error);
    }
  }

  const createImage = async (item) => {
    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("item_id", item.id)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data'}
    }
    try {
      if(image){
        const res = await axiosPost("images", imageData, config);
        console.log("欲しいもの画像追加完了", res.data);
      } else {
        return
      }
    } catch (error) {
      console.log("欲しいもの画像追加処理エラー", error);
    }
  }

  const createVideo = async (item) => {
    const videoData = {
      url: url,
      item_id: item.id,
    }
    try {
      if(url === ""){
        return
      }
      const res = await axiosPost("videos", videoData);
      console.log("欲しいもの参考動画登録完了", res.data)
    } catch (error) {
      console.log("欲しいもの参考動画登録処理エラー", error);
    }
  }

  const createSite = async (item) => {

    const siteData = {
      site_name: site_name,
      url: site_url,
      item_id: item.id,
    }

    try {
      if(site_url === ""){
        return
      }
      const res = await axiosPost("sites", siteData);
      console.log("購入サイト登録完了", res.data);
      navigate(`/items/${item.id}`)
    } catch (error) {
      console.log("購入サイト登録処理エラー", error)
    }
  }

  const editItem = async (itemId) => {
    const itemData = {
      name: name,
      price: price,
    }

    try {
      const res = await axiosPut("items", itemId, itemData)
      console.log("欲しいもの情報更新完了", res.data);
      editImage(itemId);
      editVideos(itemId);
      editSites(itemId);
      navigate(`/items/${itemId}`)
    } catch (error) {
      console.log("欲しいもの情報更新処理エラー", error);
    }
  }

    const editImage = async (itemId) => {
      const imageData = new FormData();
      imageData.append("image", image);
      imageData.append("item_id", itemId);
      const config = {
      headers:{'Content-Type': 'multipart/form-data'},
    }
      try {
        if(image === ""){
          return
        }
        const res = await axiosPost("images", imageData, config);
        console.log("欲しいもの画像追加完了", res.data);
      } catch (error) {
        console.log("欲しいもの画像追加処理エラー", error);
      }
    }

    const editVideos = async (itemId) => {
      const videoData = {
        url: url,
        item_id: itemId,
      }
      try {
        if(url === ""){
          return
        }
        const res = await axiosPost("videos", videoData);
        console.log("動画URL登録完了", res.data);
      } catch (error) {
        console.log("動画URL登録処理エラー", error);
      }
    }

    const editSites = async (itemId) => {
      const siteData = {
        site_name: site_name,
        url: site_url,
        item_id: itemId,
      }
      try {
        if(site_url === ""){
          return
        }
        const res = await axiosPost("sites", siteData)
        console.log("購入サイト情報追加完了", res.data);
      } catch (error) {
        console.log("購入サイト情報追加処理エラー", error);
      }
    }

  const itemDestroy = async (id) => {
    try {
      const res = await axiosDelete("items", id);
      console.log("欲しいもの削除完了",res.data);
      navigate("/items");
    } catch (error) {
      console.log("欲しいもの削除処理エラー", error);
    }
  }

  const videosSet = async () => {
    try {
      const res = await axiosGet("videos");
      setVideos(res.data);
      console.log("動画情報一覧取得完了", res.data);
    } catch (error) {
      console.log("動画情報取得処理エラー", error)
    }
  }

  const videoDestroy = async (videoId) => {
    try {
      const res = await axiosDelete("videos", videoId)
      console.log("動画URL削除完了", res.data);
    } catch (error) {
      console.log("動画URL削除処理エラー", error)
    }
  }

  const sitesSet = async () => {
    try {
      const res = await axiosGet("sites");
      setSites(res.data);
      console.log("購入サイト候補情報一覧取得", res.data);
    } catch (error) {
      console.log("購入サイト候補情報一覧取得処理エラー", error)
    }
  }

  const siteDestroy = async (siteId) => {
    try {
      const res = await axiosDelete("sites", siteId);
      console.log("購入サイト情報削除完了", res.data);
    } catch (error) {
      console.log("購入サイト情報削除処理エラー", error);
    }
  }

  const GetDaySet = () => {
    const getCount = Math.round(item.price / ((takeHomePay - totalCostPrice) / 30 ))
    const today = new Date();
    if(item.start) {
      const startDay = new Date(item.start)
      const dateGet = Date.parse(addDays( startDay, getCount ))
      const dateGetting = format(new Date(dateGet), "yyyy年MM月dd日")
      setGetDay(dateGetting);
      return dateGetting;
    } else {
      const dateGet = Date.parse(addDays( today, getCount ))
      const dateGetting = format(new Date(dateGet), "yyyy年MM月dd日")
      setGetDay(dateGetting);
      return dateGetting;
    }
  }

  const CountDaySet = (item) => {
    const getCount = Math.round(item.price / ((takeHomePay - totalCostPrice) / 30 ))
    const today = new Date();
    if(item.start){
      const startDay = new Date(item.start);
      const dateGet = Date.parse(addDays( startDay, getCount ))
      const dateCounting = Math.round((dateGet - today) / (24*60*60*1000))
      if(location.pathname === `/items/${Number(location.pathname.split("/items/").slice(1,2))}`) {
        setCountDay(dateCounting);
      }
      return dateCounting
    } else {
      const dateGet = Date.parse(addDays( today, getCount ))
      const dateCounting = Math.round((dateGet - today) / (24*60*60*1000))
      if(location.pathname === `/items/${Number(location.pathname.split("/items/").slice(1,2))}`) {
        setCountDay(dateCounting);
      }
      return dateCounting
    }
  }

  const createStart = async (itemId) => {
    const startData = {
      start: new Date()
    }
    try{
      const res = await axiosPut("items", itemId, startData)
      console.log("スタート！！",res.data)
      setItem(res.data.item)
    } catch(error) {
      console.log(error)
    }
  }

  const deleteStart = async (itemId) => {
    const startData = {
      start: null,
    }
    try{
      const res = await axiosPut("items", itemId, startData)
      console.log("中止しました", res.data)
      setItem(res.data.item)
    } catch(error){
      console.log(error)
    }
  }


  const value = {
    itemsSet,
    videosSet,
    sitesSet,
    items,
    item,
    navigate,
    name,
    price,
    image,
    itemSet,
    videoDestroy,
    siteDestroy,
    itemDestroy,
    videos,
    video,
    sites,
    options,
    url,
    site_name,
    site_url,
    getImage,
    handleChangeName,
    handleChangePrice,
    handleChangeUrl,
    handleChangeSiteName,
    handleChangeSiteUrl,
    createItem,
    editItem,
    GetDaySet,
    CountDaySet,
    getDay,
    countDay,
    createStart,
    deleteStart,
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}