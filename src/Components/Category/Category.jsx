import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import useFetchCategories from '../Hooks/fetchcategory';
import { Box, Stack, Stat, StatLabel, Button, ButtonGroup, Link as ChakraLink } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function Category() {
  const { categories, loading, error } = useFetchCategories();
  const navigate = useNavigate();

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error fetching categories: {error.message}</Box>;
  }

  const handleCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Box pl='200px'>
      {categories.map((category) => (
        <form key={category.category_id}>
          <Box
            p={8}
            cursor="pointer"
            mb={4}
            onClick={() => handleCategory(category.category_id)}
          >
            <Stack spacing={4}>
              <Stat>
                <StatLabel>{category.category_name}</StatLabel>
              </Stat>
              <ButtonGroup gap="1">
                <ChakraLink as={ReactRouterLink} to={`/edit-category/${category.category_id}`}>
                  <Button colorScheme='blue' size="sm" leftIcon={<EditIcon />}>Edit</Button>
                </ChakraLink>
                
                <ChakraLink as={ReactRouterLink} to={`/delete-category/${category.category_id}`}>
                  <Button colorScheme='red' size="sm" leftIcon={<DeleteIcon />}>Delete</Button>
                </ChakraLink>
              </ButtonGroup>
            </Stack>
          </Box>
        </form>
      ))}
    </Box>
  );
}
