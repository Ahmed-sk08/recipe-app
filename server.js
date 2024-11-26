const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

const RECIPES_FILE = './data/recipes.json';

// Get recipes
app.get('/recipes', (req, res) => {
  fs.readFile(RECIPES_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading recipes file');
    }
    const recipes = JSON.parse(data);
    res.json(recipes);
  });
});

// Add recipe
app.post('/recipes', (req, res) => {
  fs.readFile(RECIPES_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading recipes file');
    }
    const recipes = JSON.parse(data);
    recipes.push(req.body);
    fs.writeFile(RECIPES_FILE, JSON.stringify(recipes, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing recipes file');
      }
      res.status(201).send('Recipe added');
    });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});