// DashboardCards.jsx
import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Users from './Users';

import Products from './Product/Products';
import Sales from './Sales';

function DashboardCards() {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing="5">
      <Users />
      <Products />
      <Sales />
    </SimpleGrid>
  );
}

export default DashboardCards;
