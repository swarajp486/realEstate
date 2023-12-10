import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./Signup.css"

function Signup() {
    const [formData,setFormData]=useState({})
    const [post,setPost]=useState([])
    const [secretkey,setSecretkey]=useState('')
    const handelChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    useEffect(()=>{
      console.log(post)
    },[post])
    
    const handleSumbit= async (e)=>{
      e.preventDefault()
        if(formData.userType==='admin' && secretkey!=='swaraj'){
          
          alert('Invalid Admin')
        }else{
          try {
            const response= await axios.post('http://localhost:5000/api/signup', {firstName:formData.firstName,lastName:formData.lastName, email:formData.email, password:formData.password,userType:formData.userType })
            setPost(response)
           
            alert(response.data)

            
            
          } catch (error) {
            // Handle error message
            alert(error.response.data)
            console.error(error.response.data);
          }
    }

     
    }
  console.log(post)

   
  return (
    <div className="my-container">
   
      <form onSubmit={handleSumbit}>
      <div className='signup-card'>
      
          <div className='signup-type'>

            <input
              className="with-gap"
              name="userType"
              type="radio"
              value='user'
              onClick={handelChange}

            />
            <label>User</label>




            <input
              className="with-gap "
              name="userType"
              type="radio"
              value='admin'
              onClick={handelChange}
            />
            <label>Admin</label>

          </div>
        
        <div className='signup-form'>
          
              {formData.userType==='admin'?(
                <>
                  <label>SecretKey</label>
                  <input
                  type="text"
                  placeholder='Secret Key'
                  name='secretkey'
                  onChange={(e)=>setSecretkey(e.target.value)}
                  required
              />
              </>
              ):null}
              
            <label>FirstName</label>
            <input
                  type="text"
                  placeholder='First Name'
                  name='firstName'
                  onChange={handelChange}
                  required
                />
              <label>LastName</label>
                <input
                  type="text"
                  placeholder='Last Name'
                  name='lastName'
                  onChange={handelChange}
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  name='email'
                  placeholder='Email'
                  onChange={handelChange}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  name='password'
                  placeholder='Password'
                  onChange={handelChange}
                  required
                />
        </div>
        <div className="login-btn">
            <Link to='/login'><p>Already have and account?</p></Link> 
            <button className='btn' type="submit">Signup</button>
        </div>
      
    </div>
    </form>
    </div>
  )
}


export default Signup