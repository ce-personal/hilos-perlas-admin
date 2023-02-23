import axios from 'axios';
import env from './../__mocks__/env';

export const postCreateNewPart = async (value) => {
    const formData = new FormData();

    for (const key in value) {
        formData.append(key, value[key]);
    }


    var response = await axios.post(`${env.API_URL}/Part/PostCreateNewPart`, formData);    
    await updateFilePart(response.data.id, value.stringFileMain, true);
    await updateFilePart(response.data.id, value.stringFileSecondary, false);


    return response;
};


export const updateFilePart = async (partId, fileString, isMain) => {
    const formData = new FormData();
    formData.append("partId", partId);
    formData.append("fileString", fileString);
    formData.append("isMain", isMain);

    await axios.post(`${env.API_URL}/Part/PostUploadFileByPart`, formData);
};


export const getListPartByStep = async (stepPart) => {
    const response = await axios.get(`${env.API_URL}/Part/GetListPartByStep?stepPart=${stepPart}`);
    return response;
};

export const deletePartByPartId = async (partId) => {
    const response = await axios.delete(`${env.API_URL}/Part/DeletePartByPartId?partId=${partId}`);
    return response.data;
};