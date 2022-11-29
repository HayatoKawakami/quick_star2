import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../lib/axios';

const ConstContext = createContext();

export const useConstContext = () => {
  return useContext(ConstContext);
}

export const ConstContextProvider = ({children}) => {

  const baseURL = "http://localhost:3000"
  const baseApiURL = "http://localhost:3000/api/v1"
  const navigate = useNavigate();

  const axiosGet = (path, id) => {
    if (id) {
      return axios.get(`${baseApiURL}/${path}/${id}`)
    } else {
      return axios.get(`${baseApiURL}/${path}`)
    }
  }

  const axiosPost = (path, data, config ) => {
    if (config) {
      return axios.post(`${baseApiURL}/${path}`, data, config);
    } else {
      return axios.post(`${baseApiURL}/${path}`, data);
    }
  }

  const axiosPut = (path, id, data, config) => {
    if (config) {
      return axios.put(`${baseApiURL}/${path}/${id}`, data, config);
    } else {
      return axios.put(`${baseApiURL}/${path}/${id}`, data);
    }
  }

  const axiosDelete = (path, id) => {
    if (id) {
      return axios.delete(`${baseApiURL}/${path}/${id}`);
    } else {
      return axios.delete(`${baseApiURL}/${path}`);
    }
  }

  const value = {
    baseURL,
    baseApiURL,
    navigate,
    FontAwesomeIcon,
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  }

  return(
    <ConstContext.Provider value={value}>
      {children}
    </ConstContext.Provider>
  );
}
