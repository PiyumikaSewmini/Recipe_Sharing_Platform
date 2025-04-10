import creamyChicken from '../../../assets/Recipie_images/Creamy Garlic Parmesan Chicken.jpg';
import pizza from '../../../assets/Recipie_images/pizza.jpg';
import lemonRice from '../../../assets/Recipie_images/One-Pot Lemon Herb Rice & Veggies.jpg';
import beefChili from '../../../assets/Recipie_images/Homestyle Beef & Bean Chili.jpg';
import { CollectionRecipe } from './CollectionRecipeCard';

// Recipe datas
export const recipeData: CollectionRecipe[] = [
  {
    id: 1,
    title: 'Creamy Garlic Parmesan Chicken',
    description: 'Tender chicken breasts smothered in a creamy garlic and Parmesan sauce - quick and easy meal of the week!',
    image: creamyChicken,
    rating: 4.3
  },
  {
    id: 2,
    title: 'Classic Margherita Pizza',
    description: 'Simple yet delicious! Pizza topped with fresh tomatoes, melty mozzarella, and fresh basil.',
    image: pizza,
    rating: 4.8
  },
  {
    id: 3,
    title: 'One-Pot Lemon Herb Rice & Veggies',
    description: 'Rice, herbs, and veggies with bright lemon - quick and healthy one-pot recipe!',
    image: lemonRice,
    rating: 4.4
  },
  {
    id: 4,
    title: 'Homestyle Beef & Bean Chili',
    description: 'Hearty, flavorful, and comforting - perfect for chilly days! Slow-cooked beef with beans for extra flavor.',
    image: beefChili,
    rating: 4.6
  }
];
