import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem('loggedInUser');
  //   navigate('/login');
  // };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={2} textAlign="center">User Profile</Heading>
      {user ? (
        <>
          <Text mb={4}>Username: {user.username}</Text>
          {/* <Button colorScheme="blue" width="full" mt={4} onClick={handleLogout}>
            Logout
          </Button> */}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default UserProfile;
