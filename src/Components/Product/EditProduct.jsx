import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:8000/products/${id}`);
            const product = await response.json();
            setProductName(product.name);
            setProductPrice(product.price);
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedProduct = {
            name: productName,
            price: parseFloat(productPrice)
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
            console.log('Product updated successfully');
            navigate('/products');  
        } else {
            const result = await response.json();
            console.error('Failed to update product:', result);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                    type="text" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                />
            </FormControl>
            <FormControl>
                <FormLabel>Price</FormLabel>
                <Input 
                    type="number" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                />
            </FormControl>
            <Button type="submit" mt={4}>Update Product</Button>
        </form>
    );
}
