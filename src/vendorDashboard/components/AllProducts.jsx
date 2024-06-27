import React,{useState,useEffect} from 'react'
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products,setProducts ]=useState([]);
    const productHandler=async(e)=>{
        const firmId=localStorage.getItem('firmId');
        try {
            const response=await fetch(`${API_URL}/product/firmproducts/${firmId}`);
            const NewProductsData=await response.json();
            setProducts(NewProductsData.products);
            // console.log(NewProductsData);  
        } catch (error) {
            console.log("failed to fetch the product",error);
            alert('failed to fetch the product')
        }
        
    }
    useEffect(()=>{
        productHandler();
        console.log("this is useEffect")
    },[])
    const deleteProductById=async(productId)=>{
        try {
            const response=await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })
             if(response.ok){
                setProducts(products.filter(product=>product._id!==productId));
                confirm("are you sure,you want to delete?")
                alert("product deleted successfully");
             }
        } catch (error) {
            console.log("failed to delete",error);
            alert('failed to delete product');
        }
    }
  return (
    <div className='ProductSection'>
        {!products?(<p>No products added</p>):(
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return(
                            <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image&&(
                                        <img src={`${API_URL}/uploads/${item.image}`}
                                        alt={item.productName}
                                        style={{width:'50px',height:'50px'}}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                </td>
                            </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        )}
    </div>
    
    
  )
}

export default AllProducts