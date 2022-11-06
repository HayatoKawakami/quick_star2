import React, { useState, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { useParams } from 'react-router-dom';

export const ItemShow = () => {
  const { items } = useItemContext();

  const { itemId }  = useParams();
  const [item, setItem] = useState();

  console.log(Object.values(items))
  const result = Object.values(items).map((item)=> {
    return item.id === 3;
  })
  
  useEffect(() => {
  })

  return(
    <>
      <p>商品名：{result.name}</p>
    </>
  );
}