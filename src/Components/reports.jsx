import { useState } from 'react';

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormLabel,
  HStack,
  VStack,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import useFetchSalesData from './Hooks/fetchsales';

export default function Reports() {
  const sales = useFetchSalesData();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchClicked, setSearchClicked] = useState(false);

  // Helper function to parse date string to Date object
  const parseDate = (dateString) => {
    if (!dateString) return new Date(); // Return current date if dateString is empty or undefined
    const [year, month, day] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredSales = searchClicked ? sales.filter(sale => {
    if (!startDate && !endDate) return true;

    const saleDate = sale.date ? parseDate(sale.date) : new Date();
    const start = startDate ? parseDate(startDate) : new Date(0);
    const end = endDate ? parseDate(endDate) : new Date();
    return saleDate >= start && saleDate <= end;
  }) : sales;

  // Get the last 100 sales
  const recentSales = filteredSales.slice(-100);

  // Process sales data to combine products with the same name and sum their quantities
  const processedProducts = recentSales.reduce((acc, sale) => {
    Object.values(sale).forEach((item) => {
      if (item.name) {
        const existingProduct = acc.find(product => product.name === item.name);
        if (existingProduct) {
          existingProduct.quantity += item.quantity;
          existingProduct.totalPrice += item.price * item.quantity; // Use item.price directly
        } else {
          acc.push({ ...item, totalPrice: item.price * item.quantity }); // Use item.price directly
        }
      }
    });
    return acc;
  }, []);

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(processedProducts.length / productsPerPage);

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
                    ${currentProducts.map(product => `
                      <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</td>
                        <td>Ksh ${product.totalPrice.toFixed(2)}</td>
                      </tr>
                    `).join('')}
                    <tr>
                      <td colspan="3"><strong>Total Amount</strong></td>
                      <td><strong>Ksh ${calculateTotalAmount(currentProducts).toFixed(2)}</strong></td>
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
      <Flex justify="space-between" mb="4">
        <Heading as="h1" size="xl">Sales Products</Heading>
        <Button onClick={handlePrintReports} mt="2" border="2px"
          borderColor="gray.200"
          colorScheme="teal"
          variant="outline"
          _hover={{ bg: "teal.100" }}
          _focus={{ boxShadow: "outline" }}>Print Reports</Button>

      </Flex>

      <HStack spacing="4" mb="4" align="center" justify="center">
        <VStack align="flex-start" spacing="1">
          <FormLabel htmlFor="start-date" mb="0">Start Date</FormLabel>
          <Input
            id="start-date"
            type="date"
            size="sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'gray.500' }}
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
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'gray.500' }}
          />
        </VStack>
        <Button
          onClick={() => setSearchClicked(true)}
          mt="6"
          border="2px"
          borderColor="gray.200"
          colorScheme="teal"
          variant="outline"
          _hover={{ bg: "teal.100" }}
          _focus={{ boxShadow: "outline" }}
        >
          Search
        </Button>
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
          {currentProducts.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</Td>
              <Td>{product.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</Td>
            </Tr>
          ))}
          <Tr>
            <Td colSpan="3"><strong>Total Amount</strong></Td>
            <Td><strong>{calculateTotalAmount(currentProducts).toLocaleString('en-US', { style: 'currency', currency: 'KES' })}</strong></Td>
          </Tr>
        </Tbody>
      </Table>

      <Flex justify="space-between" mt="4">
        {currentPage > 1 && (
          <Button onClick={() => setCurrentPage(prev => prev - 1)} colorScheme="teal">
            Previous
          </Button>
        )}
        {totalPages > currentPage && (
          <Button onClick={() => setCurrentPage(prev => prev + 1)} colorScheme="teal">
            Next
          </Button>
        )}
      </Flex>
    </Box>  
  );
}
