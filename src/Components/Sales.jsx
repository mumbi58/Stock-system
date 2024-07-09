// Sales.js
import React from "react";
import { Box, Stat, StatLabel, StatNumber, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useFetchSalesData from "./sales/fetchsales";

const Sales = () => {
  const salesData = useFetchSalesData();
  const navigate = useNavigate();

  const handleSales = () => {
    navigate("/sales");
  };

  const totalSales = salesData.reduce((total, sale) => {
    Object.keys(sale).forEach(key => {
      if (!isNaN(key)) {
        let price;

        if (typeof sale[key].price === 'string') {
          const priceString = sale[key].price;
          const cleanedPriceString = priceString.replace(/[^\d.-]/g, '');
          price = parseFloat(cleanedPriceString);
        } else {
          price = sale[key].price;
        }

        if (!isNaN(price)) {
          total += price * sale[key].quantity;
        } else {
          console.error(`Invalid price format for sale with key ${key}: ${sale[key].price}`);
        }
      }
    });
    return total;
  }, 0);

  const aggregatedSales = salesData.reduce((aggregate, sale) => {
    Object.keys(sale)
      .filter(key => key !== 'id')
      .forEach(itemKey => {
        const item = sale[itemKey];
        const itemName = item.name;
        const itemPrice = item.price;
        const itemQuantity = item.quantity;

        if (aggregate[itemName]) {
          aggregate[itemName].quantity += itemQuantity;
          aggregate[itemName].totalPrice += itemPrice * itemQuantity;
        } else {
          aggregate[itemName] = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            totalPrice: itemPrice * itemQuantity
          };
        }
      });
    return aggregate;
  }, {});

  return (
    <Box p="5" shadow="md" pl='200px' borderWidth="1px" width="100%" height="100%" onClick={handleSales} cursor="pointer">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(aggregatedSales).map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td isNumeric>{item.price}</Td>
                <Td isNumeric>{item.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <Stat>
        <StatLabel>Total </StatLabel>
        <StatNumber>{totalSales}</StatNumber>
      </Stat> */}
    </Box>
  );
};

export default Sales;
