import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';
import { useCostContext } from '../../../contexts/CostContext';

export const CostNew = () => {

  const {createCost, name, setName, price, setPrice } = useCostContext();

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }
  return(
    <>
      <label htmlFor="">コスト名</label>
      <br />
      <input  type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
      />
      <br />
      <label htmlFor="">金額</label>
      <br />
      <input type="number"
              name="price"
              value={price}
              onChange={handleChangePrice}
      />
      <br />
      <input type="button" onClick={createCost} value="追加" />
    </>
    
  );
}