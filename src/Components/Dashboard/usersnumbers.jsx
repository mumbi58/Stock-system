import Fetchuser from "../Hooks/fetchuser"
import { Box, Heading, Stat, StatNumber, StatLabel, VStack } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

export default function UsersTotal() {
    const users = Fetchuser()
    const Total = users.length
    const navigate = useNavigate()
    console.log(users);


    const handleuser = () => {
        navigate('/users')


    }
    return (
        <Box bg="yellow.100" p={10} borderRadius="md" boxShadow="md" cursor="pointer" onClick={handleuser} >

            
                <Icon as={FaUser} boxSize={4} /> 
                {Total}
                
            <Stat>


                <StatNumber></StatNumber>

                <StatLabel>Number of users</StatLabel>


            </Stat>

        </Box>
    )
}
