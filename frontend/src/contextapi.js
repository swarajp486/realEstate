import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  setToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const updateToken = (newToken) => {
    setToken(newToken);
    if(newToken===null){
      localStorage.removeItem('token')
    }else{
    localStorage.setItem('token', newToken);
    }
  };

 

  return (
    <AuthContext.Provider value={{ token, updateToken}}>
      {children}
    </AuthContext.Provider>
  );
};

const FilterContext = createContext({
  // Initial state of  data
  selectedCity: '',
  selectedDate: '',
  selectedPrice: 0,
  propertyType:'',
  apply:'',
  // Functions to update the state
  setSelectedCity: () => {},
  setSelectedDate: () => {},
  setSelectedPrice: () => {},
  setPropertyType:()=>{},
  setApply:()=>{},
});

const FilterProvider=({ children })=> {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPrice,setSelectedPrice]=useState(0)
  const [propertyType,setPropertyType]=useState('')
  const [apply,setApply]=useState(false)

  const contextValue = {
    selectedCity,
    selectedDate,
    selectedPrice,
    propertyType,
    apply,
    setSelectedCity,
    setSelectedDate,
    setSelectedPrice,
    setPropertyType,
    setApply
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}







export { AuthContext, AuthProvider,FilterContext,FilterProvider };
