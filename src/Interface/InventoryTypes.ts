export interface Ingredient {
    ingredientId: number;
    name: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    lastUpdatedAt?: string;
}

export interface IngredientForm {
    name: string;
    unit: string;
    quantity: number;
    unitPrice: number;
}

export type CreateIngredientRequest = Omit<Ingredient, 'ingredientId'>;