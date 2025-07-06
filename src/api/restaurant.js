import axios from 'axios';

const BASE_URL = 'https://stg.tdh.start-tech.ae/api/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant';
const MENU_ID = '2da6c53a-522d-485d-b77c-2fafd601ff0c';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories/${MENU_ID}`, {
            headers: {
                Accept: 'application/json',
                lang: 'en',
            },
        });

        const categories = response.data?.data?.categories;
        return Array.isArray(categories) ? categories : [];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

export const fetchItemsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${MENU_ID}?cat=${categoryId}`, {
            headers: {
                Accept: 'application/json',
                lang: 'en',
            },
        });

        const items = response.data?.data?.items?.data;
        return Array.isArray(items) ? items : [];
    } catch (error) {
        console.error('Failed to fetch items:', error);
        throw error;
    }
};
