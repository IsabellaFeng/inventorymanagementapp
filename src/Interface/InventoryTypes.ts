export interface Ingredients {
    ingredientId: number;
    name: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    lastUpdatedAt?: string;
}

export type CreateIngredientRequest = Omit<Ingredients, 'ingredientId'>;