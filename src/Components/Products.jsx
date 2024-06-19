// Products.jsx
import React, { useEffect, useState } from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export default function Products() {
  // const [product, setProduct] = useState(null);
  // useEffect(async () => {
  //   try {
  //     const Products = await fetch("http://localhost:8000/products");
  //     const data = await Products.json();
  //     setProduct(data);
  //   } catch (error) {}
  // });

  return (
    <Box p="5" shadow="md" borderWidth="1px">
      <Stat>
        <StatLabel>Number of Products</StatLabel>
        {/* <StatNumber>{product}</StatNumber> */}
      </Stat>
    </Box>
  );
}
