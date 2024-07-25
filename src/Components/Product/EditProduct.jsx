import { FormControl, FormLabel, Input, Button, useToast, Box,Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [reorderLevel, setReorderLevel] = useState();
    const [quantity, setQuantity] = useState();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:8000/products/${id}`);
            const product = await response.json();
            setProductName(product.name);
            setProductPrice(product.price);
            setQuantity(product.quantity);
            setDescription(product.description);
            setReorderLevel(product.reorder_level);
            setStatus(product.status)
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedProduct = {
            name: productName,
            price: parseFloat(productPrice),
            quantity,
            description,
            reorder_level: reorderLevel,
            status
        };

        const response = await fetch(`http://localhost:8000/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            setProductName("");
            setProductPrice("");
            setQuantity('');
            setDescription('');
            setReorderLevel('');
            setStatus('')
            console.log('Product updated successfully');
            navigate('/products');
            toast({
                title: "product update successful.",
                // description: "The user information has been updated.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            })
        } else {
            const result = await response.json();
            console.error('Failed to update product:', result);
            toast({
                title: "Failed to update user.",
                description: result.message || "An error occurred while updating the user.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            })
        }
    };

    return (
        <Box pl='200px'>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Reorder</FormLabel>
                    <Input
                        type="number"
                        value={reorderLevel}
                        onChange={(e) => setReorderLevel(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                </FormControl>

                <Button type="submit" mt={4}>Update Product</Button>
            </form>
        </Box>
    );
}
