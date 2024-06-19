import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const GraphArea = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 200, 400, 500, 600, 700],
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  return (
    <Box mt="5">
      <Heading size="md">Sales Graph</Heading>
      <Line data={data} />
    </Box>
  );
};

export default GraphArea;
