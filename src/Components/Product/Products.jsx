import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from "react-router-dom"; // Import React Router's Link

import { Box, Link as ChakraLink,Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, IconButton, TableContainer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddProducts from './AddProducts';
import Product1 from './Product1';



export default function Products() {
  const [products, setProducts] = useState([]);
  const [showProduct, setshowPoduct] = useState(false)

  const productvisibility = ()=>{
    setshowPoduct(!showProduct)

  }

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
    <Box p="5" shadow="md" width="100%" height="100%">
      <Stat>
        <Flex justify="space-between" align="center">
        <StatLabel>Product list</StatLabel>
        
        <IconButton aria-label='Add product' 
        colorScheme='blue' icon={<AddIcon />}
         onClick={AddProducts}/> 
          
          
        </Flex>
        <StatNumber>
          <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th >Name</Th>
               
                {/* <Th>Quantity</Th> */}
                {/* <Th>Description</Th> */}
                <Th>Price</Th>
                {/* <Th>Reorder Level</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>

                  <ChakraLink as={ReactRouterLink} to={`/product/${product.id}`} onClick={productvisibility} cursor="pointer">
                    {product.name}
                  </ChakraLink>


                  {/* <Td>{product.quantity}</Td> */}
                  {/* <Td>{product.description}</Td> */}
                  <Td>{product.price}</Td>
                  {/* <Td>{product.reorder_level}</Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
          {showProduct && <Product1 />}
          </TableContainer>
        </StatNumber>
      </Stat>
    </Box>
  );
}
