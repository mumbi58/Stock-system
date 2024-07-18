import DashboardCards from './DashboardCards'
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Button,Link as ChakraLink } from '@chakra-ui/react';

export default function AdminDashboard() {
  return (
    <Box>
      {/* <ChakraLink as={ReactRouterLink} to="/login">
          <Button colorScheme="red" mt="auto">Login</Button>
        </ChakraLink> */}
        <DashboardCards />
        
       
    </Box>
  )
}
