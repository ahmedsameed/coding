import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent, CardMedia,
  Container, Grid, Box, Avatar, Paper, Rating, TextField, Menu, MenuItem, List, ListItem, ListItemText
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import FoodWaste from './FoodWaste';
import AlternativeFoodWaste from './AlternativeFoodWaste'; 

import Home from './Home';
import RestaurantDetail from './RestaurantDetail';
import MakeRecipe from './MakeRecipe';
import ChickenTikka from './ChickenTikka';
import Hummus from './Hummus';
import ChickenShawarma from './ChickenShawarma';
import Maqlouba from './Maqlouba';
import ZaatarPie from './ZaatarPie';
import FishAndChips from './FishAndChips';
import CreateRecipe from './CreateRecipe';
import Login from './Login';
import Signup from './Signup';
import Location1 from './Location1';
import Shelter from './add-shelter'

const initialRestaurants = [
  {
    name: "AL-Baik",
    description: "Fried Chicken · $$ · 0.6 miles away",
    details: "Best Muslim restaurant in Jeddah",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Al_Baik_Logo.svg/1200px-Al_Baik_Logo.svg.png",
    rating: 4.5,
    userRatings: 100, 
    isFavorite: false
  },
  {
    name: "Uncle Kebab",
    description: "BBQ · $$ · 1.2 miles away",
    details: "Best halal kebab",
    image: "https://kebabuncle.com/wp-content/uploads/2020/02/KebabUncle-logo.jpg",
    rating: 4.0,
    userRatings: 50,
    isFavorite: false
  }
];

