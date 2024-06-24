import { Container } from "@chakra-ui/react"
import { useEffect ,useState} from "react"

export default function AddProducts() {
    const [goods,Setgoods] = useState([])
    useEffect(()=>{
   const AddProduct = async()=>{
     const product = await fetch("")
     
     const data = await product.json()
     Setgoods(data)
   }
AddProduct();
    }, [])
    
    console.log("i was clicked")
  return (

   <Container>
    

   </Container>
  )
}
