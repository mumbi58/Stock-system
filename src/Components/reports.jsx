import { Box } from '@chakra-ui/react'
import useFetchSalesData from './Hooks/fetchsales'

export default function Reports() {
   const  sales = useFetchSalesData()
    console.log(sales);

  return (
    <Box>
        
    </Box>
  )
}
