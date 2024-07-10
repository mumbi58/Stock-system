import React from "react";
import { Stat, StatLabel, StatNumber, Card, Box, SimpleGrid, Heading,CardBody,Text } from "@chakra-ui/react";
import useFetchSalesData from "../Hooks/fetchsales";
import { useNavigate } from "react-router-dom";

const TotalSales = () => {
    const navigate = useNavigate()

    const handleSalesClick = () => {
        navigate('/cartT')

        console.log("card clicked");
    }
    const salesData = useFetchSalesData();

    const totalSales = salesData.reduce((total, sale) => {
        Object.keys(sale).forEach((key) => {
            if (!isNaN(key)) {
                let price;

                if (typeof sale[key].price === "string") {
                    const priceString = sale[key].price;
                    const cleanedPriceString = priceString.replace(/[^\d.-]/g, "");
                    price = parseFloat(cleanedPriceString);
                } else {
                    price = sale[key].price;
                }

                if (!isNaN(price)) {
                    total += price * sale[key].quantity;
                } else {
                    console.error(
                        `Invalid price format for sale with key ${key}: ${sale[key].price}`
                    );
                }
            }
        });
        return total;
    }, 0);


    return (
      
        <Card   bg="blue.100" p={5} borderRadius="md" boxShadow="md" cursor="pointer" onClick={handleSalesClick}>
        <CardBody>
          <Text>Total sales Today</Text>
          <Text>{totalSales}</Text>

        </CardBody>
      </Card>
    );

};

export default TotalSales;