import axios from 'axios';
import env from './../__mocks__/env';



export const getProfileById = async (profileId) => {
    const response = await axios.get(`${env.API_URL}/Account/GetProfileById?userAdminId=${profileId}`);
    return response.data;
};

