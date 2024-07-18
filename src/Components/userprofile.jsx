import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function Userprofile() {

  const navigate = useNavigate();

 
  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={2} textAlign="center">User Profile</Heading>
      <Text mb={4}>Username: JohnDoe</Text>
      <Text mb={4}>Email: johndoe@example.com</Text>
      {/* <Button colorScheme="blue" width="full" mt={4} onClick={handleLogout}>
        Logout
      </Button> */}
    </Box>
  );
}
