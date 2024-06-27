import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, IconButton } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

export default function AddProducts() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [reorderLevel, setReorderLevel] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState('');



  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddProduct = async () => {
    try {
      if (!productName || !productPrice || !quantity || !description || !reorderLevel) {
        setError("Please fill in all fields.");
        return;
      }

      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        quantity,
        description,
        reorder_level: reorderLevel

      };

      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      setProductName("");
      setProductPrice("");
      setQuantity('');
      setDescription('');
      setReorderLevel('');
      
      


      setSuccess(true);
      setError(null);

    } catch (error) {
      console.error("Error adding product:", error.message);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <FormControl isRequired>
      <FormLabel>Name</FormLabel>
      <Input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
      <FormLabel>Price</FormLabel>
      <Input type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      <FormLabel>Description</FormLabel>
      <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      <FormLabel>Quantity</FormLabel>
      <Input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <FormLabel>Re-Order Level</FormLabel>
      <Input type='number' value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} />
      <IconButton onClick={handleAddProduct} icon={<AddIcon />} />

      {error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}

      {success && (
        <div style={{ color: 'green' }}>Product added successfully!</div>
      )}
    </FormControl>
  );
}
