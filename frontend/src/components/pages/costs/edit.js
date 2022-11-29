import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCostContext } from '../../../contexts/CostContext';
import Select from 'react-select';

export const CostEdit = () => {
  const {
    name,
    price,
    label,
    costsSelect,
    handleChangeName,
    handleChangeOtherName,
    handleChangePrice,
    costSet,
    updateCost,
    destroyCost
  } = useCostContext();
  const { costId } = useParams();

  const data = {
    name: name,
    price: price
  }

  useEffect(() =>{
    costSet(costId);
  }, [])

  return(
    <>
      <div className='form-block'>
        <label className=' essencial' htmlFor="">コスト名</label>
        <br />
        <Select options={costsSelect} onChange={handleChangeName}/>
        <input  type="text"
        name="name"
        value={name}
        onChange={handleChangeOtherName}
        style={label === "その他" ? {'display': 'block'} : {'display': 'none'}}
        placeholder="コスト名"
        />
      </div>
      <div className='form-block'>
        <label htmlFor="">金額</label>
        <input type="number"
                value={price}
                onChange={handleChangePrice}
        />
      </div>

      <button className='btn green-btn' onClick={()=>{updateCost(costId, data)}}>
        <p>変更</p>
      </button>
      <button className='btn red-btn' onClick={()=>{destroyCost(costId)}}>
        <p>削除</p>
      </button>
    </>
  );
}