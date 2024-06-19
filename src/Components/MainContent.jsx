// MainContent.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import DashboardCards from './DashboardCards';

function MainContent() {
  return (
    <Box p="5" flex="1">
      <DashboardCards />
    </Box>
  );
}

export default MainContent;
