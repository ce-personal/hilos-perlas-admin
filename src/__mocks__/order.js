import axios from 'axios';
import env from './../__mocks__/env';

export const getListOrder = async () => {
    const response = await axios.get(`${env.API_URL}/Order/GetListOrder`);
    return response.data;
};

export const getOrderByOrderId = async (orderId) => {
    const response = await axios.get(`${env.API_URL}/Order/GetOrderByOrderId?orderId=${orderId}`);
    return response.data;
};

export const postNextStepOrderByOrderId = async (orderId) => {
    const response = await axios.post(`${env.API_URL}/Order/NextStepOrderByOrderId?orderId=${orderId}`);
    return response.status;
};





export const orderStatus = ["Solicitado", "Aceptado", "En producción", "Terminado"];
export const orderStatusNumber = ["Solicitado", "Aceptado", "En producción", "Terminado"];
export const orderColor = ['#3F51B5', '#e53935', '#FB8C00', '#52da94'];

export const getListButtonByOrder = (order) => {
    switch (order.status) {
        case 0:
            return {
                text: "Aceptar",
                callback: () => window.updateOrderLine(order.id)
            }            
        
        case 1:
            return {
                text: "Trabajar",
                callback: () => window.updateOrderLine(order.id)
            }

        case 2: 
            return {
                text: "Finalizado",
                callback: () => window.updateOrderLine(order.id)
            }
        
        default: return null; 
    }
};