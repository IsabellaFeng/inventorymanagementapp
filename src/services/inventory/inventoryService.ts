import axiosInstance from '../api/index';
import { AxiosResponse } from 'axios';
import { CreateIngredientRequest } from '../../interface/InventoryTypes';

export const fetchIngredients = async (): Promise<any[]> => {
    try {
        const response: AxiosResponse<any[]> = await axiosInstance.get('/Admin/Ingredients');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch ingredients:', error);
        throw error;
    }
};

export const createIngredient = async (ingredientData: CreateIngredientRequest): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axiosInstance.post('/Admin/Ingredients', ingredientData);
        return response.data;
    } catch (error) {
        console.error('Failed to create ingredient:', error);
        throw error;
    }
};
