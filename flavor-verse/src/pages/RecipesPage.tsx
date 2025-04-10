import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/layout/Navbar';
import RecipeDetail from '../components/recipe/RecipeDetail/RecipeDetail';
import RecipeForm from '../components/recipe/RecipeForm/RecipeForm';
import RecipeListControls from '../components/recipe/RecipeListControls';
import RecipeList from '../components/recipe/RecipeList';
import { getRecipes, createRecipe, editRecipe, removeRecipe } from '../redux/slices/recipeSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Recipe } from '../redux/slices/recipeSlice';
import CustomButton from '../components/common/Button';
import { useTheme } from '../contexts/ThemeContext';

const RecipesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);
  const { isDarkMode, themeColors } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTimer, setActiveTimer] = useState<{ step: number; remaining: number } | null>(null);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editRecipeData, setEditRecipeData] = useState<Recipe | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRecipes());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (activeTimer && activeTimer.remaining > 0) {
      const timer = setTimeout(() => {
        setActiveTimer({ ...activeTimer, remaining: activeTimer.remaining - 1 });
      }, 1000);
      setTimerId(timer);
      return () => clearTimeout(timer);
    } else if (activeTimer && activeTimer.remaining === 0) {
      alert('Timer finished!');
      setActiveTimer(null);
    }
  }, [activeTimer]);

  const startTimer = (minutes: number, step: number) => {
    if (activeTimer && timerId) clearTimeout(timerId);
    setActiveTimer({ step, remaining: minutes * 60 });
  };

  const stopTimer = () => {
    if (timerId) clearTimeout(timerId);
    setActiveTimer(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const viewRecipe = (id: number) => {
    setSelectedRecipe(id);
    setCurrentStep(1);
    setShowForm(false);
  };

  const goBack = () => {
    setSelectedRecipe(null);
    stopTimer();
    setShowForm(false);
    setEditRecipeData(null);
  };

  const toggleFavoritesView = () => setShowFavorites(!showFavorites);

  const handleAddRecipe = (recipe: Omit<Recipe, 'id' | 'rating' | 'isFavorite' | 'userId'>) => {
    dispatch(createRecipe(recipe));
    setShowForm(false);
  };

  const handleEditRecipe = (recipe: Partial<Recipe>) => {
    if (editRecipeData) {
      dispatch(editRecipe({ id: editRecipeData.id, recipe }));
      setShowForm(false);
      setEditRecipeData(null);
    }
  };

  const handleDeleteRecipe = (id: number) => {
    dispatch(removeRecipe(id));
  };

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return showFavorites ? recipe.isFavorite && matchesSearch : matchesSearch;
  });

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: isDarkMode ? themeColors.background : '#f5f5f5', 
      color: themeColors.text,
      pb: 5 
    }}>
      <Navbar activeTab="recipes" />

      {showForm ? (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <RecipeForm
            onSubmit={editRecipeData ? handleEditRecipe : handleAddRecipe}
            initialData={editRecipeData}
            onCancel={goBack}
          />
        </Container>
      ) : selectedRecipe ? (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <RecipeDetail
            recipe={recipes.find((r) => r.id === selectedRecipe)!}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            activeTimer={activeTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            onBack={goBack}
          />
        </Container>
      ) : (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <RecipeListControls
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            showFavorites={showFavorites}
            onToggleFavorites={toggleFavoritesView}
          />

          <RecipeList
            recipes={filteredRecipes}
            onViewRecipe={viewRecipe}
            onEditRecipe={(recipe) => {
              setEditRecipeData(recipe);
              setShowForm(true);
            }}
            onDeleteRecipe={handleDeleteRecipe}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CustomButton
              startIcon={<AddIcon />}
              onClick={() => {
                setEditRecipeData(null);
                setShowForm(true);
              }}
              buttonColor={isDarkMode ? "#4CAF50" : "#2A472A"}
              sx={{ 
                borderRadius: '25px', 
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 'medium',
                color: '#ffffff'
              }}
            >
              Add New Recipe
            </CustomButton>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default RecipesPage;