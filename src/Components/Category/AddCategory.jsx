import { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddCategory = async () => {
    try {
      if (!categoryName || products.length === 0) {
        setError("Please fill in all fields and add at least one product.");
        return;
      }

      const newCategory = {
        category_name: categoryName,
        products: products.map(product => ({
          product_name: product.name,
          price: product.price
        }))
      };

      const response = await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
      });

      if (!response.ok) {
        throw new Error("Failed to add category.");
      }

      setCategoryName("");
      setProducts([]);
      setProductName("");
      setProductPrice("");
      setSuccess(true);
      setError(null);

    } catch (error) {
      console.error("Error adding category:", error.message);
      setError("Failed to add category. Please try again.");
    }
  };

  const handleAddProduct = () => {
    if (!productName || !productPrice) {
      setError("Please fill in both product name and price.");
      return;
    }

    setProducts([...products, { name: productName, price: productPrice }]);
    setProductName("");
    setProductPrice("");
    setError(null);
  };

  return (
    <FormControl isRequired pl={200}>
      <FormLabel>Category Name</FormLabel>
      <Input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />

      <FormLabel>Product Name</FormLabel>
      <Input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
      <FormLabel>Product Price</FormLabel>
      <Input type='number' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

      <Button onClick={handleAddProduct} leftIcon={<AddIcon />} colorScheme='blue' size="sm" mt={4}>Add Product</Button>

      <Button onClick={handleAddCategory} leftIcon={<AddIcon />} colorScheme='blue' size="sm" mt={4}>Add Category</Button>

      {products.length > 0 && (
        <div>
          <h3>Products:</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.name} - {product.price}</li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}

      {success && (
        <div style={{ color: 'green' }}>Category added successfully!</div>
      )}
    </FormControl>
  );
}
