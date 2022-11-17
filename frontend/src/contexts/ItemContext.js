import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "../../lib/axios";
import { useConstContext } from "./ConstContext";

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

  const { baseApiURL, navigate } = useConstContext();

  const options = [
    {value: "amazon", label: "Amazon"},
    {value: "rakuten", label: "楽天ショッピング"},
    {value: "bic", label: "ビックカメラ"},
    {value: "mercari", label: "メルカリ"},
  ]

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

  const ItemsSet = () => {
    axios.get(`${baseApiURL}/items`)
    .then(response => {
      setItems(response.data);
      console.log("欲しいもの一覧取得完了", response.data);
    })
    .catch(error => {
      console.log("欲しいもの一覧データ取得エラー", error)
    })
  }

  const VideosSet = () => {
    axios.get(`${baseApiURL}/videos`)
    .then(response => {
      setVideos(response.data);
      console.log("動画情報一覧取得完了", response.data);
    })
    .catch(error => {
      console.log("動画情報取得処理エラー", error)
    })
  }

  const destroyVideo = (videoId) => {
    axios.delete(`${baseApiURL}/videos/${videoId}`)
    .then(response => {
      console.log("動画URL削除完了", response.data);
    })
    .catch(error => {
      console.log("動画URL削除処理エラー", error)
    })
  }

  const SitesSet = () => {
    axios.get(`${baseApiURL}/sites`)
    .then(response => {
      setSites(response.data);
      console.log("購入サイト候補情報一覧取得", response.data);
    })
    .catch(error => {
      console.log("購入サイト候補情報一覧取得処理エラー", error)
    })
  }

  const destroySite = (siteId) => {
    axios.delete(`${baseApiURL}/sites/${siteId}`)
    .then(response => {
      console.log("購入サイト情報削除完了", response.data);
    })
    .catch(error => {
      console.log("購入サイト情報削除処理エラー", error);
    })
  }

  useEffect(() => {
    ItemsSet();
    VideosSet();
    SitesSet();
  },[])



  const value = {
    items,
    item,
    setItem,
    navigate,
    name,
    setName,
    price,
    setPrice,
    image,
    setImage,
    destroyVideo,
    destroySite,
    videos,
    setVideos,
    video,
    setVideo,
    sites,
    setSites,
    options,
    url,
    site_name,
    site_url,
    handleChangeName,
    handleChangePrice,
    handleChangeUrl,
    handleChangeSiteName,
    handleChangeSiteUrl,
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}