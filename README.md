# FlavorVerse - Recipe Sharing Platform
A React-based recipe-sharing app with CRUD operations, favorites system, and mock user auth – built for a frontend intern assignment.
# Overview
FlavorVerse is a simplified recipe-sharing platform where users can:

Browse and search for recipes
Save favorites
Create, edit, or delete their own recipes
Sign in using mock authentication

# Features

🔁 Client-side routing with React Router
🌐 Global state with Redux Toolkit
🧪 CRUD operations via mock API
🎨 Styled with Material UI
💾 LocalStorage for mock auth and favorites

💡 Clean, scalable code structure

# How it Works
1. 🔐 Sign In Page
Users log in using email and password (mock auth stored in localStorage).


2. 🏠 Home Page
Landing page showcasing the app's purpose with top recipes.


3. 🍽️ Recipes Dashboard
Grid of recipes with search functionality. Users can favorite or add new recipes.


#  Functional Requirements
Recipe Feed with search

Recipe Detail with ingredients & steps

Mock Auth (Sign Up / Log In / Save recipes)

CRUD for Recipes (only by creator)

Favorites System

State Management with Redux

# Bonus (Optional) Features
⏲️ Cooking Timer
🌙 Dark Mode

# Folder Structure
src/
│
├── components/       // Reusable UI components
├── pages/            // Route pages (Home, Login, Recipes, etc.)
├── redux/            // Redux store, slices
├── utils/            // Helpers, constants
├── assets/           // Images, icons
└── App.tsx           // Main app component

# Tech Stack

React + TypeScript
Redux Toolkit
React Router
Material UI
Mock API / LocalStorage

# Getting Started
git clone https://github.com/PiyumikaSewmini/Recipe_Sharing_Platform.git
cd flavorverse
npm install
npm start

# Acknowledgements
Thanks to the creators of Material UI and Redux Toolkit.

# Contact
If you have questions or feedback, feel free to reach out!
