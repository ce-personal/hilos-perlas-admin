import axios from 'axios';
import env from './../__mocks__/env';

export const getInformationForBudget = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetInformationForBudget`);
    return response.data;
};