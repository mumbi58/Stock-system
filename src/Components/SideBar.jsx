import { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Link as ChakraLink,
  Collapse,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

function Sidebar({ onLogout }) {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <Box w="200px" p="5" bg="gray.100" h="100vh" pos="fixed" overflowY="auto">
      <VStack spacing="4" align="stretch">
        <ChakraLink as={ReactRouterLink} to="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/sell">
          <Button variant="ghost">Sell</Button>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/reports">
          <Button variant="ghost">Reports</Button>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/users">
          <Button variant="ghost">Users</Button>
        </ChakraLink>

        <Box>
          <Button
            variant="ghost"
            rightIcon={showProducts ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setShowProducts(!showProducts)}
          >
            Products
          </Button>
          <Collapse in={showProducts} animateOpacity>
            <VStack align="start" pl="4" spacing="2">
              <ChakraLink as={ReactRouterLink} to="/products/active">
                <Button variant="ghost" size="sm">
                  Active Products
                </Button>
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/products/inactive">
                <Button variant="ghost" size="sm">
                  Inactive Products
                </Button>
              </ChakraLink>
            </VStack>
          </Collapse>
        </Box>

        <ChakraLink as={ReactRouterLink} to="/category">
          <Button variant="ghost">Category</Button>
        </ChakraLink>
      </VStack>
    </Box>
  );
}

export default Sidebar;
