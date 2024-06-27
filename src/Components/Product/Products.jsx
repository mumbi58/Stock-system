import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, IconButton, TableContainer, ButtonGroup } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AddProducts from './AddProducts';
import Product1 from './Product1';
import Deleteproduct from './Deleteproduct';
import EditProduct from './EditProduct';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showProduct, setshowPoduct] = useState(false)
  // const [addproduct,setAddproduct] = useState([])

  const productvisibility = () => {
    setshowPoduct(!showProduct)

  }

  // const AddItem = () =>{
  //   setAddproduct(addproduct)
  // }
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
          <ChakraLink as={ReactRouterLink} to="/product">
            <IconButton aria-label='Add product'
              colorScheme='blue' icon={<AddIcon />}
            // onClick={AddItem}
            />
          </ChakraLink>


        </Flex>
        <StatNumber>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th >Name</Th>


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
                    <Td>{product.price}</Td>
                    <ButtonGroup gap="1">
                      <ChakraLink as={ReactRouterLink} to={`/edit/${product.id}` }onClick={EditProduct} >
                        <Button colorScheme='blue' size="sm" leftIcon={<EditIcon />} >edit</Button></ChakraLink>
                        <ChakraLink as={ReactRouterLink} to={`/delete/${product.id}` }onClick={Deleteproduct}>
                      <Button colorScheme='red' size="sm" leftIcon={<DeleteIcon />}>Delete</Button></ChakraLink>




                    </ButtonGroup>

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
