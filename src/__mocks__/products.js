import axios from 'axios';
import env from './../__mocks__/env';

export const getProducts = async () => {
    const response = await axios.get(`${env.API_URL}/Product/GetListProduct`);
    return response.data;
};