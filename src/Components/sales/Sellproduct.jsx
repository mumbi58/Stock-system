import React, { useEffect, useState, useContext, createContext } from 'react';
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, ButtonGroup, TableContainer, useToast } from '@chakra-ui/react';
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const SalesContext = createContext();
export const SalesProvider = ({ children }) => {
  const [salesItems, setSalesItems] = useState([]);
  return (
    <SalesContext.Provider value={{ salesItems, setSalesItems }}>
      {children}
    </SalesContext.Provider>
  );
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const priceString = item.price;
    const cleanedPriceString = priceString.replace(/[^\d.-]/g, '');
    const price = parseFloat(cleanedPriceString);
    return total + (price * item.quantity);
  }, 0);
};

const computeCartItems = (prevItems, product) => {
  const existingItem = prevItems.find(item => item.id === product.id);
  if (existingItem) {
    return prevItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...prevItems, { ...product, quantity: 1 }];
  }
};

const calculateTotalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export default function SellProduct() {
  const [products, setProducts] = useState([]);
  const { cartItems, setCartItems } = useContext(CartContext);
  const toast = useToast();
  const [showProduct, setShowProduct] = useState(false);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => computeCartItems(prevItems, product));
    toast({
      title: `${product.name} added to cart.`,
      status: "success",
      duration: 1000,
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Stat>
        <Flex justify="space-between" align="center">
          <StatLabel style={{ fontSize: "20px" }}>Product List</StatLabel>
          <ButtonGroup gap="1">
            <Button
              colorScheme='blue'
              size="sm"
              py={4}
              leftIcon={<MdAddShoppingCart size={30} />}
              onClick={() => navigate('/cart')}
            >
              {calculateTotalQuantity(cartItems)}
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
                {currentProducts.map((product) => (
                  <Tr key={product.id} style={{ fontSize: '16px', fontWeight: "normal" }}>
                    <Td>
                      <ChakraLink as={ReactRouterLink} to={`/product/${product.id}`} onClick={() => setShowProduct(!showProduct)} cursor="pointer">
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
                          Add
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

        {/* Pagination Controls */}
        <Flex justify="space-between" mt={4}>
          {currentPage > 1 && (
            <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} variant="outline" colorScheme='blue'>
              Previous
            </Button>
          )}
          {currentPage < totalPages && (
            <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} variant="outline" colorScheme='blue'>
              Next
            </Button>
          )}
        </Flex>
      </Stat>
    </Box>
  );
}
