import React,{useState} from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = ({showFirmWelcomeHandler}) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
   
  const handleCategoryChange = (event)=>{
    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=> item !== value));
      }else{
        setCategory([...category, value])
      }
}
  
const handleImageUpload =(event)=>{
  const selectedImage = event.target.files[0];
  setFile(selectedImage)
}
  
 
  const handleRegionChange = (event)=>{
    const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item)=> item !== value));
      }else{
        setRegion([...region, value])
      }
}
  const submitHandler=async(e)=>{
    e.preventDefault();
  
    try {
      const loginToken= localStorage.getItem('loginToken');
      if(!loginToken){
        console.log('user not Authenticated!')
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file)

      category.forEach((value)=>{
        formData.append('category', value)
      });
      region.forEach((value)=>{
        formData.append('region', value)
      })
      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      })
      const allData=await response.json();
      if(response.ok){
        console.log(allData);
        setFirmName("");
        setArea("")
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null)
        alert('firm added successfully');
      }else if(allData.message=='vendor can have only one firm'){
         alert("firm exist 🍛.only one firm can be added")
      }else{
         alert("failed to add the firm")
      }
      console.log("this is firmid", allData.firmId);
      const firmId=allData.firmId
      localStorage.setItem('firmId',firmId)
      showFirmWelcomeHandler();
    } catch (error) {
      console.log('failed to add firm')
    }
  }
  return (
    <div className="firmSection">
        <h3>Add Firm</h3>
        <form className='firmForm' onSubmit={submitHandler}>
            <label>Firm Name</label><br/>
            <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br/>
            <label>Area</label><br/>
            <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br/>
            <div className="checkbox">
            <label>Category</label><br/>
              <div className="inputContaner">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' checked={category.includes('veg')} value='veg' onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox'  checked={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange}/>
                </div>
              </div>
            </div>
      
            <div className="checkbox">
            <label>Region</label><br/>
              <div className="inputContaner">
                <div className="checkboxContainer">
                  <label>South-India</label>
                  <input type='checkbox'  checked={region.includes('south-india')} value='south-india' onChange={handleRegionChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>North-India</label>
                  <input type='checkbox' checked={region.includes('north-india')} value='north-india' onChange={handleRegionChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Chinnes</label>
                  <input type='checkbox' checked={region.includes('chinese')} value='chinese' onChange={handleRegionChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Bakery</label>
                  <input type='checkbox' checked={region.includes('bakery')} value='bakery' onChange={handleRegionChange}/>
                </div>
              </div>
            </div>
            <label>Offer</label><br/>
            <input type='text' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br/>
            <label>Firm image</label><br/>
            <input type='file' onChange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm