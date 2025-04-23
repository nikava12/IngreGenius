// Cached DOM Elements
const recipeForm = document.getElementById("recipe-form");
const ingredientInput = document.getElementById("ingredient-input");
const resultsDiv = document.getElementById("results");
const loadingSpinner = document.createElement("div");
loadingSpinner.className = "loading";

// Sample Data (could be moved to a separate JSON file)
const recipes = [ /* ... */ ];

// Debounce Function (for future real-time search)
function debounce(func, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// Find Matching Recipes
function findRecipes() {
  const input = ingredientInput.value.trim();
  resultsDiv.innerHTML = '';

  if (!input) {
    showError("Please enter at least one ingredient.");
    return;
  }

  // Show loading spinner
  loadingSpinner.textContent = "Searching recipes...";
  loadingSpinner.classList.add("active");
  resultsDiv.appendChild(loadingSpinner);

  // Simulate API delay (remove in production)
  setTimeout(() => {
    const userIngredients = input.split(",").map(item => item.trim().toLowerCase());
    const matchingRecipes = recipes.filter(recipe => 
      recipe.ingredients.some(ing => 
        userIngredients.some(ui => ing.toLowerCase().includes(ui))
    );

    displayResults(matchingRecipes, userIngredients);
    loadingSpinner.classList.remove("active");
  }, 500);
}

// Display Results
function displayResults(recipes, userIngredients) {
  if (recipes.length === 0) {
    showError("No recipes found. Try adding more ingredients.");
    return;
  }

  resultsDiv.innerHTML = recipes.map(recipe => {
    const provided = recipe.ingredients.filter(ing => 
      userIngredients.some(ui => ing.toLowerCase().includes(ui))
    );
    const additional = recipe.ingredients.filter(ing => 
      !userIngredients.some(ui => ing.toLowerCase().includes(ui))
    );

    return `
      <article class="recipe-card">
        <h3>${recipe.title}</h3>
        <p><strong>You have:</strong> ${provided.join(", ")}</p>
        ${additional.length ? `<p><strong>Add:</strong> ${additional.join(", ")}</p>` : ""}
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join("")}</ol>
      </article>
    `;
  }).join("");
}

// Event Listeners
recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  findRecipes();
});