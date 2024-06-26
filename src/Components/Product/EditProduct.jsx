import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function EditProduct() {
    const {id}= useParams()
   
    const[productName,setProductName] = useState("")
    const[productPrice,setProductPrice] = useState("")
    useEffect(()=>{


        const newProduct = {
            name: productName,
            price: parseFloat(productPrice)
          };
          
        const item = async()=>{
            const data = await fetch(`http://localhost:5000/products/${id}`,{
                method: "Patch",
                headers: {
                     "Content-Type": "application/json"
                } ,
                body: JSON.stringify(newProduct)           })
                const response = data.json()
                
                setProductName(response.name)
                setProductPrice(response.price)
                console.log(response);
        }

       
        item()
    },[id])
    

    return (
        <FormControl>
            <FormLabel>name </FormLabel>
            <Input type='text'></Input>
            
            
        </FormControl>
    )
}
