import React from 'react'

const NavBar = ({showLoginHandler ,showRegisterHandler,showLogout,LogOutHandler,showFirmWelcomeHandler}) => {
  const firmName=localStorage.getItem('firmName')
  return (
      <div className="navSection">
        <div className="company" onClick={showFirmWelcomeHandler}>
            Vendor Dashboard
        </div>
            <div className="firmName">
              {firmName?<h4> FirmName:{firmName}</h4>:""}
            </div>
            <div className="userAuth"></div>
            {!showLogout ?
            <>
               <span onClick={showLoginHandler}>Login</span>
               <span onClick={showRegisterHandler}>Register</span>
            </> :  <span onClick={LogOutHandler}>LogOut</span> }  
      </div>
  )
}

export default NavBar