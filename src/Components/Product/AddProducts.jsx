import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, IconButton } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

export default function AddProducts() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddProduct = async () => {
    try {
      if (!productName || !productPrice) {
        setError("Please fill in all fields.");
        return;
      }

      const newProduct = {
        name: productName,
        price: parseFloat(productPrice)
      };

      const response = await fetch("http://localhost:5000/products", {
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
      <Input type='text' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
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
