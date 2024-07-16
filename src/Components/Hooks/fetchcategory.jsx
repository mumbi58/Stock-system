
import { useState, useEffect } from 'react';

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/category');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();


                setCategories(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useFetchCategories;
