import { useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, FormLabel, HStack, VStack, Button } from '@chakra-ui/react';
import useFetchSalesData from './Hooks/fetchsales';

export default function Reports() {
  const sales = useFetchSalesData();
  // console.log(sales);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Helper function to convert price string to number
  const parsePrice = (price) => {
    if (!price) return 0; 
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  // Helper function to parse date string to Date object
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  
  const filteredSales = sales.filter(sale => {
    if (!startDate && !endDate) return true; 

    const saleDate = parseDate(sale.date);
    const start = startDate ? parseDate(startDate) : new Date(0); 
    const end = endDate ? parseDate(endDate) : new Date(); 
    return saleDate >= start && saleDate <= end;
  });

  // Process sales data to combine products with the same name and sum their quantities
  const processedProducts = filteredSales.reduce((acc, sale) => {
    Object.values(sale).forEach((item) => {
      if (item.name) { 
        const existingProduct = acc.find(product => product.name === item.name);
        if (existingProduct) {
          existingProduct.quantity += item.quantity;
          existingProduct.totalPrice += parsePrice(item.price) * item.quantity;
        } else {
          acc.push({ ...item, totalPrice: parsePrice(item.price) * item.quantity });
        }
      }
    });
    return acc;
  }, []);

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  };

  const handlePrintReports = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Sales Report</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 800px; margin: 20px auto; }
              .report-details { border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-bottom: 10px; }
              .report-details > p { margin: 5px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Sales Report</h1>
              <div class="report-details">
                <p><strong>Start Date:</strong> ${startDate || 'N/A'}</p>
                <p><strong>End Date:</strong> ${endDate || 'N/A'}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${processedProducts.map(product => `
                      <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                        <td>Ksh ${product.totalPrice.toFixed(2)}</td>
                      </tr>
                    `).join('')}
                    <tr>
                      <td colspan="3"><strong>Total Amount</strong></td>
                      <td><strong>Ksh ${calculateTotalAmount(processedProducts).toFixed(2)}</strong></td>
                    </tr>
                  </tbody>
                </table>
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
  };

  return (
    <Box padding="4" bg="gray.100" maxW="3xl" margin="auto">
      <Heading as="h1" size="xl" mb="4">Sales Products</Heading>

      <HStack spacing="4" mb="4" align="center" justify="center">
        <VStack align="flex-start" spacing="1">
          <FormLabel htmlFor="start-date" mb="0">Start Date</FormLabel>
          <Input
            id="start-date"
            type="date"
            size="sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            borderColor="teal.300"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500' }}
          />
        </VStack>
        <VStack align="flex-start" spacing="1">
          <FormLabel htmlFor="end-date" mb="0">End Date</FormLabel>
          <Input
            id="end-date"
            type="date"
            size="sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            borderColor="teal.300"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500' }}
          />
        </VStack>
      </HStack>

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Total Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {processedProducts.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price}</Td>
              <Td>{(product.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</Td>
            </Tr>
          ))}
          <Tr>
            <Td colSpan="3"><strong>Total Amount</strong></Td>
            <Td><strong>{calculateTotalAmount(processedProducts).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</strong></Td>
          </Tr>
        </Tbody>
      </Table>

      <Button onClick={handlePrintReports} colorScheme="teal" mt="4">Print Reports</Button>
    </Box>
  );
}
