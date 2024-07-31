import { useState } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Components/SideBar';
import { Header } from './Components/header';
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
import CartTotal from './Components/sales/carttotal';
import DashboardCards from './Components/DashboardCards';
import Category from './Components/Category/Category';
import EditCategory from './Components/Category/Editcategory';
import DeleteCategory from './Components/Category/DeleteCategory';
import CategoryDetails from './Components/Category/Category1';
import LoginPage from './Components/login';
import AdminDashboard from './Components/AdminDashboard';
import UserProfile from './Components/userprofile';
import AddCategory from './Components/Category/AddCategory';
import Reports from './Components/reports';

function App() {
  const [userRole, setUserRole] = useState('admin');
  const location = useLocation();

  const showSidebar = location.pathname !== '/';
  const showHeader = location.pathname !== '/';

  return (
    <ChakraProvider>
      <CartProvider>
        <SalesProvider>
          <Flex direction="column" height="100vh">
            {showHeader && <Header />} {/* Show Header here */}

            <Flex flex="1">
              {showSidebar && <Sidebar />} {/* Show Sidebar here */}
              <Box flex="1" p="5">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/sale" element={<Sales />} />
                  <Route path="/sales" element={<Totalsales />} />
                  <Route path="/cartT" element={<CartTotal />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/sell" element={<SellProduct />} />
                  <Route path="/products/active" element={<Products />} />
                  <Route path="/product/:id" element={<Product1 />} />
                  <Route path="/product/" element={<AddProducts />} />
                  <Route path="/delete/:id" element={<Deleteproduct />} />
                  <Route path="/edit/:id" element={<EditProduct />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/user" element={<AddUser />} />
                  <Route path="/user/:id" element={<EditUser />} />
                  <Route path="/deleteuser/:id" element={<DeleteUser />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/dashboard" element={<DashboardCards />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/category/:category_id" element={<CategoryDetails />} />
                  <Route path="/edit-category/:id" element={<EditCategory />} />
                  <Route path="/delete-category/:id" element={<DeleteCategory />} />
                  <Route path="/add-category" element={<AddCategory/>} />
                  <Route path="/reports" element={<Reports/>} />
                </Routes>
              </Box>
            </Flex>
          </Flex>
        </SalesProvider>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
