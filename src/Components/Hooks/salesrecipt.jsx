import React from 'react';
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';

const SalesReceipt = ({ sales, startDate, endDate }) => {
  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  };

  return (
    <Printer type="epson">
      <Text align="center" size={{ width: 2, height: 2 }}>Sales Report</Text>
      <Br />
      <Text align="center">From: {startDate || 'N/A'}</Text>
      <Br />
      <Text align="center">To: {endDate || 'N/A'}</Text>
      <Br />
      <Line />
      {sales.map((product, index) => (
        <React.Fragment key={index}>
          <Text>{product.name}</Text>
          <Row>
            <Text>Qty: {product.quantity} @ Ksh {product.price.toFixed(2)}</Text>
            <Text>Total: Ksh {product.totalPrice.toFixed(2)}</Text>
          </Row>
          <Line />
        </React.Fragment>
      ))}
      <Text>Total Amount: Ksh {calculateTotalAmount(sales).toFixed(2)}</Text>
      <Cut />
    </Printer>
  );
};

export default SalesReceipt;
