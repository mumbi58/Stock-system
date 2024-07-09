// hooks/useFetchSalesData.js
import { useState, useEffect } from "react";

const useFetchSalesData = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("http://localhost:8000/sales");
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchData();
  }, []);

  return salesData;
};

export default useFetchSalesData;
