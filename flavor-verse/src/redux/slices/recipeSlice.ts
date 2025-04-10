import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRecipes, addRecipe, updateRecipe, deleteRecipe } from '../../services/recipeService';


export interface Step {
  title: string;
  instructions: string[];
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  isFavorite: boolean;
  userId: number;
  ingredients: string[];
  steps: Step[];
}

interface RecipeState {
  recipes: Recipe[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  status: 'idle',
  error: null,
};


export const getRecipes = createAsyncThunk<Recipe[]>('recipes/getRecipes', async () => {
  const response = await fetchRecipes();
  return response;
});

export const createRecipe = createAsyncThunk<Recipe, Omit<Recipe, 'id' | 'rating' | 'isFavorite' | 'userId'>>(
  'recipes/createRecipe',
  async (recipe) => {
    const response = await addRecipe(recipe);
    return response;
  }
);

export const editRecipe = createAsyncThunk<Recipe, { id: number; recipe: Partial<Recipe> }>(
  'recipes/editRecipe',
  async ({ id, recipe }) => {
    const response = await updateRecipe(id, recipe);
    return response;
  }
);

export const removeRecipe = createAsyncThunk<number, number>('recipes/removeRecipe', async (id) => {
  await deleteRecipe(id);
  return id;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const recipe = state.recipes.find((r) => r.id === action.payload);
      if (recipe) recipe.isFavorite = !recipe.isFavorite;
    },
    updateRating(state, action: PayloadAction<{ id: number; rating: number }>) {
      const { id, rating } = action.payload;
      const recipe = state.recipes.find((r) => r.id === id);
      if (recipe) recipe.rating = rating;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.recipes[index] = action.payload;
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      });
  },
});

export const { toggleFavorite, updateRating } = recipeSlice.actions;
export default recipeSlice.reducer;