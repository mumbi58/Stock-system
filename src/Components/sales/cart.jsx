import { Box, Text, List, ListItem, Divider } from '@chakra-ui/react';
import { CartContext } from './Sellproduct';
import { useContext } from 'react';


const Cart = () => {
  const {cartItems, setCartItems} = useContext(CartContext)
  console.log(cartItems);

  return (
    <Box p="5" shadow="md" width="100%" height="100%" pl='200px'>
      <Text fontSize="xl" fontWeight="bold" mb="4">Shopping Cart</Text>
      <List spacing={3}>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <Text>{item.name} - Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
            <Divider mt="2" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Cart;
