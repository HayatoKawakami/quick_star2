import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "../../lib/axios";
import { useConstContext } from "./ConstContext";
import { useUserContext } from "./UserContext";

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
  const { loadJSON } = useUserContext();

  const [user_id, setUser_id] = useState('');

  const setUserId = () => {
    if (loadJSON("logged_in") === true) {
      setUser_id(loadJSON("user").id);
    } else {
      return;
    }
  }

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

  const itemsSet = () => {
    axios.get(`${baseApiURL}/items`)
    .then(response => {
      setItems(response.data);
      console.log("欲しいもの一覧取得完了", response.data);
    })
    .catch(error => {
      console.log("欲しいもの一覧データ取得エラー", error)
    })
  }

  const itemSet = (id) => {
    axios.get(`${baseApiURL}/items/${id}`)
    .then(response => {
      console.log("欲しいもの情報取得完了", response.data);
      setItem(response.data);
      setName(response.data.name);
      setPrice(response.data.price);
    })
    .catch(error => {
      console.log("欲しいものデータ取得エラー", error);
    })
  }

  const createItem = (user_id) => {
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
      headers: { 'Content-Type': 'multipart/form-data'}
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

  const editItem = (itemId) => {
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

  const itemDestroy = (id) => {
    axios.delete(`${baseApiURL}/items/${id}}`)
    .then(response => {
      console.log("欲しいもの削除完了",response.data);
      navigate("/items");
    })
    .catch(error => {
      console.log("欲しいもの削除処理エラー", error);
    })
  }

  const videosSet = () => {
    axios.get(`${baseApiURL}/videos`)
    .then(response => {
      setVideos(response.data);
      console.log("動画情報一覧取得完了", response.data);
    })
    .catch(error => {
      console.log("動画情報取得処理エラー", error)
    })
  }

  const videoDestroy = (videoId) => {
    axios.delete(`${baseApiURL}/videos/${videoId}`)
    .then(response => {
      console.log("動画URL削除完了", response.data);
    })
    .catch(error => {
      console.log("動画URL削除処理エラー", error)
    })
  }

  const sitesSet = () => {
    axios.get(`${baseApiURL}/sites`)
    .then(response => {
      setSites(response.data);
      console.log("購入サイト候補情報一覧取得", response.data);
    })
    .catch(error => {
      console.log("購入サイト候補情報一覧取得処理エラー", error)
    })
  }

  const siteDestroy = (siteId) => {
    axios.delete(`${baseApiURL}/sites/${siteId}`)
    .then(response => {
      console.log("購入サイト情報削除完了", response.data);
    })
    .catch(error => {
      console.log("購入サイト情報削除処理エラー", error);
    })
  }

  useEffect(() => {
    itemsSet();
    videosSet();
    sitesSet();
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
    itemSet,
    videoDestroy,
    siteDestroy,
    itemDestroy,
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
    getImage,
    handleChangeName,
    handleChangePrice,
    handleChangeUrl,
    handleChangeSiteName,
    handleChangeSiteUrl,
    user_id,
    setUserId,
    createItem,
    editItem,
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}