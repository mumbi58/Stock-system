import React, { useState } from 'react';
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Stat, StatLabel, StatNumber, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, ButtonGroup, TableContainer, Input } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Product1 from './Product1';
import useFetchProducts from '../Hooks/fetchproduct';

export default function Products() {
  const [showProduct, setShowProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { products, error, refetch } = useFetchProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const productVisibility = () => {
    setShowProduct(!showProduct);
  };

  const handleSearch = (e) => {
    if (e.target.value.length <= 3) {
      setSearchTerm(e.target.value);
    }
  };

  const handleReactivate = async (productId) => {
    // Assuming you have an API to reactivate the product
    await fetch(`/api/products/${productId}/reactivate`, { method: 'POST' });
    refetch();
    console.log("heey babes");
  };

  // Function to format price as currency
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-KE', {
      style: 'currency',
      currency: 'KES'
    });
  };

  const filteredProducts = searchTerm.length < 3
    ? products
    : products
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a.status === 'deleted' && b.status !== 'deleted') {
          return 1;
        } else if (a.status !== 'deleted' && b.status === 'deleted') {
          return -1;
        } else {
          return 0;
        }
      });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Stat>
        <Flex justify="space-between" align="center">
          <ButtonGroup>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              size="sm"
              width="200px"
            />
          </ButtonGroup>
          <StatLabel style={{ fontSize: "20px" }}>Product List</StatLabel>
          <ChakraLink as={ReactRouterLink} to="/product">
            <Button leftIcon={<AddIcon />} colorScheme='blue' size="sm">Add</Button>
          </ChakraLink>
        </Flex>
        <StatNumber>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {error ? (
                  <Tr>
                    <Td colSpan={2}>Error fetching products: {error.message}</Td>
                  </Tr>
                ) : (
                  currentProducts.map((product) => (
                    <Tr key={product.id} style={{ fontSize: '16px', fontWeight: "normal" }}>
                      <Td>
                        <ChakraLink as={ReactRouterLink} to={`/product/${product.id}`} onClick={productVisibility} cursor="pointer">
                          {product.name}
                        </ChakraLink>
                      </Td>
                      <Td>{formatPrice(product.price)}</Td>
                      <ButtonGroup gap="1">
                        <ChakraLink as={ReactRouterLink} to={`/edit/${product.id}`}>
                          <Button
                            colorScheme='blue'
                            size="sm"
                            leftIcon={<EditIcon />}
                            onClick={() => handleReactivate(product.id)}
                          >
                            {product.status === 'deleted' ? 'Reactivate' : 'Edit'}
                          </Button>
                        </ChakraLink>
                        {product.status !== 'deleted' && (
                          <ChakraLink as={ReactRouterLink} to={`/delete/${product.id}`}>
                            <Button colorScheme='red' size="sm" leftIcon={<DeleteIcon />}>Delete</Button>
                          </ChakraLink>
                        )}
                      </ButtonGroup>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
            {showProduct && <Product1 />}
          </TableContainer>

          <Flex justify="space-between" mt={4}>
            {currentPage > 1 && (
              <Button onClick={handlePrevPage} leftIcon={<ChevronLeftIcon />} variant="outline" colorScheme="blue">
                Previous
              </Button>
            )}
            {totalPages > currentPage && (
              <Button onClick={handleNextPage} rightIcon={<ChevronRightIcon />} variant="outline" colorScheme="blue">
                Next
              </Button>
            )}
          </Flex>

        </StatNumber>
      </Stat>
    </Box>
  );
}
