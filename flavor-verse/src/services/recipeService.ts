// src/services/recipeService.ts
import { Recipe, NewRecipeInput } from '../types/recipe';

const MOCK_USER_ID = 1;

let recipesDB: Recipe[] = [
  {
    id: 1,
    title: 'Creamy Garlic Parmesan Chicken',
    description: 'Tender chicken breasts simmered in a rich, garlicky parmesan cream sauce – comfort food at its finest.',
    image: '/images/creamy-garlic-chicken.jpg',
    rating: 4.1,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '4 boneless, skinless chicken breasts',
      '2 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 cup heavy cream',
      '1/2 cup grated parmesan cheese',
      '1 tsp Italian seasoning',
      'Salt and pepper to taste',
    ],
    steps: [
      {
        title: 'Prepare the Chicken',
        instructions: [
          'Season chicken breasts with salt, pepper, and Italian seasoning on both sides.',
          'Heat olive oil in a large skillet over medium-high heat.',
          'Cook chicken for 5-6 minutes per side until golden brown and cooked through.',
          'Remove chicken from the pan and set aside.',
        ],
      },
      {
        title: 'Make the Sauce',
        instructions: [
          'In the same skillet, add minced garlic and sauté for 1 minute until fragrant.',
          'Pour in the heavy cream and bring to a simmer.',
          'Add parmesan cheese and stir until melted and sauce begins to thicken.',
          'Season with salt and pepper to taste.',
        ],
      },
      {
        title: 'Combine and Serve',
        instructions: [
          'Return chicken to the skillet and spoon sauce over the top.',
          'Simmer for 2-3 minutes until chicken is reheated and coated in sauce.',
          'Garnish with additional parmesan and chopped parsley if desired.',
          'Serve immediately with pasta or vegetables.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Classic Margherita Pizza',
    description: 'A simple yet timeless favorite topped with fresh basil, melted mozzarella, and vibrant tomato sauce.',
    image: '/images/margherita-pizza.jpg',
    rating: 4.4,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      'Pizza dough (homemade or store-bought)',
      '2 cups shredded mozzarella (or sliced fresh mozzarella)',
      '1/2 cup tomato sauce',
      '1 tbsp olive oil',
      '6-8 fresh basil leaves',
      'Salt to taste',
    ],
    steps: [
      {
        title: 'Prepare the Dough',
        instructions: [
          'In a bowl, mix warm water, yeast, and sugar. Let sit for 5 minutes until foaming.',
          'Add flour, salt, and olive oil. Mix until combined and knead to a soft dough.',
          'Cover with a damp cloth and let rise in a warm place for 1-1.5 hours or until doubled in size.',
        ],
      },
      {
        title: 'Make the Sauce',
        instructions: [
          'In a small pan, heat olive oil and sauté garlic for 30 seconds.',
          'Add crushed tomatoes, salt, and optional oregano/basil.',
          'Simmer for 10-15 minutes until slightly thickened. Let it cool.',
        ],
      },
      {
        title: 'Preheat and Shape the Dough',
        instructions: [
          'Preheat your oven to 475°F/245°C. If using a pizza stone, heat it too.',
          'Punch down the dough, then roll or stretch into a round pizza shape.',
          'Place on a baking tray or pizza peel with parchment paper if needed.',
        ],
      },
      {
        title: 'Assemble the Pizza',
        instructions: [
          'Spread a thin layer of tomato sauce over the base.',
          'Tear mozzarella into pieces and distribute evenly.',
          'Add a few fresh basil leaves.',
          'Drizzle a little olive oil on top.',
        ],
      },
      {
        title: 'Bake',
        instructions: [
          'Bake for 10-15 minutes or until crust is golden and cheese is bubbling.',
          '(Optional) Broil for 1-2 minutes for extra crisp and browning.',
        ],
      },
      {
        title: 'Serve',
        instructions: [
          'Add a few more fresh basil leaves.',
          'Slice and enjoy your homemade Margherita pizza!',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'One-Pot Lemon Herb Rice & Veggies',
    description: 'Light, zesty, and packed with wholesome veggies – a quick and healthy one-pot wonder.',
    image: '/images/lemon-herb-rice.jpg',
    rating: 4.1,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '1 cup basmati rice, rinsed',
      '2 cups vegetable broth',
      '1 zucchini, diced',
      '1 bell pepper, diced',
      '1 cup cherry tomatoes, halved',
      '1 lemon (juice and zest)',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tsp dried herbs (thyme, oregano, basil mix)',
      'Salt and pepper to taste',
      '1/4 cup chopped fresh herbs (parsley, basil)',
    ],
    steps: [
      {
        title: 'Prepare Ingredients',
        instructions: [
          'Rinse rice until water runs clear.',
          'Chop all vegetables into even-sized pieces.',
          'Mince garlic and prepare herbs.',
        ],
      },
      {
        title: 'Cook Base',
        instructions: [
          'Heat olive oil in a large pot over medium heat.',
          'Add garlic and sauté for 30 seconds until fragrant.',
          'Add diced bell pepper and zucchini, cook for 3-4 minutes until slightly softened.',
        ],
      },
      {
        title: 'Add Rice and Liquids',
        instructions: [
          'Add rinsed rice to the pot and stir to coat with oil for about 1 minute.',
          'Pour in vegetable broth, lemon juice, and zest.',
          'Add dried herbs, salt, and pepper. Bring to a boil.',
        ],
      },
      {
        title: 'Simmer and Finish',
        instructions: [
          'Reduce heat to low, cover, and simmer for 15 minutes.',
          'Add cherry tomatoes on top (without stirring), cover again and cook for 5 more minutes.',
          'Remove from heat and let sit covered for 5 minutes to steam.',
          'Fluff with a fork and gently fold in fresh herbs before serving.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Homestyle Beef & Bean Chili',
    description: 'Hearty, flavorful, and slow-cooked to perfection – the ultimate cozy bowl for chilly days.',
    image: '/images/beef-bean-chili.jpg',
    rating: 4.7,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '1 lb ground beef',
      '1 onion, diced',
      '2 bell peppers, diced',
      '3 cloves garlic, minced',
      '2 cans (15 oz each) kidney beans, drained',
      '1 can (28 oz) crushed tomatoes',
      '2 cups beef broth',
      '2 tbsp chili powder',
      '1 tbsp cumin',
      '1 tsp oregano',
      '1/2 tsp cayenne pepper (optional)',
      'Salt and pepper to taste',
      'Optional toppings: sour cream, shredded cheese, green onions, cilantro',
    ],
    steps: [
      {
        title: 'Brown the Meat',
        instructions: [
          'Heat a large pot or Dutch oven over medium-high heat.',
          'Add ground beef and cook until browned, breaking it into crumbles.',
          'Drain excess fat if needed, leaving about 1 tablespoon in the pot.',
        ],
      },
      {
        title: 'Cook Aromatics',
        instructions: [
          'Add diced onions and bell peppers to the pot with the beef.',
          'Cook for 5-7 minutes until vegetables soften.',
          'Add minced garlic and cook for another minute until fragrant.',
        ],
      },
      {
        title: 'Add Spices',
        instructions: [
          'Stir in chili powder, cumin, oregano, cayenne (if using), salt, and pepper.',
          'Cook for 1 minute to toast the spices and release their flavors.',
        ],
      },
      {
        title: 'Simmer',
        instructions: [
          'Add crushed tomatoes, beef broth, and kidney beans.',
          'Bring to a boil, then reduce heat to low.',
          'Simmer uncovered for at least 30 minutes (or up to 2 hours for deeper flavor), stirring occasionally.',
          'Add more broth if the chili becomes too thick.',
        ],
      },
      {
        title: 'Serve',
        instructions: [
          'Taste and adjust seasonings if needed.',
          'Serve hot in bowls with your choice of toppings.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Mediterranean Stuffed Bell Peppers',
    description: 'Colorful bell peppers filled with a savory mixture of quinoa, feta, and sun-dried tomatoes.',
    image: '/images/stuffed-peppers.jpg',
    rating: 4.3,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '4 large bell peppers (mixed colors)',
      '1 cup quinoa, rinsed',
      '2 cups vegetable broth',
      '1/2 cup crumbled feta cheese',
      '1/4 cup sun-dried tomatoes, chopped',
      '1/2 cup kalamata olives, pitted and sliced',
      '2 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tsp dried oregano',
      '1/2 tsp smoked paprika',
      'Salt and pepper to taste',
      'Fresh parsley for garnish',
    ],
    steps: [
      {
        title: 'Prepare Peppers',
        instructions: [
          'Preheat oven to 375°F (190°C).',
          'Cut tops off peppers and remove seeds/membranes.',
          'Lightly brush outside with olive oil and place in baking dish.',
        ],
      },
      {
        title: 'Cook Quinoa',
        instructions: [
          'In a saucepan, bring vegetable broth to a boil.',
          'Add quinoa, reduce heat to low, cover and simmer for 15 minutes.',
          'Remove from heat and let stand for 5 minutes, then fluff with fork.',
        ],
      },
      {
        title: 'Prepare Filling',
        instructions: [
          'Heat olive oil in skillet over medium heat.',
          'Add garlic and sauté for 30 seconds until fragrant.',
          'Add sun-dried tomatoes, olives, oregano, and paprika. Cook for 2 minutes.',
          'Combine with cooked quinoa and feta cheese. Season with salt and pepper.',
        ],
      },
      {
        title: 'Stuff and Bake',
        instructions: [
          'Spoon filling into prepared peppers.',
          'Cover dish with foil and bake for 25 minutes.',
          'Remove foil and bake for additional 10 minutes until peppers are tender.',
          'Garnish with fresh parsley before serving.',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Thai Coconut Curry Soup',
    description: 'Aromatic and creamy soup with the perfect balance of spicy, sweet, and tangy flavors.',
    image: '/images/thai-curry-soup.jpg',
    rating: 4.6,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '1 tbsp coconut oil',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, grated',
      '2 tbsp red curry paste',
      '1 can (13.5 oz) coconut milk',
      '4 cups chicken or vegetable broth',
      '1 lb chicken breast, thinly sliced (or tofu for vegetarian)',
      '1 red bell pepper, sliced',
      '8 oz mushrooms, sliced',
      '2 tbsp fish sauce (or soy sauce for vegetarian)',
      '1 tbsp brown sugar',
      '2 tbsp lime juice',
      'Fresh cilantro and lime wedges for serving',
    ],
    steps: [
      {
        title: 'Sauté Aromatics',
        instructions: [
          'Heat coconut oil in large pot over medium heat.',
          'Add onion and cook until softened, about 3 minutes.',
          'Add garlic, ginger, and curry paste. Cook for 1 minute until fragrant.',
        ],
      },
      {
        title: 'Build Soup Base',
        instructions: [
          'Pour in coconut milk and broth, stirring to combine.',
          'Bring to a gentle simmer.',
        ],
      },
      {
        title: 'Add Protein and Vegetables',
        instructions: [
          'Add chicken (or tofu), bell pepper, and mushrooms.',
          'Simmer for 10-12 minutes until chicken is cooked through.',
        ],
      },
      {
        title: 'Season and Serve',
        instructions: [
          'Stir in fish sauce, brown sugar, and lime juice.',
          'Taste and adjust seasoning if needed.',
          'Serve hot garnished with cilantro and lime wedges.',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Honey Garlic Glazed Salmon',
    description: 'Perfectly cooked salmon with a sticky-sweet glaze that caramelizes beautifully under the broiler.',
    image: '/images/honey-garlic-salmon.jpg',
    rating: 4.8,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1/4 cup honey',
      '3 tbsp soy sauce',
      '2 tbsp lemon juice',
      '4 cloves garlic, minced',
      '1 tsp grated ginger',
      '1/2 tsp red pepper flakes',
      '1 tbsp olive oil',
      'Sesame seeds and green onions for garnish',
    ],
    steps: [
      {
        title: 'Prepare Glaze',
        instructions: [
          'In small bowl, whisk together honey, soy sauce, lemon juice, garlic, ginger, and red pepper flakes.',
        ],
      },
      {
        title: 'Cook Salmon',
        instructions: [
          'Heat olive oil in oven-proof skillet over medium-high heat.',
          'Season salmon fillets with salt and pepper.',
          'Sear salmon skin-side down for 3 minutes until crispy.',
          'Flip and cook for 1 minute on other side.',
        ],
      },
      {
        title: 'Glaze and Finish',
        instructions: [
          'Pour glaze over salmon, coating evenly.',
          'Transfer skillet to broiler and cook for 2-3 minutes until glaze caramelizes.',
          'Watch carefully to prevent burning.',
          'Garnish with sesame seeds and green onions before serving.',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Mushroom Risotto with Truffle Oil',
    description: 'Creamy, luxurious risotto with earthy mushrooms and a drizzle of truffle oil for elegance.',
    image: '/images/mushroom-risotto.jpg',
    rating: 4.5,
    isFavorite: false,
    userId: MOCK_USER_ID,
    ingredients: [
      '6 cups chicken or vegetable broth',
      '2 tbsp olive oil',
      '1 shallot, finely diced',
      '2 cloves garlic, minced',
      '1 1/2 cups Arborio rice',
      '1/2 cup dry white wine',
      '12 oz mixed mushrooms (cremini, shiitake, oyster), sliced',
      '2 tbsp butter',
      '1/2 cup grated Parmesan cheese',
      '2 tbsp fresh parsley, chopped',
      '1 tbsp truffle oil (optional but recommended)',
      'Salt and pepper to taste',
    ],
    steps: [
      {
        title: 'Prepare Broth',
        instructions: [
          'Heat broth in saucepan and keep warm on low heat.',
        ],
      },
      {
        title: 'Cook Mushrooms',
        instructions: [
          'Heat 1 tbsp olive oil in large skillet over medium-high heat.',
          'Add mushrooms and cook until browned and tender, about 5-7 minutes.',
          'Season with salt and pepper, then remove from pan and set aside.',
        ],
      },
      {
        title: 'Start Risotto',
        instructions: [
          'In same pan, heat remaining olive oil and butter over medium heat.',
          'Add shallot and cook until translucent, about 3 minutes.',
          'Add garlic and cook for 30 seconds until fragrant.',
          'Add rice and stir to coat, toasting for 2 minutes.',
        ],
      },
      {
        title: 'Build Risotto',
        instructions: [
          'Pour in wine and stir until absorbed.',
          'Add warm broth 1/2 cup at a time, stirring frequently and waiting until liquid is absorbed before adding more.',
          'Continue until rice is creamy and al dente (about 18-20 minutes total).',
        ],
      },
      {
        title: 'Finish and Serve',
        instructions: [
          'Stir in cooked mushrooms, Parmesan, and parsley.',
          'Season with salt and pepper to taste.',
          'Drizzle with truffle oil before serving.',
        ],
      },
    ],
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchRecipes = async (): Promise<Recipe[]> => {
  await delay(500);
  return [...recipesDB];
};

export const addRecipe = async (recipe: NewRecipeInput): Promise<Recipe> => {
  await delay(500);
  const newRecipe: Recipe = {
    ...recipe,
    id: recipesDB.length + 1,
    rating: 0,
    isFavorite: false,
    userId: MOCK_USER_ID,
  };
  recipesDB.push(newRecipe);
  return newRecipe;
};

export const updateRecipe = async (id: number, recipe: Partial<Recipe>): Promise<Recipe> => {
  await delay(500);
  const index = recipesDB.findIndex((r) => r.id === id);
  if (index !== -1 && recipesDB[index].userId === MOCK_USER_ID) {
    recipesDB[index] = { ...recipesDB[index], ...recipe };
    return recipesDB[index];
  }
  throw new Error('Recipe not found or not authorized');
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await delay(500);
  const index = recipesDB.findIndex((r) => r.id === id);
  if (index !== -1 && recipesDB[index].userId === MOCK_USER_ID) {
    recipesDB.splice(index, 1);
    return;
  }
  throw new Error('Recipe not found or not authorized');
};