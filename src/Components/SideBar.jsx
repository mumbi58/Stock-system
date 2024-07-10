
import { Box, Button, VStack, Heading,Link as ChakraLink, Container } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function Sidebar({ onLogout }) {
  return (
    <Box w="200px" p="5" bg="gray.100"  h='100vh' pos='fixed' overflowY='auto' > 
    
    <Heading mb="5">Menu</Heading>
    <VStack spacing="4" align="stretch">
    <ChakraLink as={ReactRouterLink} to="/dashboard">
            <Button>Dashboard</Button>
        </ChakraLink>

    <ChakraLink as={ReactRouterLink} to="/sell">
        <Button variant='ghost'>Sell</Button>
        </ChakraLink>

       

        <ChakraLink as={ReactRouterLink} to="/users">
            <Button>Users</Button>
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
