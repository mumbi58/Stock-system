import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, IconButton, TableContainer, ButtonGroup, useToast } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { MdAddShoppingCart } from "react-icons/md";
import Cart from './cart';
import { useNavigate } from 'react-router-dom';

export default function SellProduct() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([{
    "name": "warufaga",
    "id": 2,
    "quantity": 10,
    "price": 200
  }]);
  const toast = useToast();
  const [showProduct, setShowProduct] = useState(false);
  const navigate = useNavigate();

  const productVisibility = () => {
    setShowProduct(!showProduct);
  };



  const navigateToCart = () => {
    navigate('/cart');
  };
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast({
      title: `${product.name} added to cart.`,
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Stat>
        <Flex justify="space-between" align="center">
          <StatLabel style={{ fontSize: "20px" }}>Product List</StatLabel>
          <ChakraLink as={ReactRouterLink} to="/product"></ChakraLink>

          <ButtonGroup gap="1">
            <Button
              colorScheme='blue'
              size="sm"
              py={4}
              leftIcon={<MdAddShoppingCart size={30} />}
              onClick={navigateToCart}
            >
            </Button>
          </ButtonGroup>
        </Flex>

        <StatNumber>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id} style={{ fontSize: '16px', fontWeight: "normal" }}>
                    <Td>
                      <ChakraLink as={ReactRouterLink} to={`/product/${product.id}`} onClick={productVisibility} cursor="pointer">
                        {product.name}
                      </ChakraLink>
                    </Td>
                    <Td>{product.price}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>
                      <ButtonGroup gap="1">
                        <Button
                          colorScheme='blue'
                          size="sm"
                          py={4}
                          leftIcon={<MdAddShoppingCart size={30} />}
                          onClick={() => handleAddToCart(product)}
                        >
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {showProduct && <Product1 />}
          </TableContainer>
        </StatNumber>
      </Stat>
            <Cart cartItems={cartItems} />

    </Box>
  );
}
