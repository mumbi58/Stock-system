import React, { useState, useEffect } from "react";
import { Box, Stat, StatLabel, StatNumber, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  const handleSales = () => {
    navigate("/sales");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("http://localhost:8000/sales");
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchData();
  }, []);



  const totalSales = salesData.reduce((total, sale) => {
    Object.keys(sale).forEach(key => {
      if (!isNaN(key)) {
        total += sale[key].price * sale[key].quantity; // Multiply price by quantity
      }
    });
    return total;
  }, 0);





  // Aggregate sales data by item name
  const aggregatedSales = salesData.reduce((aggregate, sale) => {
    Object.keys(sale)
      .filter(key => key !== 'id')
      .forEach(itemKey => {
        const item = sale[itemKey];
        const itemName = item.name;
        const itemPrice = item.price;
        const itemQuantity = item.quantity;

        if (aggregate[itemName]) {
          // Item already exists, add quantity and update total price
          aggregate[itemName].quantity += itemQuantity;
          aggregate[itemName].totalPrice += itemPrice * itemQuantity;
        } else {
          // New item, initialize with price and quantity
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

      <Stat>
        <StatLabel>Total Sales Today</StatLabel>
        <StatNumber>${totalSales}</StatNumber>
      </Stat>
    </Box>
  );
};

export default Sales;
