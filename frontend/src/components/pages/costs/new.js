import React from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import Select from 'react-select';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const CostNew = () => {

  const { FontAwesomeIcon } = useConstContext();
  const { name, price, label, handleChangeName, handleChangePrice, handleChangeOtherName,createCost  } = useCostContext();

  const costsSelect = [
    {value: "家賃", label: "家賃"},
    {value: "食費", label: "食費"},
    {value: "携帯代", label: "携帯代"},
    {value: "電気代", label: "電気代"},
    {value: "ガス代", label: "ガス代"},
    {value: "水道代", label: "水道代"},
    {value: "ネット代", label: "ネット代"},
    {value: "交通費", label: "交通費"},
    {value: "貯蓄", label: "貯蓄"},
    {value: "", label: "その他"},
  ]

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