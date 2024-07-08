import React, { useContext } from 'react';
import { Box, Text, List, ListItem, Divider, Button, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './Sellproduct';
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Function to handle quantity changes
  const handleQuantityChange = (item, operation) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        const updatedQuantity = operation === '+' ? cartItem.quantity + 1 : Math.max(cartItem.quantity - 1, 0);
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const clearCartAndAddToSales = async () => {
    if (cartItems.length === 0) {
      console.error("Cart is empty");
      return;
    }

    const newSales = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    try {
      const response = await fetch("http://localhost:8000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newSales)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sales data successfully sent:", data);

      // Clear cart items
      setCartItems([]);
      navigate('/sales');
    } catch (error) {
      console.error("Error adding sales:", error);
    }
  };

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Text fontSize="xl" fontWeight="bold" mb="4">Shopping Cart</Text>
      <List spacing={3}>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Text pl={2}>
              {item.name} - Quantity: {item.quantity}
              <IconButton
                aria-label="Increase Quantity"
                icon={<AddIcon />}
                onClick={() => handleQuantityChange(item, '+')}
                size="sm"
                mr={2}
              />
              <IconButton
                aria-label="Decrease Quantity"
                icon={<MinusIcon />}
                onClick={() => handleQuantityChange(item, '-')}
                size="sm"
              />
            </Text>
            <Text>Price: ${item.price}</Text>
            <Divider mt="2" />
          </ListItem>
        ))}
      </List>
      <Text fontSize="xl" fontWeight="bold" mt="4">Total Price: ${totalPrice.toFixed(2)}</Text>
      <Button onClick={clearCartAndAddToSales}>Checkout</Button>
    </Box>
  );
};

export default Cart;
