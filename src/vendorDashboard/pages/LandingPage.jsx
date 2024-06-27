import React ,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import FirmWelcome from '../components/FirmWelcome'
import HomePage from '../components/HomePage'


const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false);
  const [showRegister,setshowRegister]=useState(false);
  const [showFirm,setShowFirm]=useState(false);
  const [showproduct,setShowProduct]=useState(false)
  const [showWelcome ,setShowWelcome]=useState(false);
  const [showAllProducts,setShowAllProducts]=useState(false);
  const [showLogout, setShowLogout]=useState(false);
  const [showFirmTitle,setShowFirmTitle]=useState(true);
  const [showFirmWelcome,setShowFirmWelcome]=useState(false);
  const [showHomePage,setShowHomePage]=useState(true)
  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken')
    const firmId = localStorage.getItem('firmId')
    if(loginToken){
      setShowLogout(true)
     if(firmId){
       setShowFirmWelcome(true)
     }else{
       setShowWelcome(true)
     }
      setShowHomePage(false)
    }
  },[])
  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId')
    if(firmName||firmId){
       setShowFirmTitle(false)
       setShowFirmWelcome(true)
      // setShowWelcome(true)
    }
  })
  const LogOutHandler=()=>{
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      localStorage.removeItem('vendorName');
      window.location.reload(); 
    }
     setShowLogout(false)
     setShowFirmTitle(true)
     setShowFirmWelcome(false)
    setShowWelcome(false)
  }
  const showLoginHandler=()=>{
    setShowLogin(true);
    setshowRegister(false);
    setShowFirm(false)
    setShowAllProducts(false)
    setShowProduct(false)
    setShowFirmWelcome(false)
    setShowWelcome(false)
    setShowHomePage(false)
  }
  const showRegisterHandler=()=>{
       setshowRegister(true)
       setShowLogin(false)
       setShowFirm(false)
       setShowAllProducts(false)
       setShowProduct(false)
       setShowFirmWelcome(false)
       setShowWelcome(false)
       setShowHomePage(false)
  }
  const showFirmHandler=()=>{
    if(showLogout){
      setshowRegister(false)
      setShowLogin(false)
      setShowFirm(true)
      setShowProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert("please login");
      setShowLogin(true)
    }
  }
  const showProductHandler=()=>{
    if(showLogout){
      setshowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowProduct(true)
      setShowWelcome(false)
      setShowAllProducts(false)
      }else{
          alert("please login")
          setShowLogin(true)
      }
  }
  const showWelcomeHandler=()=>{
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false)
    setshowRegister(false)
    setShowAllProducts(false)
    setShowFirmWelcome(false)
    setShowWelcome(true)
    setShowHomePage(false)
  }
  const showAllProductsHandler=()=>{
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false)
    setshowRegister(false)
    setShowWelcome(false)
    setShowFirmWelcome(false)
    setShowHomePage(false)
    setShowAllProducts(true)
  }
  const showFirmWelcomeHandler=()=>{
    setShowProduct(false);
    setShowFirm(false);
    setShowLogin(false)
    setshowRegister(false)
    setShowWelcome(false)
    setShowHomePage(false)
    setShowAllProducts(false)
    setShowFirmWelcome(true)
  }
  // const showHomePageHandler=()=>{
  //   setShowProduct(false);
  //   setShowFirm(false);
  //   setShowLogin(false)
  //   setshowRegister(false)
  //   setShowWelcome(false)
  //   setShowHomePage(true)
  //   setShowAllProducts(false)
  //   setShowFirmWelcome(false)
  // }
  return (
   <>
   <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} LogOutHandler={LogOutHandler} showFirmWelcomeHandler={showFirmWelcomeHandler}/>
   <div className="collectionSection">
   <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle} />
   {showLogin&&<LoginForm showWelcomeHandler={showWelcomeHandler} showFirmWelcomeHandler={showFirmWelcomeHandler}  />}
   {showRegister&&<RegisterForm showLoginHandler={showLoginHandler}/>}
   { showFirm&& showLogout &&<AddFirm showFirmWelcomeHandler={showFirmWelcomeHandler}/>}
  { showproduct&&showLogout&&<AddProduct/>}
  { showWelcome&& showLogout&&!showproduct&&!showAllProducts&&<Welcome/>}
  {showAllProducts&&<AllProducts/>}
  {showFirmWelcome&& !showAllProducts&& !showproduct&&!showFirm&&<FirmWelcome/>}
  {showHomePage&&<HomePage/>}
   </div>
   </>
  )
}

export default LandingPage