import React from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import Select from 'react-select';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const CostNew = () => {

  const { FontAwesomeIcon } = useConstContext();
  const { name, price, label, costsSelect, handleChangeName, handleChangePrice, handleChangeOtherName,createCost  } = useCostContext();

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
        <label className=' essencial' htmlFor="">金額</label>
        <br />
        <input type="number"
                name="price"
                value={price}
                onChange={handleChangePrice}
        />
      </div>

      <button className='btn cyan-btn' onClick={createCost}>
        <FontAwesomeIcon className='awesome-icon' icon={faCirclePlus}/>
        <p>固定費を追加</p>
      </button>
    </>
  );
}