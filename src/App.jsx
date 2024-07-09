
import  { useState } from 'react';
import { ChakraProvider, Flex,Box } from '@chakra-ui/react';
import Sidebar from './Components/SideBar';
import MainContent from './Components/MainContent';
import { Route, Routes, } from 'react-router-dom';
import Sales from './Components/Sales';

import Products from './Components/Product/Products';
import Product1 from './Components/Product/Product1';
import AddProducts from './Components/Product/AddProducts';
import Deleteproduct from './Components/Product/Deleteproduct';
import EditProduct from './Components/Product/EditProduct';
import Users from './Components/User/Users';
import AddUser from './Components/User/AddUser';
import EditUser from './Components/User/EditUser';
import DeleteUser from './Components/User/DeleteUser';
import SellProduct, { SalesProvider } from './Components/sales/Sellproduct';
import Cart from './Components/sales/cart';
import { CartProvider } from './Components/sales/Sellproduct';
import Totalsales from './Components/sales/Totalsales';

function App() {
  const [userRole, setUserRole] = useState('admin'); // Set this based on your authentication logic

  const handleLogout = () => {
    console.log("User logged out");
    // Implement logout logic here
  };

  return (
    
    <ChakraProvider>
      <CartProvider>
        <SalesProvider>
      
      <Flex height="100vh">
        <Sidebar onLogout={handleLogout} />
        <Box flex="1" p="5">
            <Routes>
              <Route path="/sale" element={<Sales />} />
              <Route path="/sales" element={<Totalsales />} />

              <Route path="/sell" element={<SellProduct />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product1 />} />
              <Route path="/product/" element={<AddProducts />} />
              <Route path="/delete/:id" element={<Deleteproduct />} />
              <Route path="/edit/:id" element={<EditProduct/>} />
              <Route path="/users" element={<Users />} />
              <Route path="/user" element={<AddUser/>} />
              <Route path="/user/:id" element={<EditUser/>} />
              <Route path="/deleteuser/:id" element={<DeleteUser/>} />
              <Route path="/cart" element={<Cart/>} />


            </Routes>
          </Box>
        {/* <MainContent /> */}
      </Flex>
      </SalesProvider>
      </CartProvider>

    </ChakraProvider>
   
  );
}

export default App;
