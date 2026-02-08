import axios from "axios";

const API_BASE = "/api";

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  unitPrice: number;
  active: boolean;
}

export interface RecipeIngredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  flourWeight: number;
  breadYield: number;
  unit: string;
  totalWeight: number;
  category: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  ingredients: RecipeIngredient[];
}

// Ingredient API
export const ingredientAPI = {
  getAll: () => axios.get<Ingredient[]>(`${API_BASE}/ingredients`),
  getActive: () => axios.get<Ingredient[]>(`${API_BASE}/ingredients/active`),
  getById: (id: number) =>
    axios.get<Ingredient>(`${API_BASE}/ingredients/${id}`),
  create: (ingredient: Omit<Ingredient, "id">) =>
    axios.post<Ingredient>(`${API_BASE}/ingredients`, ingredient),
  update: (id: number, ingredient: Omit<Ingredient, "id">) =>
    axios.put<Ingredient>(`${API_BASE}/ingredients/${id}`, ingredient),
  delete: (id: number) => axios.delete(`${API_BASE}/ingredients/${id}`),
};

// Recipe API
export const recipeAPI = {
  getAll: () => axios.get<Recipe[]>(`${API_BASE}/recipes`),
  getActive: () => axios.get<Recipe[]>(`${API_BASE}/recipes/active`),
  getById: (id: number) => axios.get<Recipe>(`${API_BASE}/recipes/${id}`),
  create: (recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">) =>
    axios.post<Recipe>(`${API_BASE}/recipes`, recipe),
  update: (
    id: number,
    recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">,
  ) => axios.put<Recipe>(`${API_BASE}/recipes/${id}`, recipe),
  delete: (id: number) => axios.delete(`${API_BASE}/recipes/${id}`),
  addIngredient: (
    recipeId: number,
    ingredient: Omit<RecipeIngredient, "id" | "ingredientName">,
  ) =>
    axios.post<Recipe>(
      `${API_BASE}/recipes/${recipeId}/ingredients`,
      ingredient,
    ),
  removeIngredient: (recipeId: number, ingredientId: number) =>
    axios.delete<Recipe>(
      `${API_BASE}/recipes/${recipeId}/ingredients/${ingredientId}`,
    ),
};
