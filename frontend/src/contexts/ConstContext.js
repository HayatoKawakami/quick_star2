import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConstContext = createContext();

export const useConstContext = () => {
  return useContext(ConstContext);
}

export const ConstContextProvider = ({children}) => {

  const baseURL = "http://localhost:3000"
  const baseApiURL = "http://localhost:3000/api/v1"
  const navigate = useNavigate();

  const value = {
    baseURL,
    baseApiURL,
    navigate,
    FontAwesomeIcon,
  }

  return(
    <ConstContext.Provider value={value}>
      {children}
    </ConstContext.Provider>
  );
}
