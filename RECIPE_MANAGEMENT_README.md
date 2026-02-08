# Recipe Management System - Implementation Guide

## Overview

Complete Recipe Management system with frontend and backend integration for the Family Bakery application.

## Features Implemented

### ✅ Backend

- **Models Enhanced:**
  - `Recipe` - Complete recipe entity with timestamps
  - `Ingredient` - Enhanced with unit, unitPrice, active status
  - `RecipeIngredient` - Junction table for recipe-ingredient relationships

- **REST API Endpoints:**
  - `GET /api/recipes` - Get all recipes
  - `GET /api/recipes/active` - Get only active recipes
  - `GET /api/recipes/{id}` - Get single recipe with ingredients
  - `POST /api/recipes` - Create new recipe
  - `PUT /api/recipes/{id}` - Update recipe
  - `DELETE /api/recipes/{id}` - Delete recipe
  - `POST /api/recipes/{recipeId}/ingredients` - Add ingredient to recipe
  - `DELETE /api/recipes/{recipeId}/ingredients/{ingredientId}` - Remove ingredient

  - `GET /api/ingredients` - Get all ingredients
  - `GET /api/ingredients/active` - Get only active ingredients
  - `GET /api/ingredients/{id}` - Get single ingredient
  - `POST /api/ingredients` - Create ingredient
  - `PUT /api/ingredients/{id}` - Update ingredient
  - `DELETE /api/ingredients/{id}` - Delete ingredient

### ✅ Frontend

#### Pages Created:

1. **RecipesList** (`/recipes`)
   - Display all recipes in a table
   - Quick view of recipe details (category, yield, total weight, ingredients count)
   - Active/Inactive status indicator
   - Actions: Edit, Delete
   - Create new recipe button

2. **RecipeDetail** (`/recipes/new` & `/recipes/:id`)
   - Create/Edit recipe form
   - Fields: Name, Category, Description, Flour Weight, Total Weight, Bread Yield, Unit, Active Status
   - **Ingredient Management:**
     - Add ingredients with amount and unit
     - View all ingredients in the recipe
     - Remove ingredients
     - Dialog-based ingredient selection

3. **IngredientsManager** (`/ingredients`)
   - Manage all ingredients
   - Create, Read, Update, Delete (CRUD) operations
   - Inline editing with dialog
   - Active/Inactive toggle
   - Display unit and unit price

#### Services:

- **recipeAPI.ts** - Centralized API service for recipe and ingredient endpoints
  - Typed interfaces for data
  - Promise-based API calls using axios

#### Routing:

- Protected routes using Permission system
- Role-based access control integrated
- Default navigation to `/recipes`

## How to Use

### Creating a Recipe:

1. Navigate to `/recipes`
2. Click "New Recipe"
3. Fill in recipe details (name, category, description, etc.)
4. Click "Add Ingredient" to add ingredients
5. Select ingredient, amount, and unit
6. Click "Save Recipe"

### Managing Ingredients:

1. Navigate to `/ingredients`
2. Click "New Ingredient" or click "Edit" on existing one
3. Fill in ingredient details (name, unit, unit price)
4. Toggle Active/Inactive status
5. Click "Save"

### Editing a Recipe:

1. Go to `/recipes`
2. Click "Edit" on the recipe
3. Modify details and ingredients
4. Click "Save Recipe"

## Project Structure

```
bakery-frontend/
├── src/
│   ├── pages/
│   │   ├── recipes/
│   │   │   ├── RecipesList.tsx
│   │   │   ├── RecipeDetail.tsx
│   │   │   └── IngredientsManager.tsx
│   ├── services/
│   │   └── recipeAPI.ts
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── roles.ts
│   ├── App.tsx (Updated with routing)
│   └── ...

bakery-backend/
├── src/
│   ├── controller/
│   │   ├── RecipeController.java
│   │   └── IngredientController.java
│   ├── model/
│   │   └── ingredient/
│   │       ├── Recipe.java
│   │       ├── Ingredient.java
│   │       └── RecipeIngredient.java
│   ├── dto/
│   │   └── ingredient/
│   │       ├── RecipeDTO.java
│   │       ├── IngredientDTO.java
│   │       └── RecipeIngredientDTO.java
│   ├── repository/
│   │   ├── RecipeRepository.java
│   │   └── IngredientRepository.java
│   └── ...
```

## Dependencies Added

- `react-router-dom` - Client-side routing
- `@mui/icons-material` - Material-UI icons
- `axios` - HTTP client (already installed)
- `@mui/material` - UI components (already installed)

## Next Steps

### Backend Enhancements Needed:

1. Database migration script to create tables
2. Exception handling and validation
3. Add search/filter endpoints
4. Add pagination for large datasets

### Frontend Enhancements:

1. Add loading states for images/icons
2. Implement search and filter functionality
3. Add bulk actions (delete multiple recipes)
4. Recipe duplication feature
5. Export/Import recipes as JSON/CSV
6. Recipe templates/categories

### Testing:

1. Unit tests for API services
2. Component tests for pages
3. Integration tests for full workflow

### Performance:

1. Implement caching for ingredients list
2. Lazy loading for recipes table
3. Pagination for large recipe lists

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all recipes
curl http://localhost:8080/api/recipes

# Create a new recipe
curl -X POST http://localhost:8080/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"name":"Baguette","category":"French","flourWeight":500,"breadYield":4,"unit":"PIECE","totalWeight":600,"active":true}'

# Create an ingredient
curl -X POST http://localhost:8080/api/ingredients \
  -H "Content-Type: application/json" \
  -d '{"name":"Flour","unit":"KG","unitPrice":2.50,"active":true}'
```

## Notes

- CORS is configured for `http://localhost:5173` (Vite dev server)
- Permissions use the RBAC system for access control
- All timestamps are managed automatically on the backend
- Frontend handles optimistic UI updates where appropriate
