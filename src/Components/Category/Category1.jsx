import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, List, ListItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useFetchCategories from "../Hooks/fetchcategory";

export default function CategoryDetails() {
  const { category_id } = useParams();
  const { categories, loading, error } = useFetchCategories(category_id);

  console.log('category_id:', category_id);
  console.log('categories:', categories);

  const selectedCategory = categories.find(category => category.category_id === parseInt(category_id));
  console.log('selectedCategory:', selectedCategory);

  if (!selectedCategory) {
    return <Box pl='200px'>Category not found for ID: {category_id}</Box>;
  }

  if (loading) {
    return <Box pl='200px'>Loading...</Box>;
  }

  if (error) {
    return <Box pl='200px'>Error fetching category: {error.message}</Box>;
  }

  return (
    <Box pl='200px'>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={selectedCategory.category_id}>
              <Td>{selectedCategory.category_name}</Td>
              <Td>
                <List>
                  {selectedCategory.products.map((product) => (
                    <ListItem key={product.product_id}>
                      {product.product_name} - ${product.price}
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
