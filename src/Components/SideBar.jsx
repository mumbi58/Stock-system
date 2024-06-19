
import { Box, Button, VStack, Heading,Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function Sidebar({ onLogout }) {
  return (
    <Box w="250px" p="5" bg="gray.100" height="100vh">
      <Heading mb="5">Menu</Heading>
      <VStack spacing="4" align="stretch">
        <Button>Stock Management</Button>
        {/* <ChakraLink as={ReactRouterLink} to="/reports">
        <Button>Reports</Button>
        </ChakraLink> */}
        <Button onClick={onLogout} colorScheme="red" mt="auto">Logout</Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
