import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import useFetchSalesData from './fetchsales';

const CartTotal = () => {
    const sales = useFetchSalesData();

    const calculateCartTotal = (cart) => {
        let total = 0;
        Object.values(cart).forEach((item) => {
            if (item.hasOwnProperty('price') && item.hasOwnProperty('quantity')) {
                const numericPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));
                total += numericPrice * item.quantity;
            }
        });
        return total.toFixed(2);
    };

    const handlePrintCart = (cartId) => {
        const cartDetails = sales.find(cart => cart.id === cartId);
        if (cartDetails) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Cart Details</title>
                            <style>
                                body { font-family: Arial, sans-serif; }
                                .container { max-width: 800px; margin: 20px auto; }
                                .cart-details { border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-bottom: 10px; }
                                .cart-details > p { margin: 5px 0; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="cart-details">
                                    <p>ID: ${cartDetails.id}</p>
                                    ${Object.values(cartDetails).filter(item => typeof item === 'object' && item.hasOwnProperty('name') && item.hasOwnProperty('price') && item.hasOwnProperty('quantity')).map(item => `<p>${item.name} - Ksh ${item.price} - Quantity: ${item.quantity}</p>`).join('\n')}
                                    <p>Total Price: Ksh ${calculateCartTotal(cartDetails)}</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            } else {
                alert('Popup blocked. Please allow popups for this site to print.');
            }
        }
    };

    return (
        <Box pl={200}>
            <Text fontSize="xl" mb="4">Cart Total</Text>
            {sales.map((cart, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" p="4" mb="4">
                    <Flex justify="space-between" align="center" mb="2">
                        <Text>ID: {cart.id}</Text>
                        <Button variant="outline" colorScheme="blue" onClick={() => handlePrintCart(cart.id)}>
                            Print
                        </Button>
                    </Flex>
                    {Object.values(cart)
                        .filter(item => typeof item === 'object' && item.hasOwnProperty('name') && item.hasOwnProperty('price') && item.hasOwnProperty('quantity'))
                        .map((item, idx) => (
                            <Box key={idx} mt="2">
                                <Text>{item.name} - Ksh {item.price} - Quantity: {item.quantity}</Text>
                            </Box>
                        ))}
                    <Box mt="2" borderTop="1px solid" pt="2">
                        <Text>Total Price: Ksh {calculateCartTotal(cart)}</Text>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default CartTotal;
