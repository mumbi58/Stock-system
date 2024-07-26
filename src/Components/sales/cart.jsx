import React, { useContext } from 'react';
import { Box, Text, List, ListItem, Divider, Button, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './Sellproduct';
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Handle quantity changes
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

  // Remove an item
  const handleRemoveItem = (item) => {
    const updatedItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedItems);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    let price;
    if (typeof item.price === 'string') {
      const cleanedPriceString = item.price.replace(/[^\d.-]/g, '');
      price = parseFloat(cleanedPriceString);
    } else if (typeof item.price === 'number') {
      price = item.price;
    } else {
      console.error(`Invalid price format for item ${item.name}`);
      return total;
    }

    return total + (price * item.quantity);
  }, 0);

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Generate a unique ID (for simplicity, using a timestamp)
  const generateId = () => `cart-${Date.now()}`;

  // Clear cart and add to sales
  const clearCartAndAddToSales = async () => {
    if (cartItems.length === 0) {
      console.error("Cart is empty");
      return;
    }

    const salesData = cartItems.reduce((acc, item, index) => {
      acc[index] = {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        date: getTodayDate() // Add the current date to each item
      };
      return acc;
    }, {});

    const cartData = {
      id: generateId(), // Unique ID for the cart
      date: getTodayDate(),
      ...salesData
    };

    try {
      const response = await fetch("http://localhost:8000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sales data successfully sent:", data);

      setCartItems([]);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error adding sales:", error);
    }
  };

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Text fontSize="xl" fontWeight="bold" mb="4">Shopping Cart</Text>
      <List spacing={3}>
        {cartItems.map((item) => (
          <ListItem key={item.id} display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Text pl={2}>
                {item.name} - Quantity: {item.quantity}
                <IconButton
                  aria-label="Increase Quantity"
                  icon={<AddIcon />}
                  onClick={() => handleQuantityChange(item, '+')}
                  size="sm"
                  ml={2}
                />
                <IconButton
                  aria-label="Decrease Quantity"
                  icon={<MinusIcon />}
                  onClick={() => handleQuantityChange(item, '-')}
                  size="sm"
                  ml={2}
                />
              </Text>
              <Text>Price: {item.price}</Text>
            </Box>
            <IconButton
              aria-label="Remove Item"
              colorScheme='red'
              icon={<CloseIcon />}
              onClick={() => handleRemoveItem(item)}
              size="sm"
            />
          </ListItem>
        ))}
      </List>
      <Divider mt="4" />
      <Text fontSize="xl" fontWeight="bold" mt="4">Total Price: {totalPrice.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</Text>
      <Button onClick={clearCartAndAddToSales} mt="4">Checkout</Button>
    </Box>
  );
};

export default Cart;
