import { Container ,FormControl,
  FormLabel, Input,
  FormErrorMessage,
  FormHelperText, } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function AddProducts() {
  const [goods, Setgoods] = useState([])
  useEffect(() => {
    const AddProduct = async () => {
      const product = await fetch("http://localhost:5000/products")

      const data = await product.json()
      Setgoods(data)
    }
    AddProduct();
  }, [])

  console.log("i was clicked")
  return (

    <FormControl isRequired>
  
  
  <FormLabel>Name</FormLabel>
  <Input type='text' />
  <FormLabel>Price</FormLabel>
  <Input type='text' />
</FormControl>
  )
}
