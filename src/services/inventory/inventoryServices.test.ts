
import axiosInstance from '../api/index';
import { fetchIngredients, createIngredient } from './inventoryService';
import { CreateIngredientRequest } from '../../interface/InventoryTypes';

// Mock the axiosInstance
jest.mock('../api/index');

describe('inventory API functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchIngredients', () => {
        it('fetches ingredients successfully', async () => {
            const mockIngredients = [
                { id: 1, name: 'Sugar', unit: 'kg', quantity: 10, unitPrice: 5 },
            ];

            (axiosInstance.get as jest.Mock).mockResolvedValue({
                data: mockIngredients,
            });

            const result = await fetchIngredients();
            expect(result).toEqual(mockIngredients);
            expect(axiosInstance.get).toHaveBeenCalledWith('/Admin/Ingredients');
        });

        it('handles error while fetching ingredients', async () => {
            const mockError = new Error('Network Error');
            (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

            await expect(fetchIngredients()).rejects.toThrow(mockError);
            expect(axiosInstance.get).toHaveBeenCalledWith('/Admin/Ingredients');
        });
    });

    describe('createIngredient', () => {
        it('creates an ingredient successfully', async () => {
            const mockIngredientData: CreateIngredientRequest = {
                name: 'Pepper',
                unit: 'g',
                quantity: 100,
                unitPrice: 0.5,
            };
            const mockResponse = { id: 3, ...mockIngredientData };

            (axiosInstance.post as jest.Mock).mockResolvedValue({
                data: mockResponse,
            });

            const result = await createIngredient(mockIngredientData);
            expect(result).toEqual(mockResponse);
            expect(axiosInstance.post).toHaveBeenCalledWith('/Admin/Ingredients', mockIngredientData);
        });

        it('handles error while creating an ingredient', async () => {
            const mockIngredientData: CreateIngredientRequest = {
                name: 'Pepper',
                unit: 'g',
                quantity: 100,
                unitPrice: 0.5,
            };
            const mockError = new Error('Network Error');
            (axiosInstance.post as jest.Mock).mockRejectedValue(mockError);

            await expect(createIngredient(mockIngredientData)).rejects.toThrow(mockError);
            expect(axiosInstance.post).toHaveBeenCalledWith('/Admin/Ingredients', mockIngredientData);
        });
    });
})