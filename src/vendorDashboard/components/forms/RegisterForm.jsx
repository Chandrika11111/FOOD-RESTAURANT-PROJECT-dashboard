import React,{useState} from 'react';
import { API_URL } from '../../data/apiPath';

const RegisterForm = ({showLoginHandler}) => {
  const [data,setData]=useState({
    username:"",
    email:"",
    password:""
  })
  const changeHandler=(e)=>{
    setData({...data ,[e.target.name]:e.target.value})
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      });
      if(response.ok){
        console.log(data);
        setData({
          username:"",
          email:"",
          password:""
        })
        alert('vendor registered successfully')
        showLoginHandler();
      }
    } catch (error) {
       console.log("registration failed",error);
       alert("registration failed")
    }
  }
  return (
    <div className="registerSection">
        <h3>Vendor Register</h3>
        <form className="formAuth" onSubmit={submitHandler}>
            <label>Username</label><br/>
            <input type='text' name='username' value={data.username} onChange={changeHandler} placeholder='Enter username'/>
            <label>Email</label><br/>
            <input type='email' name='email' value={data.email} onChange={changeHandler} placeholder='Enter your email'/><br/>
            <label>Password</label><br/>
            <input type='password' name='password' value={data.password} onChange={changeHandler} placeholder='Enter your password'/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm