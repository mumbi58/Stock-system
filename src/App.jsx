
import  { useState } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Sidebar from './Components/SideBar';
import MainContent from './Components/MainContent';
import { Switch } from '@chakra-ui/react';
import { Route } from 'react-router-dom';

function App() {
  const [userRole, setUserRole] = useState('admin'); // Set this based on your authentication logic

  const handleLogout = () => {
    console.log("User logged out");
    // Implement logout logic here
  };

  return (
    <ChakraProvider>
      <Flex height="100vh">
        <Sidebar onLogout={handleLogout} />
        {/* <Switch>
          <Route></Route>
        </Switch> */}
        <MainContent />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
