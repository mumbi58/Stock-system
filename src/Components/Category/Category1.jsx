import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, List, ListItem, ButtonGroup, Input, Link as ChakraLink, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useFetchCategories from "../Hooks/fetchcategory";

export default function CategoryDetails() {
  const { category_id } = useParams();
  const { categories, loading, error } = useFetchCategories();

  const selectedCategory = categories.find(category => category.category_id === parseInt(category_id));

  if (loading) {
    return <Box pl='200px'>Loading...</Box>;
  }

  if (error) {
    return <Box pl='200px'>Error fetching category: {error.message}</Box>;
  }

  if (!selectedCategory) {
    return <Box pl='200px'>Category not found for ID: {category_id}</Box>;
  }

  return (
    <Box pl='200px'>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category Name</Th>
              <Th>Products</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={selectedCategory.category_id}>
              <Td>{selectedCategory.category_name}</Td>
              <Td>
                <List spacing={3}>
                  {selectedCategory.products.map((product) => (
                    <ListItem key={product.product_id}>
                      {product.product_name} - {typeof product.price === 'string' ? product.price : `$${product.price}`}
                    </ListItem>
                  ))}
                </List>
              </Td>
            
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
