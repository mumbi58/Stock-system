import useFetchProducts from '../Hooks/fetchproduct'
import { Box, Heading, Stat, StatNumber, StatLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';



export default function ProductNo() {
    const { products, error } = useFetchProducts()
    const navigate = useNavigate()
    const productNo = products.length
    console.log(productNo);
    if (error) {
        return <Box>Error fetching products: {error.message}</Box>;
    }

    const handleProduct = () => {
        navigate('/products')

    }

    return (
        <Box bg="green.100" p={8} borderRadius="md" boxShadow="md" cursor="pointer" onClick={handleProduct}>
            <Icon as={FaShoppingCart} boxSize={4} />
            <Stat>
                <StatNumber>{productNo}</StatNumber>


                <StatLabel>Number of products</StatLabel>


            </Stat>

        </Box>
    )
}
