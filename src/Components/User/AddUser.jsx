import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';

export default function AddUser() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('inactive');
  const [role, setRole] = useState('shop keeper');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const generateRandomPassword = () => {
    // Generates a random alphanumeric password of length 8
    const passwordChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedPassword = '';
    for (let i = 0; i < 8; i++) {
      generatedPassword += passwordChars.charAt(Math.floor(Math.random() * passwordChars.length));
    }
    return generatedPassword;
  };

  const handleAddUser = async () => {
    try {
      if (!userName || !email) {
        setError("Please fill in all required fields.");
        return;
      }

      const newPassword = generateRandomPassword(); // Generate random password

      const newUser = {
        firstName,
        secondName,
        userName,
        email,
        status,
        role,
        password: newPassword
      };

      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error("Failed to add user.");
      }

      setFirstName('');
      setSecondName('');
      setUserName('');
      setEmail('');
      setStatus('inactive');
      setRole('');
      setError(null);
      setSuccess(true);

    } catch (error) {
      console.error("Error adding user:", error.message);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <FormControl isRequired>
      <FormLabel>First Name</FormLabel>
      <Input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <FormLabel>Second Name</FormLabel>
      <Input type='text' value={secondName} onChange={(e) => setSecondName(e.target.value)} />

      <FormLabel>User Name</FormLabel>
      <Input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />

      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

      {/* Status is set to 'inactive' by default */}
      <Input type='hidden' value={status} onChange={(e) => setStatus(e.target.value)} />

      <FormLabel>Role</FormLabel>
      <Input type='text' value={role} onChange={(e) => setRole(e.target.value)} />



      {/* <Input type='password' value={generateRandomPassword()} readOnly /> */}

      <Button onClick={handleAddUser} leftIcon={<AddIcon />} colorScheme='blue' size="sm" mt={4}>Add</Button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
      )}

      {success && (
        <div style={{ color: 'green', marginTop: '1rem' }}>User added successfully!</div>
      )}
    </FormControl>
  );
}
