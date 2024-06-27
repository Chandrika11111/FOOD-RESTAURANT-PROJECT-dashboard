import React from 'react'

const Welcome = () => {
  const vendorName=localStorage.getItem('vendorName');
  return (
    <div className='welcome'>
      <div className="welcomeContent">
      <h1>Hi {vendorName}</h1>
     <h1> Thanks for choosing Us, welcome to Taste Heaven </h1>
     <h4>Now you can add  your firm</h4>
      </div>
     <div className="welcomeImg">
     <img src='/assets/chef.jpg'/>
     </div>
    </div>
  )
}

export default Welcome