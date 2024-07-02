import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    userName: '',
    status: '',
    role: '',
    firstName: '',
    secondName: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:8000/users/${id}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      status: 'disabled'
    };

    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    });

    if (response.ok) {
      console.log('User status updated to deleted');
      navigate('/users');
    } else {
      const result = await response.json();
      console.error('Failed to update user status:', result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          disabled
          type="text"
          value={user.firstName}
          readOnly
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Second Name</FormLabel>
        <Input
        disabled
          type="text"
          value={user.secondName}
          readOnly
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>User Name</FormLabel>
        <Input
        disabled
          type="text"
          value={user.userName}
          readOnly
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Role</FormLabel>
        <Input
        disabled
          type="text"
          value={user.role}
          readOnly
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
        disabled
          type="password"
          value={user.password}
          readOnly
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        disabled
          type="email"
          value={user.email}
          readOnly
        />
      </FormControl>
      <Button type="submit" mt={4}>Delete User</Button>
    </form>
  );
}
