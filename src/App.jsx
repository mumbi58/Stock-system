
import  { useState } from 'react';
import { ChakraProvider, Flex,Box } from '@chakra-ui/react';
import Sidebar from './Components/SideBar';
import MainContent from './Components/MainContent';
import { Route, Routes, } from 'react-router-dom';
import Sales from './Components/Sales';
import Products from './Components/Products';

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
        <Box flex="1" p="5">
            <Routes>
              <Route path="/sales" element={<Sales />} />
              {/* <Route path="/stock" element={<Stock />} /> */}
              <Route path="/products" element={<Products />} />
              {/* <Route path="/logout" element={<Logout />} /> */}
            </Routes>
          </Box>
        {/* <MainContent /> */}
      </Flex>
    </ChakraProvider>
   
  );
}

export default App;
