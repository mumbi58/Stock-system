import { FormControl, FormLabel, Input, Button, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchCategories from '../Hooks/fetchcategory.jsx';
export default function EditCategory() {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const { categories, loading, error } = useFetchCategories();
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    useEffect(() => {
        if (!loading && !error) {
            const category = categories.find(cat => cat.id === (id));
            if (category) {
                setCategoryName(category.category_name);

            }
        }
    }, [loading, error, categories, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedCategory = {
            category_name: categoryName,
        };

        try {
            const response = await fetch(`http://localhost:8000/category/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCategory)
            });

            if (response.ok) {
                toast({
                    title: "Category update successful.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate('/category');
            } else {
                let errorMessage = "An error occurred while updating the category.";
                if (response.headers.get("Content-Type")?.includes("application/json")) {
                    const result = await response.json();
                    errorMessage = result.message || errorMessage;
                } else {
                    errorMessage = await response.text();
                }

                toast({
                    title: "Failed to update category.",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        } catch (error) {
            toast({
                title: "Failed to update category.",
                description: error.message,
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
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </FormControl>

                <Button type="submit" mt={4} colorScheme="blue">Update Category</Button>
            </form>
        </Box>
    );
}
