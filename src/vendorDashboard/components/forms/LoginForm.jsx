import React,{useState} from 'react';
import { API_URL } from '../../data/apiPath';

const LoginForm = ({showWelcomeHandler,showFirmWelcomeHandler}) => {
  const [data,setData]=useState({
    email:"",
    password:""
  })
  const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler=async(e)=>{
      e.preventDefault();
      try {
        const response=await fetch(`${API_URL}/vendor/login` ,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
        body:JSON.stringify(data)
        })
        const responseData= await response.json();
        const vendorName=responseData.vendorName;
        console.log("this is vendor name",vendorName)
        if(response.ok){
          alert('Login Success');
          setData({
            email:'',
            password:""
          })
          localStorage.setItem('loginToken',responseData.token);
          localStorage.setItem('vendorName',vendorName)
          showWelcomeHandler();
    
        }
        const vendorId=responseData.vendorId;
        console.log('checking for vendorId',vendorId)
        const vendorResponse=await fetch(`${API_URL}/vendor/singlevendor/${vendorId}`)
        const vendorData=await vendorResponse.json();
        if(vendorResponse.ok){
          const vendorFirmId=vendorData.vendorFirmId;
          const vendorFirmName=vendorData.vendor.firm[0].firmName;
          console.log("checking for firm id",vendorFirmId)
          localStorage.setItem('firmId',vendorFirmId);
          localStorage.setItem('firmName',vendorFirmName);
           window.location.reload();
          showFirmWelcomeHandler();
      
          
         
        }
      } catch (error) {
        console.log(error)
        alert('login failed');
      }
  }
  return (
    <div className="loginSection">
        <h3>Vendor Login</h3>
        <form className="formAuth" onSubmit={submitHandler}>
            <label>Email</label><br/>
            <input type='email' name='email' value={data.email} onChange={changeHandler} placeholder='Enter your email'/><br/>
            <label>Password</label><br/>
            <input type='password' name='password' value={data.password} onChange={changeHandler} placeholder='enter your password'/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm