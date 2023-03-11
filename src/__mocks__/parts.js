import axios from 'axios';
import env from './../__mocks__/env';

export const postCreateNewPart = async (value, part) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }


    const formDataFile = new FormData();
    formDataFile.append("stringFile", value.stringFileMain);
    formDataFile.append("isItMainFile", true);

    const file = await axios.post(`${env.API_URL}/File/Create`, formDataFile);
    formData.append("mainFileId", file.data.id);
    
    var response = await axios.post(`${env.API_URL}/Part/PostCreateNewPart`, formData);    
    return response.data;
};


export const postCreateFile = async (value) => {
    const formData = new FormData();
    formData.append("stringFile", value.stringFile);
    formData.append("isItMainFile", 'true');
    

    const file = await axios.post(`${env.API_URL}/File/Create`, formData);
    return file.data;
};

export const postCreatePartFile = async (value) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }

    const file = await axios.post(`${env.API_URL}/Part/PostUploadFilePartByPartId`, formData);
    return file.data
};


export const getListPartByStep = async (stepPart) => {
    const response = await axios.get(`${env.API_URL}/Part/GetListPartByStep?stepPart=${stepPart}`);
    return response;
};

export const deletePartByPartId = async (partId) => {
    const response = await axios.delete(`${env.API_URL}/Part/DeletePartByPartId?partId=${partId}`);
    return response.data;
};