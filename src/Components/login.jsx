import { FormControl, FormLabel, Input, Button, Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        
        navigate('/admin');
    };

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
            <Heading mb={6} textAlign="center">Login</Heading>
            <form onSubmit={handleLogin}>
                <FormControl id="username" isRequired mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full" mt={4}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
