
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box, Button, TextField } from '@mui/material';

const initialShelters = [
  {
    name: "Hope Shelter",
    description: "Temporary housing for families",
    details: "Open 24/7, includes food and basic amenities",
    image: "https://example.com/hope-shelter.jpg",
    location: "123 Main Street, Cityville",
    capacity: "50 people"
  },
  {
    name: "Safe Haven",
    description: "Emergency shelter for women and children",
    details: "Provides counseling and secure accommodation",
    image: "https://example.com/safe-haven.jpg",
    location: "456 Elm Street, Townsville",
    capacity: "30 people"
  }
];

const Shelter = () => {
  const [shelters, setShelters] = useState(initialShelters);
  const [newShelter, setNewShelter] = useState({
    name: "",
    description: "",
    details: "",
    image: "",
    location: "",
    capacity: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedShelter, setEditedShelter] = useState(null);

  // Handle change for the new shelter form
  const handleNewChange = (event) => {
    const { name, value } = event.target;
    setNewShelter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new shelter
  const handleAddNewShelter = () => {
    if (newShelter.name && newShelter.description && newShelter.location) {
      setShelters((prev) => [...prev, newShelter]);
      setNewShelter({
        name: "",
        description: "",
        details: "",
        image: "",
        location: "",
        capacity: ""
      });
    } else {
      alert("Please fill in all required fields (Name, Description, Location)");
    }
  };

  // Handle edit button click
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedShelter({ ...shelters[index] });
  };

  // Handle change in the edit form
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedShelter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save after editing
  const handleSaveEdit = () => {
    const updatedShelters = [...shelters];
    updatedShelters[editingIndex] = editedShelter;
    setShelters(updatedShelters);
    setEditingIndex(null);
    setEditedShelter(null);
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedShelter(null);
  };

  // Handle deleting a shelter
  const handleDeleteShelter = (index) => {
    const updatedShelters = shelters.filter((_, i) => i !== index);
    setShelters(updatedShelters);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Manage Shelter Information
      </Typography>

      {/* Form for adding a new shelter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add a New Shelter
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={newShelter.name}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newShelter.description}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Details"
          name="details"
          value={newShelter.details}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          name="image"
          value={newShelter.image}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          name="location"
          value={newShelter.location}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Capacity"
          name="capacity"
          value={newShelter.capacity}
          onChange={handleNewChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddNewShelter} sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}>
          Add Shelter
        </Button>
      </Box>

      <Grid container spacing={3}>
        {shelters.map((shelter, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
              {editingIndex === index ? (
                // Edit form
                <Box>
                  <TextField
                    label="Name"
                    name="name"
                    value={editedShelter.name}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={editedShelter.description}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Details"
                    name="details"
                    value={editedShelter.details}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Image URL"
                    name="image"
                    value={editedShelter.image}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={editedShelter.location}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Capacity"
                    name="capacity"
                    value={editedShelter.capacity}
                    onChange={handleEditChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" color="primary" onClick={handleSaveEdit} sx={{ mr: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={handleCancelEdit} sx={{ borderColor: '#1976d2', color: '#1976d2', '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#115293', color: '#115293' } }}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                // Display shelter information with edit and delete buttons
                <Box>
                  <Avatar
                    variant="square"
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                    src={shelter.image}
                    alt={shelter.name}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {shelter.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {shelter.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {shelter.details}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {shelter.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Capacity: {shelter.capacity}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleEditClick(index)} 
                      sx={{ 
                        mr: 2,
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        fontWeight: 'bold',
                        '&:hover': { 
                          backgroundColor: '#e3f2fd', 
                          borderColor: '#115293',
                          color: '#115293'
                        }
                      }}
                    >
                      ✎ Edit
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => handleDeleteShelter(index)}
                      sx={{ 
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        fontWeight: 'bold',
                        '&:hover': { 
                          backgroundColor: '#b71c1c'
                        }
                      }}
                    >
                      ✕ Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shelter;

