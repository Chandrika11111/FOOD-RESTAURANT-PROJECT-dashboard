import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName,setProductName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
 const [description,setDescription]=useState('');
 const ImageHandler=(e)=>{
  const selectedImage=e.target.files[0];
  setImage(selectedImage);
 }
 const categoryHandler=(e)=>{
  const value=e.target.value;
  if(category.includes(value)){
    setCategory(category.filter((item)=>item!=value))
  }else{
    setCategory([...category,value])
  }
 }
 const BestSellerHandler=(e)=>{
  const value=e.target.value==='true';
  setBestSeller(value);
 }
 const submitHandler=async(e)=>{
  e.preventDefault();
  try {
     const loginToken=localStorage.getItem('loginToken');
     const firmId=localStorage.getItem('firmId');
     if(!loginToken||!firmId){
      console.error("user not Authenticated")
     }
     const formData=new FormData();
     formData.append('productName',productName);
     formData.append("price",price);
     formData.append('description',description);
     formData.append('image',image);
     category.forEach((value)=>{
      formData.append('category',value)
     })
   
     const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body:formData
     })
     const data=response.json();
     if(response.ok){
      alert("product added successfully")
     }
     setProductName('');
     setPrice("");
     setCategory([]);
     setBestSeller(false);
     setImage(null);
     setDescription("");
  } catch (error) {
    console.log(error)
    alert("failed to add product");
  }
 }
  return (
    <div className="firmSection">
        <h3>Add Product</h3>
        <form className='firmForm' onSubmit={submitHandler}>
            <label>Product Name</label><br/>
            <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>
            <label>Price</label><br/>
            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
            <div className="checkbox">
            <label>Category</label><br/>
              <div className="inputContaner">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' value='veg' checked={category.includes('veg')} onChange={categoryHandler}/>
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox' value='non-veg' checked={category.includes('non-veg')} onChange={categoryHandler}/>
                </div>
              </div>
            </div>
            <div className="checkbox">
            <label>BestSeller</label><br/>
              <div className="inputContaner">
                <div className="checkboxContainer">
                  <label>YES</label>
                  <input type='radio' value='true' checked={bestSeller===true} onChange={BestSellerHandler}/>
                </div>
                <div className="checkboxContainer">
                  <label>NO</label>
                  <input type='radio' value='false' checked={bestSeller===false} onChange={BestSellerHandler}/>
                </div>
              </div>
            </div>
            <label>Description</label><br/>
            <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
            <label>Firm image</label><br/>
            <input type='file' onChange={ImageHandler}/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct