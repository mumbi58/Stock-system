import { FormControl, FormLabel, Input, Button, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchCategories from '../Hooks/fetchcategory.jsx';
export default function DeleteCategory() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { categories, loading, error } = useFetchCategories();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [CategoryObject, setCategoryObject] = useState([])

  useEffect(() => {
    if (!loading && !error) {
      const category = categories.find(cat => cat.id === (id));
      if (category) {
        setCategoryName(category.category_name);
        setCategoryDescription(category.description);
        setCategoryObject(category)
      }
    }
  }, [loading, error, categories, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCategory = {
      category_name: categoryName,
      // deleted: true , 
      id
    };

    const response = await fetch(`http://localhost:8000/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCategory)
    });

    if (response.ok) {
      setCategoryName("");
      setCategoryDescription("");
      console.log('Category deleted successfully');
      navigate('/category');
      toast({
        title: "Category deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      const result = await response.json();
      console.error('Failed to delete category:', result);
      toast({
        title: "Failed to delete category.",
        description: result.message || "An error occurred while deleting the category.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error fetching category: {error.message}</Box>;
  }

  return (
    <Box pl='200px'>
      <form>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            disabled
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>
        
        <Button type="button" mt={4} onClick={handleSubmit} colorScheme='red'>Delete Category</Button>
      </form>
    </Box>
  );
}
