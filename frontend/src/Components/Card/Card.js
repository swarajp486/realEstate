import React, { useEffect, useState,useContext } from 'react'
import "./Card.css"
import { IoMdBed } from "react-icons/io";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import { FilterContext } from '../../contextapi';

function Card() {
  const {selectedCity,selectedDate,selectedPrice,propertyType,apply,setApply}=useContext(FilterContext)
  const [item,setItem]=useState([])
  const [filteredItems, setFilteredItems] = useState(item);
  useEffect(()=>{
    console.log("test the issue",selectedCity,selectedDate,selectedPrice,propertyType,apply)
      const filtered = item.filter((item) => {
        return (
          (!selectedCity ||  item.location.toLowerCase() ==selectedCity.toLowerCase())&&
          (!selectedDate ||  item.createdAt>=selectedDate)&&
          (!selectedPrice ||  item.price>=selectedPrice)&&
          (!propertyType||  item.propertyType.toLowerCase() ==propertyType.toLowerCase())
        );
      });
      setFilteredItems(filtered);
      console.log(filtered)
      setApply(false)
      console.log("second test the issue",selectedCity,selectedDate,selectedPrice,propertyType,apply)

  
  },[apply && apply===true])
  
  
  async function fetchProperties() {
    const response = await axios.get('/api/list-properties');
    setItem(response.data);
    setFilteredItems(response.data)
    console.log(item)
    
  }
  useEffect(() => {
    fetchProperties()
    
  }, [])




  return (
 
   
    <div className='card-container'>
      
      <div className='cards'>
      {filteredItems.map((card,i)=>{
          const data = new Uint8Array(card.image.data.data);
          const chunkSize = 3048; // Adjust based on your needs
          let base64String = "";
          
          for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            const stringChunk = btoa(String.fromCharCode(...chunk));
            base64String += stringChunk;
          }
          
          const url = `data:image/png;base64,${base64String}`;
          
          return ( <div key={i} className='card'>
              <img src={url}/>
              <div className='heading'>
                <h3 className='rent'><MdOutlineCurrencyRupee/>{card.price}<span>/month</span></h3>
                <h3 className='proname'>{card.title}</h3>
                <h3 className='location'>{card.location},Mumbai,India</h3>
                <div className='feature'>
                <div className='bed'><IoMdBed /><span>3 Beds</span>  </div>
                <div className='bathroom'><AiTwotoneCheckCircle /> <span>2 Bathrooms</span> </div>
                <div className='area'> <IoMenu /><span>5x7 m<sup>2</sup></span></div>
              </div>
              

              </div>

            </div>)
       
        })
      }
      </div>
      
      

    </div>
   
  )
}

export default Card