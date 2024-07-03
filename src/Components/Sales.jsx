import { Box,Stat,StatLabel,StatNumber } from "@chakra-ui/react"
import { useState,useEffect,} from "react"
import { useNavigate } from "react-router-dom"


export default function Sales() {

    const [SalesData,setSalesData] = useState(null)
    const navigate = useNavigate()

    const handleSales = () =>{
      navigate("/sales")
    }
useEffect(()=>{


const data = async () =>{
    try {
        const resp =  await fetch("http://localhost:8000/sales")
        if(!resp.ok){
          throw new Error(`HTTP error! status: ${resp.status}`)
        }
        const data = await resp.json()
        
        setSalesData(data)
        console.log(data);
        
        
    } catch (error) {
        console.log("error fetching sales", error);
        
    }
   
}

data();


},[])


  return (
    <Box p="5" shadow="md" pl='200px' borderWidth="1px"  width="100%" height="100%"onClick={handleSales} cursor= "pointer"  >
          

    <Stat>
      <StatLabel>Total Sales Today</StatLabel>
      <StatNumber>${SalesData && SalesData[0].product}</StatNumber>
      


    </Stat>
  </Box>
  )
}
