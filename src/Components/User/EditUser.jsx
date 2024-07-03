import { FormControl, FormLabel, Input, Button, Select, InputGroup, InputRightElement, IconButton, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const roles = ['admin', 'shop keeper', 'auditor'];
const statusOptions = ['active', 'inactive'];

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8000/users/${id}`);
            const user = await response.json();
            setEmail(user.email);
            setUserName(user.userName);
            setStatus(user.status);
            setRole(user.role);
            setFirstName(user.firstName);
            setSecondName(user.secondName);
            setPassword(user.password);
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            email,
            userName,
            status,
            role,
            firstName,
            secondName,
            password
        };

        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            setEmail('');
            setUserName('');
            setStatus('');
            setRole('');
            setFirstName('');
            setSecondName('');
            setPassword('');
            toast({
                title: "User updated successfully.",
                // description: "The user information has been updated.",
                status: "success",
                
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            navigate('/users');
        } else {
            const result = await response.json();
            console.error('Failed to update user:', result);
            toast({
                title: "Failed to update user.",
                description: result.message || "An error occurred while updating the user.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    return (
        <Box pl='200px'>
        <form onSubmit={handleSubmit} >
            <FormControl isRequired>
                <FormLabel>User Name</FormLabel>
                <Input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={handlePasswordVisibility}
                            variant="ghost"
                        />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <Button type="submit" mt={4}>Update User</Button>
        </form>
        </Box>
    );
}
