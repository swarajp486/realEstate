import React,{useState,useContext} from 'react'
import './Search.css'
import { FilterContext } from '../../contextapi';
function Search() {
    const {selectedCity,selectedDate,selectedPrice,propertyType,apply,setSelectedCity,setSelectedDate,setSelectedPrice,
        setPropertyType,setApply}=useContext(FilterContext)
    const propertyOption=["Luxury","Middle",'Low']
    const cities = ['Mumbai','virar','Borivali','Naigaon'];
    const price=[4000,5000,6000,8000,10000]
    // const handleChangeProperty=(event)=>{
    //     setPropertyType(event.target.value)
    // }
    // const handleChangePrice = (event) => {
    //     setSelectedPrice(event.target.value)
    //   };
    // const handleChangedate = (event) => {
    //     setSelectedDate(event.target.value);
    // };
    // const handleChange = (event) => {
    //     setSelectedCity(event.target.value);
    // };

  return (
    <div className='container'>
       
        <h3>Search Properties for Rent</h3>
       
        <div className='filter'>
            <div className='city'>
                <h6 className='tag'>City</h6>
                  <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} className='select-location'>
                      <option value="" className='selectoption'>Select Location</option>
                      {cities.map((city) => (
                          <option key={city} value={city} className='selectoption'>
                              {city}
                          </option>
                      ))}
                  </select>
                {/* <h4>Select Location</h4> */}
            </div>
            <div className='date'>
                <h6 className='tag'>Available From</h6>
                  <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e)=>setSelectedDate(e.target.value)}
                  />
                  
            </div>
           
            <div className='price'>
                <h6 className='tag'>Price</h6>
                <select value={selectedPrice} onChange={(e)=>setSelectedPrice(e.target.value)} className='select-location'>
                      <option value="" className='selectoption'>Select Price</option>
                      {price.map((price) => (
                          <option key={price} value={price} className='selectoption'>
                              {price}
                          </option>
                      ))}
                  </select>
                
            </div>
            
            <div className='type'>
                <h6 className='tag'>Property Type</h6>
                <select value={propertyType} onChange={(e)=>setPropertyType(e.target.value)} className='select-location'>
                      <option value="" className='selectoption'>Select Property</option>
                      {propertyOption.map((property) => (
                          <option key={property} value={property} className='selectoption'>
                              {property}
                          </option>
                      ))}
                  </select>
            </div>
            
            <button className='btn' onClick={()=>setApply(true)}>Apply</button>
            
            

        </div>
    </div>
  )
}

export default Search