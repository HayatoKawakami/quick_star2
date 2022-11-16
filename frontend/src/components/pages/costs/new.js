import React, { useState } from 'react';
import { useCostContext } from '../../../contexts/CostContext';
import Select from 'react-select';

export const CostNew = () => {

  const {createCost, name, setName, price, setPrice } = useCostContext();
  const [ label, setLabel ] = useState('');


  const costsSelect = [
    {value: "家賃", label: "家賃"},
    {value: "食費", label: "食費"},
    {value: "携帯代", label: "携帯代"},
    {value: "電気代", label: "電気代"},
    {value: "ガス代", label: "ガス代"},
    {value: "水道代", label: "水道代"},
    {value: "", label: "その他"},
  ]
  const handleChangeName = (e) => {
    setName(e.value);
    setLabel(e.label);
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleChangeOtherName = (e) => {
    setName(e.target.value);
  }

  return(
    <>
      <label htmlFor="">コスト名</label>
      <br />
      <Select options={costsSelect} onChange={handleChangeName}/>
      <input  type="text"
      name="name"
      value={name}
      onChange={handleChangeOtherName}
      style={label === "その他" ? {'display': 'block'} : {'display': 'none'}}
      placeholder="コスト名"
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