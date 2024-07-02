import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Table, TableContainer, Tbody, Th, Thead, Tr, Td, Button, Link as ChakraLink, ButtonGroup } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link as ReactRouterLink } from "react-router-dom";
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';


export default function Users() {
  const [User, setUser] = useState([])
  const [adduser, setAdduser] = useState([])
  const handleAddUser = () => {
    setAdduser(adduser)
  }
  useEffect(() => {
    const Users = async () => {
      const user = await fetch("http://localhost:8000/users")
      const data = await user.json()
      setUser(data)
      console.log(data.name);

    }
    Users()

  }, [])


  return (
    <Box p="5" shadow="md" width="100%" height="100%">
      <TableContainer>
        <ChakraLink as={ReactRouterLink} to="/user">

          <Button leftIcon={<AddIcon />} colorScheme='blue' size="sm" ml="900px">Add</Button>
        </ChakraLink>
        <Table variant="variant">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>


            </Tr>
          </Thead>
          <Tbody>
            {User.map((user) => (
              <Tr key={user.id}>

                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>

                <Td>{user.role}</Td>
                <Box

                  bg={user.status === 'active' ? 'green.400' : 'red.400'}
                  color="white"
                  px={2}

                  py={1}
                  borderRadius="md"
                  display="inline-block"
                  textAlign="center"
                  fontsize='10px'
                  fontWeight="bold"
                  m={2}
                  width="60px" // Adjust width as needed
                >
                  {user.status}
                </Box>

                <ButtonGroup gap="2">
                  <ChakraLink as={ReactRouterLink} to={`/user/${user.id}`} onClick={EditUser} >
                    <Button colorScheme='blue' size="sm" leftIcon={<EditIcon />} >edit</Button></ChakraLink>
                  <ChakraLink as={ReactRouterLink} to={`/deleteuser/${user.id}`} onClick={DeleteUser}>
                    <Button colorScheme='red' size="sm" leftIcon={<DeleteIcon />}>Delete</Button></ChakraLink>




                </ButtonGroup>
              </Tr>
            ))}
          </Tbody>





        </Table>
      </TableContainer>



    </Box>
  )
}
