import React, { useEffect, useState } from 'react';
// import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { Box, Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';


export default function Products() {
  const [products, setProducts] = useState([]);

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
        <StatLabel>Product list</StatLabel>
        <StatNumber>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Quantity</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Reorder Level</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>{product.name}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.reorder_level}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </StatNumber>
      </Stat>
    </Box>
  );
}
