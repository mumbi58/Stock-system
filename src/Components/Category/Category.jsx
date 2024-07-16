import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import useFetchCategories from '../Hooks/fetchcategory.jsx';
import { Box, Stack, Stat, StatLabel, Button, ButtonGroup, Link as ChakraLink } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
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
            p={3}
            cursor="pointer"
            mb={4}

          >
            <Stack spacing={1}>
              <Stat>
                <StatLabel
                >{category.category_name}</StatLabel>
              </Stat>

              <ButtonGroup gap="1">
                <ChakraLink as={ReactRouterLink} to={`/edit-category/${category.category_id}`}>
                  <Button colorScheme='blue' size="sm" leftIcon={<EditIcon />}>Edit</Button>
                </ChakraLink>

                <ChakraLink as={ReactRouterLink} to={`/delete-category/${category.category_id}`}>
                  <Button colorScheme='red' size="sm" leftIcon={<DeleteIcon />}>Delete</Button>
                </ChakraLink>

                <ChakraLink >
                  <Button colorScheme='blue' size="sm" leftIcon={<ViewIcon />} onClick={() => handleCategory(category.category_id)}>View</Button>
                </ChakraLink>
              </ButtonGroup>

            </Stack>
          </Box>
        </form>
      ))}
    </Box>
  );
}