const App = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(
    initialRestaurants.filter((restaurant) => restaurant.isFavorite)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [userRating, setUserRating] = useState(restaurants.map(() => null));
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    handleMenuClose();
  };

  // Use a high-contrast palette that's more distinguishable for common forms of color blindness
  // (replaces purple/orange accents with a strong blue + neutral backgrounds)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2', contrastText: '#ffffff', dark: '#115293' }, // accessible blue
      secondary: { main: '#009688', contrastText: '#ffffff', dark: '#00675b' }, // teal for highlights
      background: { default: darkMode ? '#121212' : '#f4f4f4', paper: darkMode ? '#333' : '#ffffff' },
      text: { primary: darkMode ? '#ffffff' : '#000000', secondary: darkMode ? '#bbbbbb' : '#555555' },
    },
    typography: { allVariants: { color: darkMode ? '#ffffff' : '#000000' } },
  });

  const toggleFavorite = (index, event) => {
    event.stopPropagation();
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[index].isFavorite = !updatedRestaurants[index].isFavorite;
    setRestaurants(updatedRestaurants);
    setFavoriteRestaurants(updatedRestaurants.filter((restaurant) => restaurant.isFavorite));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRatingChange = (newRating, index, event) => {
    event.stopPropagation();
    const updatedRestaurants = [...restaurants];
    const totalRatings = updatedRestaurants[index].userRatings + 1;
    const newAverageRating =
      (updatedRestaurants[index].rating * updatedRestaurants[index].userRatings + newRating) /
      totalRatings;

    updatedRestaurants[index].rating = parseFloat(newAverageRating.toFixed(1));
    updatedRestaurants[index].userRatings = totalRatings;
    setRestaurants(updatedRestaurants);

    const updatedUserRating = [...userRating];
    updatedUserRating[index] = newRating;
    setUserRating(updatedUserRating);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut(auth);
  };
  // Route Protection Wrapper
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          {/* Sidebar for favorite restaurants */}
          <Box
            sx={{
              width: { xs: 70, sm: 200 },
              height: '100vh',
              // neutral, light background to avoid washed-out pinks for color-blind users
              backgroundColor: darkMode ? '#333' : '#f7fafc',
              display: 'flex',
              flexDirection: 'column',
              py: 4,
              position: 'fixed',
              top: 0,
              left: 0,
              overflow: 'auto',
              boxShadow: '3px 0px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>
              Favorites
            </Typography>
            <List>
              {favoriteRestaurants.map((restaurant, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={`/restaurant/${index}`}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    },
                    border: restaurant.isFavorite ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    transition: 'background-color 0.3s, border 0.3s',
                  }}
                >
                  <ListItemText primary={restaurant.name} sx={{ color: darkMode ? 'white' : 'black', fontWeight: restaurant.isFavorite ? 'bold' : 'normal' }} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Main Content Area */}
          <Box
            sx={{
              flexGrow: 1,
              px: { xs: 2, sm: 3 },
              py: 4,
              marginLeft: { xs: '70px', sm: '200px' },
              mt: 8,
              backgroundColor: darkMode ? '#222' : '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {/* Top Navigation Bar */}
            <AppBar
              position="fixed"
              elevation={0}
              sx={{
                // use a neutral/light AppBar background for better contrast and to avoid purple/pink hues
                backgroundColor: darkMode ? '#444' : '#f7fafc',
                borderBottom: '1px solid #e0e0e0',
                width: '100%',
                top: 0,
                zIndex: 1000,
                height: '64px',
                px: { xs: 1, sm: 3 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
                <IconButton edge="start" aria-label="menu">
                  <MenuIcon sx={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1, color: darkMode ? 'white' : 'black', cursor: 'pointer', fontWeight: 'bold' }}>
                    Halal-Restaurant Finder
                  </Typography>
                </Link>

                <Link to="/make-recipe" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: darkMode ? 'white' : 'black', textTransform: 'none', fontWeight: 'bold' }}> Famous recipes</Button>
                </Link>

                

                <TextField
                  variant="outlined"
                  placeholder="Search"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ mr: 2, width: 200, color: darkMode ? 'white' : 'black' }}
                  InputProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                />

                <Button 
                  color="primary"
                  component={Link}
                  to="/location1"
                  sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
                >
                  Location
                </Button>

                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <TuneIcon sx={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={toggleDarkMode}>
                    Toggle Dark Mode
                  </MenuItem>
                </Menu>

                {currentUser ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body1" sx={{ color: darkMode ? 'white' : 'black' }}>
                      Welcome, {currentUser.email}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        px: 2.5,
                        py: 1,
                        background: darkMode
                          ? 'linear-gradient(135deg, #ab47bc, #8e24aa)'
                          : 'linear-gradient(135deg, #8e24aa, #ab47bc)',
                        boxShadow: darkMode
                          ? '0 3px 8px rgba(171,71,188,0.4)'
                          : '0 3px 8px rgba(142,36,170,0.3)',
                        color: '#fff',
                        '&:hover': {
                          background: darkMode
                            ? 'linear-gradient(135deg, #ba68c8, #9c27b0)'
                            : 'linear-gradient(135deg, #9c27b0, #ba68c8)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Modern Login */}
                    <Button
                      component={Link}
                      to="/login"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        px: 2.5,
                        py: 1,
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(255,255,255,0.4)' : '#b39ddb',
                        background: darkMode
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                          : 'linear-gradient(135deg, #ffffff, #f3e5f5)',
                        color: darkMode ? '#fff' : '#6a1b9a',
                        '&:hover': {
                          background: darkMode
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
                            : 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      Login
                    </Button>

                    {/* Stylish Sign Up */}
                    <Button
                      component={Link}
                      to="/signup"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        px: 2.8,
                        py: 1,
                        background: darkMode
                          ? 'linear-gradient(135deg, #ab47bc, #8e24aa)'
                          : 'linear-gradient(135deg, #8e24aa, #ab47bc)',
                        boxShadow: darkMode
                          ? '0 3px 8px rgba(171,71,188,0.4)'
                          : '0 3px 8px rgba(142,36,170,0.3)',
                        color: '#fff',
                        '&:hover': {
                          background: darkMode
                            ? 'linear-gradient(135deg, #ba68c8, #9c27b0)'
                            : 'linear-gradient(135deg, #9c27b0, #ba68c8)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Toolbar>
            </AppBar>

            <Routes>
              {/* New Home Page Route */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              
             
              <Route
                path="/dashboard"
                element={
                  <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 }, mt: 8 }}>
                    {/* Main Content Section */}
                    <Card elevation={1} sx={{ borderRadius: 4, overflow: 'hidden', mb: 4 }}>
                      <CardMedia
                        component="img"
                        image="/logo.png"  
                        alt="Halal Restaurants"
                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                      <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
                        <Typography variant="h3" fontWeight="bold">
                          Halal Restaurants
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} /> 20 restaurants nearby
                        </Typography>
                      </CardContent>
                    </Card>

                    <Grid container spacing={3}>
                      {filteredRestaurants.map((restaurant, index) => (
                        <Grid item xs={12} key={index}>
                          <Paper
                            elevation={3}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              borderRadius: 4,
                              transition: '0.3s',
                              '&:hover': { boxShadow: 6 },
                              backgroundColor: darkMode ? '#333' : '#fff',
                            }}
                          >
                            <Avatar
                              variant="square"
                              sx={{ width: 80, height: 80, marginRight: 2 }}
                              src={restaurant.image}
                              alt={restaurant.name}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight="bold" sx={{ color: darkMode ? 'white' : 'black' }}>
                                {restaurant.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {restaurant.description}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {restaurant.details}
                              </Typography>

                              <Rating
                                name={`user-rating-${index}`}
                                value={userRating[index]}
                                onChange={(event, newValue) => handleRatingChange(newValue, index, event)}
                                sx={{ mt: 1, color: darkMode ? 'white' : 'black' }}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                onClick={(event) => toggleFavorite(index, event)}
                                color="primary"
                                // use the primary (blue) color for active favorites so they remain visible under color-blind sims
                                sx={{ color: restaurant.isFavorite ? theme.palette.primary.main : 'gray', border: restaurant.isFavorite ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent', borderRadius: '50%' }}
                              >
                                {restaurant.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Container>
                }
              />

              <Route path="/chicken-tikka" element={<ChickenTikka />} />
  <Route path="/fish-and-chips" element={<FishAndChips />} />
  <Route path="/maqlouba" element={<Maqlouba />} />
  <Route path="/chicken-shawarma" element={<ChickenShawarma />} />
  <Route path="/hummus" element={<Hummus />} />
  <Route path="/zaatar-pie" element={<ZaatarPie />} />

  {/* Other existing routes
  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
  <Route path="/location1" element={<Location1 />} />
  <Route path="/make-recipe" element={<MakeRecipe />} />
  <Route path="/create-recipe" element={<CreateRecipe />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/food-waste" element={<FoodWaste />} />
  <Route path="/Alternative" element={<AlternativeFoodWaste />} /> */}
  
  
  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

  <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

  <Route path="/make-recipe" element={<ProtectedRoute><MakeRecipe /></ProtectedRoute>} />
  <Route path="/create-recipe" element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>} />
  <Route path="/food-waste" element={<ProtectedRoute><FoodWaste /></ProtectedRoute>} />
  <Route path="Alternative" element={<ProtectedRoute><AlternativeFoodWaste /></ProtectedRoute>} />
  <Route path="/Shelter" element={<ProtectedRoute><Shelter /></ProtectedRoute>} />
  <Route path="/location1" element={<ProtectedRoute><Location1 /></ProtectedRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
  <Route path="/food-waste" element={<ProtectedRoute><FoodWaste /></ProtectedRoute>} />






            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
