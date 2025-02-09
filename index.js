const recipesData = [
  {
      "id": 1,
      "title": "Pancakes",
      "ingredients": [
          "2 cups Flour",
          "2 Eggs",
          "1.5 cups Milk",
          "2 tbsp Sugar",
          "1 tbsp Baking powder",
          "1/2 tsp Salt"
      ],
      "instructions": "In a large bowl, whisk together the flour, sugar, baking powder, and salt. In another bowl, beat the eggs and then whisk in the milk. Pour the wet mixture into the dry ingredients and mix until combined. Heat a griddle or large skillet over medium heat. Pour 1/4 cup batter for each pancake onto the griddle. Cook until bubbles form on the surface, then flip and cook until golden brown.",
      "category": "Breakfast",
      "tags": ["easy", "quick"],
      "favorite": true},
  {
      "id": 2,
      "title": "Spaghetti Carbonara",
      "ingredients": [
          "200g Spaghetti",
          "100g Pancetta",
          "2 large Eggs",
          "50g Pecorino cheese",
          "50g Parmesan cheese",
          "2 cloves Garlic",
          "Salt",
          "Black Pepper"
      ],
      "instructions": "Cook the spaghetti in a large pot of salted boiling water until al dente. Meanwhile, heat the pancetta in a large skillet over medium heat until crispy. Add the garlic and cook for 1 minute. Beat the eggs in a bowl, then mix in the grated cheeses. Drain the spaghetti, reserving some of the cooking water. Add the pasta to the skillet with the pancetta and garlic, remove from heat, and quickly mix in the egg and cheese mixture, adding reserved pasta water as needed to create a creamy sauce. Season with salt and pepper to taste.",
      "category": "Dinner",
      "tags": ["Italian", "comfort food"],
      "favorite": false},
  {
      "id": 3,
      "title": "Chicken Caesar Salad",
      "ingredients": [
          "2 Chicken breasts",
          "1 Romaine lettuce",
          "1/2 cup Caesar dressing",
          "1/4 cup Parmesan cheese",
          "1 cup Croutons",
          "Salt",
          "Black Pepper",
          "Olive oil"
      ],
      "instructions": "Season the chicken breasts with salt and pepper. Heat a skillet over medium heat with olive oil and cook the chicken until golden brown and cooked through. Let the chicken rest, then slice it into strips. Chop the romaine lettuce and place it in a large bowl. Add the Caesar dressing, Parmesan cheese, croutons, and chicken strips. Toss to combine and serve immediately.",
      "category": "Lunch",
      "tags": ["healthy", "quick"],
      "favorite": true},
  {
      "id": 4,
      "title": "Chocolate Chip Cookies",
      "ingredients": [
          "2 1/4 cups All-purpose flour",
          "1/2 tsp Baking soda",
          "1 cup Unsalted butter, melted",
          "1/2 cup White sugar",
          "1 cup Brown sugar",
          "1 tbsp Vanilla extract",
          "1/2 tsp Salt",
          "2 large Eggs",
          "2 cups Semisweet chocolate chips"
      ],
      "instructions": "Preheat the oven to 350°F (175°C). In a medium bowl, whisk together the flour and baking soda. In a large bowl, mix the melted butter, white sugar, and brown sugar until smooth. Beat in the vanilla, salt, and eggs until well combined. Gradually add the flour mixture to the wet ingredients until just blended. Stir in the chocolate chips. Drop by rounded tablespoon onto ungreased baking sheets. Bake for 10-12 minutes, or until the edges are lightly browned. Cool on baking sheets for a few minutes, then transfer to wire racks to cool completely.",
      "category": "Dessert",
      "tags": ["sweet", "baking"],
      "favorite": false},
  {
      "id": 5,
      "title": "Guacamole",
      "ingredients": [
          "3 Avocados",
          "1 Lime, juiced",
          "1 tsp Salt",
          "1/2 cup Diced onion",
          "3 tbsp Chopped fresh cilantro",
          "2 Roma tomatoes, diced",
          "1 tsp Minced garlic",
          "1 pinch Ground cayenne pepper"
      ],
      "instructions": "In a medium bowl, mash together the avocados, lime juice, and salt. Mix in the onion, cilantro, tomatoes, and garlic. Stir in cayenne pepper. Refrigerate 1 hour for best flavor, or serve immediately.",
      "category": "Appetizer",
      "tags": ["Mexican", "dip"],
      "favorite": true}
]
if (!localStorage.getItem("recipes")) {
  localStorage.setItem("recipes", JSON.stringify(recipesData));
}

let recipes = JSON.parse(localStorage.getItem("recipes"));

const recipeContainer = document.getElementById("recipes");
const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("FilterCategory");
const sortTitleBtn = document.getElementById("sortTitle");
const showFavoritesBtn = document.getElementById("ShowFavourites");

// Function to Display Recipes
function displayRecipes(recipeList) {
  recipeContainer.innerHTML = "";
  recipeList.forEach(recipe => {
    const div = document.createElement("div");
    div.classList.add("recipe");
    div.innerHTML = `
      <h2>${recipe.title} ${recipe.favorite ? "❤" : ""}</h2>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <button onclick="toggleFavorite(${recipe.id})">Favorite</button>
      <button onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;
    recipeContainer.appendChild(div);
  });
}

// Search Function
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(searchValue) ||
    r.ingredients.some(ing => ing.toLowerCase().includes(searchValue))
  );
  displayRecipes(filteredRecipes);
});

// Filter by Category
filterCategory.addEventListener("change", () => {
  const category = filterCategory.value;
  const filteredRecipes = category ? recipes.filter(r => r.category === category) : recipes;
  displayRecipes(filteredRecipes);
});

// Sort by Title
sortTitleBtn.addEventListener("click", () => {
  recipes.sort((a, b) => a.title.localeCompare(b.title));
  displayRecipes(recipes);
});

// Show Only Favorites
showFavoritesBtn.addEventListener("click", () => {
  const favorites = recipes.filter(r => r.favorite);
  displayRecipes(favorites);
});

// Toggle Favorite
function toggleFavorite(id) {
  recipes = recipes.map(recipe => recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  displayRecipes(recipes);
}

// Delete Recipe
function deleteRecipe(id) {
  recipes = recipes.filter(recipe => recipe.id !== id);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  displayRecipes(recipes);
}

// Initial Display
displayRecipes(recipes);