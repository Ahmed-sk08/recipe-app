// Fetch and display recipes
function fetchRecipes() {
  fetch('/recipes')
      .then(response => response.json())
      .then(recipes => {
          const container = document.getElementById('recipes-container');
          container.innerHTML = '';
          recipes.forEach(recipe => {
              const recipeDiv = document.createElement('div');
              recipeDiv.className = 'recipe';
              recipeDiv.innerHTML = `
                  <h2>${recipe.name}</h2>
                  <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                  <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                  <p><strong>Cooking Time:</strong> ${recipe.time} minutes</p>
                  <p><strong>Servings:</strong> ${recipe.servings}</p>
              `;
              container.appendChild(recipeDiv);
          });
      })
      .catch(error => console.error('Error fetching recipes:', error));
}

// Submit a new recipe
function submitRecipe(event) {
  event.preventDefault();
  const recipe = {
      name: document.getElementById('name').value,
      ingredients: document.getElementById('ingredients').value.split(',').map(item => item.trim()),
      instructions: document.getElementById('instructions').value,
      time: document.getElementById('time').value,
      servings: document.getElementById('servings').value
  };

  fetch('/recipes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
  })
  .then(response => {
      if (response.ok) {
          alert('Recipe added successfully!');
          document.getElementById('recipe-form').reset();
      } else {
          alert('Error adding recipe');
      }
  })
  .catch(error => console.error('Error submitting recipe:', error));
}

// Search recipes
function searchRecipes() {
  const query = document.getElementById('search').value.toLowerCase();
  const recipes = document.querySelectorAll('.recipe');
  recipes.forEach(recipe => {
      const name = recipe.querySelector('h2').textContent.toLowerCase();
      recipe.style.display = name.includes(query) ? 'block' : 'none';
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchRecipes);