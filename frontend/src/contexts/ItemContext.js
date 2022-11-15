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
  const [videos, setVideos] = useState({});
  const [video, setVideo] = useState({});
  const [sites, setSites] = useState({});

  const { baseApiURL, navigate } = useConstContext();

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
    destroyVideo,
    destroySite,
    videos,
    setVideos,
    video,
    setVideo,
    sites,
    setSites,
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}