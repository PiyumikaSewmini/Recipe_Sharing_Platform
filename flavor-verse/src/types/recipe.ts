export interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
    isFavorite: boolean;
    userId: number;
    ingredients: string[];
    steps: RecipeStep[];
  }
  
  export interface RecipeStep {
    title: string;
    instructions: string[];
  }
  
  export type NewRecipeInput = Omit<Recipe, 'id' | 'rating' | 'isFavorite' | 'userId'>;