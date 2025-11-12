import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';

const FoodWaste = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [shelters, setShelters] = useState([]);

  const sampleShelters = {
    "Denton": [
      {
        name: "Monsignor King Outreach Center",
        address: "909 N Loop 288, Denton, TX 76209",
        googleMapLink: "https://www.google.com/maps?q=Monsignor+King+Outreach+Center,+909+N+Loop+288,+Denton,+TX+76209"
      },
      {
        name: "Giving Grace",
        address: "306 N Loop 288, Denton, TX 76209",
        googleMapLink: "https://www.google.com/maps?q=Giving+Grace,+306+N+Loop+288,+Denton,+TX+76209"
      }
    ],
    "Dallas": [
      {
        name: "Promise House Inc",
        address: "224 W Page Ave, Dallas, TX 75208",
        googleMapLink: "https://www.google.com/maps?q=Promise+House+Inc,+224+W+Page+Ave,+Dallas,+TX+75208"
      },
      {
        name: "The Bridge Homeless Recovery Center",
        address: "1818 Corsicana St, Dallas, TX 75201",
        googleMapLink: "https://www.google.com/maps?q=1818+Corsicana+St,+Dallas,+TX+75201"
      }
    ],
    "Fort Worth": [
      {
        name: "Presbyterian Night Shelter",
        address: "2400 Cypress St, Fort Worth, TX 76102",
        googleMapLink: "https://www.google.com/maps?q=2400+Cypress+St,+Fort+Worth,+TX+76102"
      },
      {
        name: "The Morris Foundation Women & Children's Center",
        address: "2320 Poplar St, Fort Worth, TX 76102",
        googleMapLink: "https://www.google.com/maps?q=2320+Poplar+St,+Fort+Worth,+TX+76102"
      }
    ]
  };

  useEffect(() => {
    setShelters(sampleShelters[city] || []);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const quotes = [
    {
      text: "Reducing food waste is not only a responsibility, but it’s also an opportunity for positive change.",
      author: "Liz Goodwin"
    },
    {
      text: "Food waste is not only an environmental tragedy but also an economic one.",
      author: "Selina Juul"
    }
  ];

  const QuoteBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    // use theme surface so it remains visible under color-blind sims
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'dark' ? 'none' : theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
  }));

  const QuoteText = styled(Typography)(({ theme }) => ({
    fontStyle: 'italic',
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
  }));

  const QuoteAuthor = styled(Typography)(({ theme }) => ({
    textAlign: 'right',
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ p: 3, textAlign: 'left', backgroundColor: 'background.paper', color: 'text.primary' }}>
      <Typography variant="h3" gutterBottom>Food Waste</Typography>
      <Box sx={{ mb: 4 }}>
        {quotes.map((quote, index) => (
          <QuoteBox key={index}>
            <QuoteText>"{quote.text}"</QuoteText>
            <QuoteAuthor>– {quote.author}</QuoteAuthor>
          </QuoteBox>
        ))}
      </Box>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium', letterSpacing: '0.5px' }}>
        Find shelters in the DFW area where you can donate food
      </Typography>

      <Select
        value={city}
        onChange={handleCityChange}
        displayEmpty
        sx={{ width: 250, mb: 4, backgroundColor: 'background.paper', color: 'text.primary' }}
      >
        <MenuItem value="" disabled>Select a City</MenuItem>
        <MenuItem value="Denton">Denton</MenuItem>
        <MenuItem value="Dallas">Dallas</MenuItem>
        <MenuItem value="Fort Worth">Fort Worth</MenuItem>
      </Select>

      {shelters.length > 0 && (
        <List sx={{ mt: 3, maxWidth: 600, margin: '0 auto' }}>
          {shelters.map((shelter, index) => (
            <ListItem key={index} sx={{ mb: 2, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
              <ListItemText 
                primary={
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {shelter.name}
                  </Typography>
                } 
                secondary={
                  <a href={shelter.googleMapLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="textSecondary">
                      {shelter.address}
                    </Typography>
                  </a>
                } 
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Add Shelter Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/Shelter"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          Add Shelter
        </Button>
      </Box>
    </Box>
  );
};

export default FoodWaste;
