import { FormControl, FormLabel, Input, Button,Box,useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

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
      setStatus(product.status);

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
      status: "deleted"

    };

    const response = await fetch(`http://localhost:8000/products/${id}`, {
      method: "PUT",
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
      toast({
        title: "product disabled successfully.",
                // description: "The user information has been updated.",
                status: "success",
                
                duration: 5000,
                isClosable: true,
                position: "top-right",
      })
      navigate('/products/active');
    } else {
      const result = await response.json();
      console.error('Failed to update product:', result);
    }
  };

  return (
    <Box pl='200px'>
      <form >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            disabled
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            disabled
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            disabled
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            disabled
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Reorder</FormLabel>
          <Input
            disabled
            type="number"
            value={reorderLevel}
            onChange={(e) => setReorderLevel(e.target.value)}
          />
        </FormControl>
        <Button type="button" mt={4} onClick={handleSubmit} colorScheme='red' >Delete Product</Button>
      </form>
    </Box>
  );
}
