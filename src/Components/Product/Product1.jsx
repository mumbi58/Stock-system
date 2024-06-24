import { Container, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Product1({ productId }) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    console.log("Fetching data for productId:", productId);

    const fetchId = async () => {
      if (!productId) return; // Ensure productId is defined before making the fetch request

      try {
        const response = await fetch(`http://localhost:8000/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
        console.log(data);
      } catch (error) {
        console.log("Error occurred", error);
      }
    };

    fetchId();
  }, [productId]);

  console.log("Hey Reggie");

  return (
    <Container>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Reorder Level</Th>
            </Tr>
          </Thead>
          <Tbody>
            {item.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.quantity}</Td>
                <Td>{product.description}</Td>
                <Td>{product.price}</Td>
                <Td>{product.reorder_level}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
