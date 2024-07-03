import { Container, Table, Thead, Tbody, Tr, Th, Td, TableContainer,Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product1({ productId }) {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching data for productId:", productId);

    const fetchId = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:8000/products/${id}`);
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
  }, [id]);

  console.log("Hey Reggie");

  return (
<Box pl='200px'>
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
        <Tbody >
          {/* {item.map((product) => ( */}
          <Tr key={item.id}style={{fontSize:'16px'}}>
            <Td>{item.name}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.description}</Td>
            <Td>{item.price}</Td>
            <Td>{item.reorder_level}</Td>
          </Tr>
          {/* ))} */}
        </Tbody>
      </Table>
    </TableContainer>
    </Box>

  );
}
