import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import TotalSales from './sales/Totalsales';
import ProductNo from './Dashboard/productsnumber';
import UsersTotal from './Dashboard/usersnumbers';

function DashboardCards() {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="5" marginLeft={200} cursor="pointer">
      <Box bg="blue.100" p={5} borderRadius="md" boxShadow="md">
        <TotalSales />
      </Box>
      <Box bg="green.100" p={5} borderRadius="md" boxShadow="md">
        <ProductNo />
      </Box>
      <Box bg="yellow.100" p={5} borderRadius="md" boxShadow="md">
        <UsersTotal />
      </Box>
    </SimpleGrid>
  );
}

export default DashboardCards;
