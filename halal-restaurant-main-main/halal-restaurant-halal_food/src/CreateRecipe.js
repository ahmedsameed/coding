import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import OpenAI from "openai";

const ingredientsData = [
  { id: 1, name: 'Apple', category: 'Fruits' },
  { id: 2, name: 'Banana', category: 'Fruits' },
  { id: 3, name: 'Orange', category: 'Fruits' },
  { id: 4, name: 'Strawberries', category: 'Fruits' },
  { id: 5, name: 'Grapes', category: 'Fruits' },
  { id: 6, name: 'Broccoli', category: 'Vegetables' },
  { id: 7, name: 'Carrots', category: 'Vegetables' },
  { id: 8, name: 'Spinach', category: 'Vegetables' },
  { id: 9, name: 'Bell Peppers', category: 'Vegetables' },
  { id: 10, name: 'Onions', category: 'Vegetables' },
  { id: 11, name: 'Chicken', category: 'Protein' },
  { id: 12, name: 'Beef', category: 'Protein' },
  { id: 13, name: 'Tofu', category: 'Protein' },
  { id: 14, name: 'Eggs', category: 'Protein' },
  { id: 15, name: 'Salmon', category: 'Protein' },
  { id: 16, name: 'Rice', category: 'Carbs' },
  { id: 17, name: 'Pasta', category: 'Carbs' },
  { id: 18, name: 'Bread', category: 'Carbs' },
  { id: 19, name: 'Quinoa', category: 'Carbs' },
  { id: 20, name: 'Potatoes', category: 'Carbs' },
  { id: 21, name: 'Basil', category: 'Herbs & Spices' },
  { id: 22, name: 'Oregano', category: 'Herbs & Spices' },
  { id: 23, name: 'Garlic', category: 'Herbs & Spices' },
  { id: 24, name: 'Ginger', category: 'Herbs & Spices' },
  { id: 25, name: 'Chili Powder', category: 'Herbs & Spices' },
  { id: 26, name: 'Milk', category: 'Dairy' },
  { id: 27, name: 'Cheese', category: 'Dairy' },
  { id: 28, name: 'Yogurt', category: 'Dairy' },
  { id: 29, name: 'Butter', category: 'Dairy' },
  { id: 30, name: 'Cream', category: 'Dairy' },
  { id: 31, name: 'Avocado Oil', category: 'Oils' },
  { id: 32, name: 'Vegetable Oil', category: 'Oils' },
  { id: 33, name: 'Olive Oil', category: 'Oils' },
  { id: 34, name: 'Mustard Oil', category: 'Oils' },
  { id: 35, name: 'Salt', category: 'Seasoning' },
  { id: 36, name: 'Black Pepper', category: 'Seasoning' },
  { id: 37, name: 'Garlic Powder', category: 'Seasoning' },
  { id: 38, name: 'Onion Powder', category: 'Seasoning' },
  { id: 39, name: 'Paprika', category: 'Seasoning' },
  { id: 40, name: 'Cumin', category: 'Seasoning' },
  { id: 41, name: 'Turmeric', category: 'Seasoning' },
];

const categories = ['All', 'Fruits', 'Vegetables', 'Protein', 'Carbs', 'Oils', 'Dairy', 'Seasoning'];

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

console.log('OpenAI API Key:', process.env.REACT_APP_OPENAI_API_KEY);


const CreateRecipe = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsToShow, setIngredientsToShow] = useState([]);
  const [recipes, setRecipes] = useState([]); // State to store API recipes

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient) ? prevSelected.filter((item) => item !== ingredient) : [...prevSelected, ingredient]
    );
  };

  const filteredIngredients = selectedCategory === 'All'
    ? ingredientsData
    : ingredientsData.filter((ingredient) => ingredient.category === selectedCategory);

  const handleShowIngredients = () => {
    setIngredientsToShow([...selectedIngredients]);
  };

  const handleGenerateRecipe = async () => {
    try {
      // Craft prompt using selected ingredients
      const prompt = `Create a recipe using the following ingredients: ${selectedIngredients.join(', ')}. Please include a title, ingredients list, and instructions.`;

      // Call OpenAI API to generate the recipe
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      });

      // Extract recipe text from response
      const recipeText = response.choices[0].message.content;
      setRecipes([recipeText]);  // Store the recipe text in the recipes state
    } catch (error) {
      console.error("Error fetching recipe from OpenAI:", error);
      alert("Failed to generate recipe. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Ingredients
      </Typography>

      {/* Category Filters */}
      <Box sx={{ mb: 2 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange(category)}
            sx={theme => ({
              mr: 1,
              mb: 1,
              color: selectedCategory === category
                ? '#fff'
                : theme.palette.mode === 'dark' ? '#e0e0e0' : '#222',
              backgroundColor: selectedCategory === category
                ? theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2'
                : 'transparent',
              borderColor: selectedCategory === category ? '#1976d2' : theme.palette.mode === 'dark' ? '#444' : '#e0e0e0',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: selectedCategory === category
                  ? theme.palette.mode === 'dark' ? '#115293' : '#115293'
                  : theme.palette.mode === 'dark' ? '#333' : '#e3f2fd',
                color: '#fff',
              },
            })}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Ingredients Grid */}
      <Grid container spacing={3}>
        {filteredIngredients.map((ingredient) => (
          <Grid item xs={6} sm={4} md={3} key={ingredient.id}>
            <Paper
              sx={theme => ({
                textAlign: 'center',
                padding: 2,
                cursor: 'pointer',
                backgroundColor: selectedIngredients.includes(ingredient.name)
                  ? '#1976d2'
                  : theme.palette.mode === 'dark' ? '#222' : 'white',
                color: selectedIngredients.includes(ingredient.name)
                  ? '#fff'
                  : theme.palette.mode === 'dark' ? '#e0e0e0' : 'black',
                border: selectedIngredients.includes(ingredient.name)
                  ? '3px solid #1976d2'
                  : theme.palette.mode === 'dark' ? '2px solid #444' : '2px solid #e0e0e0',
                fontWeight: selectedIngredients.includes(ingredient.name) ? 'bold' : 'normal',
                transition: 'background-color 0.3s, border 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: selectedIngredients.includes(ingredient.name)
                    ? '#115293'
                    : theme.palette.mode === 'dark' ? '#333' : '#e3f2fd',
                  color: selectedIngredients.includes(ingredient.name)
                    ? '#fff'
                    : theme.palette.mode === 'dark' ? '#fff' : 'black',
                },
              })}
              onClick={() => handleIngredientToggle(ingredient.name)}
            >
              <Typography variant="h6">{ingredient.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Show Selected Ingredients Button */}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleShowIngredients}
      >
        Show Selected Ingredients
      </Button>

      {/* Selected Ingredients */}
      {ingredientsToShow.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Selected Ingredients:</Typography>
          <Typography>
            {ingredientsToShow.join(', ')}
          </Typography>

          {/* Generate Recipe Button */}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleGenerateRecipe}
          >
            Generate Recipe
          </Button>
        </Box>
      )}

      {/* Display Generated Recipe */}
      {recipes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Generated Recipe:</Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography>{recipes[0]}</Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CreateRecipe;