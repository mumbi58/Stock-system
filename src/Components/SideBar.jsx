
import { Box, Button, VStack, Heading,Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function Sidebar({ onLogout }) {
  return (
    <Box w="250px" p="5" bg="gray.100" height="100vh" > 
    
    <Heading mb="5">Menu</Heading>
    <VStack spacing="4" align="stretch">

    <ChakraLink as={ReactRouterLink} to="/Stock">
        <Button>Stock Management</Button>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to='/sales'>
           <Button>Sales</Button>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/products">
            <Button>Products</Button>
        </ChakraLink>
        

        <ChakraLink as={ReactRouterLink} to="/logout">
          <Button colorScheme="red" mt="auto">Logout</Button>
        </ChakraLink>
      
    </VStack >
   
</Box>
  );
}

export default Sidebar;
