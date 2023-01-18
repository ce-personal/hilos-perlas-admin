import axios from 'axios';
import env from './../__mocks__/env';

import Router from 'next/router';


export const getListCategory = async () => {
    const response = await axios.get(`${env.API_URL}/Category/GetListCategory`);
    return response.data;
};


export const postNewCategory = async (value) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }


    await axios.post(`${env.API_URL}/Category/Create`, formData);
    Router.push("/Category");
};

export const getCategory = async (categoryId) => {
    const response = await axios.get(`${env.API_URL}/Category/GetCategoryById?categoryId=${categoryId}`);
    return response.data;  
};


export const postEditCategory = async (value) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }


    await axios.put(`${env.API_URL}/Category/Edit`, formData);
    Router.push("/Category");
};


export const postDeleteCategory = async (categoryId) => {
    const isConfirmed = confirm("¿Estás seguro que deseas borrar esta categoría?");
    if (!isConfirmed) return;

    const response =await axios.delete(`${env.API_URL}/Category/Delete?categoryId=${categoryId}`);
    return response.status;
};