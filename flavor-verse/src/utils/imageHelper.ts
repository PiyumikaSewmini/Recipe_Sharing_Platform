// src/utils/imageHelper.ts
import creamyGarlicChicken from '../assets/Recipie_images/Creamy Garlic Parmesan Chicken.jpg';
import margheritaPizza from '../assets/Recipie_images/pizza.jpg';
import lemonHerbRice from '../assets/Recipie_images/One-Pot Lemon Herb Rice & Veggies.jpg';
import beefBeanChili from '../assets/Recipie_images/Homestyle Beef & Bean Chili.jpg';
import mushroomRisotto from '../assets/Recipie_images/mushroom-risotto.jpg';
import stuffedPeppers from '../assets/Recipie_images/stuffed-peppers.jpg';
import thaiCurrySoup from '../assets/Recipie_images/thai-curry-soup.jpg';
import honeyGarlicSalmon from '../assets/Recipie_images/honey-garlic-salmon.jpg';

export const getImagePath = (imagePath: string): string => {
  // If it's a data URL, return it directly
  if (imagePath.startsWith('data:image')) return imagePath;
  
  // Map static image paths
  if (imagePath.includes('creamy-garlic-chicken')) return creamyGarlicChicken;
  if (imagePath.includes('margherita-pizza')) return margheritaPizza;
  if (imagePath.includes('lemon-herb-rice')) return lemonHerbRice;
  if (imagePath.includes('beef-bean-chili')) return beefBeanChili;
  if (imagePath.includes('mushroom-risotto')) return mushroomRisotto;
  if (imagePath.includes('stuffed-peppers')) return stuffedPeppers;
  if (imagePath.includes('thai-curry-soup')) return thaiCurrySoup;
  if (imagePath.includes('honey-garlic-salmon')) return honeyGarlicSalmon;
  
  return 'https://via.placeholder.com/300x200?text=Food+Image';
};