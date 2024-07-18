import { Flex, Box, Text, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';


export const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
      };

    return (
        <Flex justifyContent="space-between" alignItems="center" p={0.1} bg="gray.200" paddingRight={9} >
            <Box>
            </Box>
            <Menu>
                <MenuButton as={Flex} alignItems="center" cursor="pointer">
                    <IconButton icon={<FaUser />} variant="link" aria-label="Profile" />
                </MenuButton>            <MenuList>
                    <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>logout </MenuItem>


                    <MenuDivider />
                </MenuList>
            </Menu>
        </Flex>
    );
};
