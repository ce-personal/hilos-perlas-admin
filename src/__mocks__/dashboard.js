import axios from 'axios';
import env from './../__mocks__/env';

export const getInformationForBudget = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetInformationForBudget`);
    return response.data;
};

export const getCountOrderByWeek = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetCountOrderByWeek`);
    return response.data;
};

export const getPorcentageByOrder = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetInfoByOrderInWeek`);
    return response.data;
};

export const getListOfBestSellers = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetListOfBestSellers`);
    return response.data;
};

export const getLastestOrder = async () => {
    const response = await axios.get(`${env.API_URL}/Dashboard/GetLastestOrder`);
    return response.data;
};