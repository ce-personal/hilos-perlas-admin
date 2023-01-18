import axios from 'axios';
import env from './../__mocks__/env';
import { v4 as uuid } from 'uuid';

export const getCustomers = async () => {
    const response = await axios.get(`${env.API_URL}/UserAdmin/GetListUserAdmin`);
    return response.data;
};