import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  recipeAPI,
  type Recipe,
  type Ingredient,
  type RecipeIngredient,
} from "../../services/recipeAPI";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { ingredientAPI } from "../../services/recipeAPI";

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [recipe, setRecipe] = useState<
    Omit<Recipe, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    description: "",
    flourWeight: 0,
    breadYield: 0,
    unit: "PIECE",
    totalWeight: 0,
    category: "",
    active: true,
    ingredients: [],
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [addIngredientDialogOpen, setAddIngredientDialogOpen] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | "">(
    "",
  );
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("KG");

  useEffect(() => {
    loadIngredients();
    if (!isNew && id) {
      loadRecipe(parseInt(id));
    }
  }, [id, isNew]);

  const loadRecipe = async (recipeId: number) => {
    try {
      setLoading(true);
      const response = await recipeAPI.getById(recipeId);
      setRecipe(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load recipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadIngredients = async () => {
    try {
      const response = await ingredientAPI.getActive();
      setIngredients(response.data);
    } catch (err) {
      console.error("Failed to load ingredients", err);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isNew) {
        await recipeAPI.create(recipe);
      } else if (id) {
        await recipeAPI.update(parseInt(id), recipe);
      }
      navigate("/recipes");
    } catch (err) {
      setError("Failed to save recipe");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddIngredient = async () => {
    if (!selectedIngredientId || !ingredientAmount) {
      setError("Please select ingredient and amount");
      return;
    }

    try {
      const ingredient = {
        ingredientId: selectedIngredientId as number,
        amount: parseFloat(ingredientAmount),
        unit: ingredientUnit,
      };

      setRecipe((prev) => ({
        ...prev,
        ingredients: [
          ...prev.ingredients,
          {
            id: Date.now(),
            ...ingredient,
            ingredientName:
              ingredients.find((i) => i.id === selectedIngredientId)?.name ||
              "",
          },
        ],
      }));

      setSelectedIngredientId("");
      setIngredientAmount("");
      setIngredientUnit("KG");
      setAddIngredientDialogOpen(false);
    } catch (err) {
      setError("Failed to add ingredient");
      console.error(err);
    }
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i.id !== ingredientId),
    }));
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/recipes")}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <h1>{isNew ? "New Recipe" : recipe.name}</h1>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Recipe Name"
              value={recipe.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              value={recipe.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={recipe.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              label="Flour Weight (g)"
              type="number"
              value={recipe.flourWeight}
              onChange={(e) =>
                handleInputChange("flourWeight", parseFloat(e.target.value))
              }
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              label="Total Weight (g)"
              type="number"
              value={recipe.totalWeight}
              onChange={(e) =>
                handleInputChange("totalWeight", parseFloat(e.target.value))
              }
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              label="Bread Yield"
              type="number"
              value={recipe.breadYield}
              onChange={(e) =>
                handleInputChange("breadYield", parseInt(e.target.value))
              }
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Unit</InputLabel>
              <Select
                value={recipe.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
              >
                <MenuItem value="PIECE">Piece</MenuItem>
                <MenuItem value="KG">Kg</MenuItem>
                <MenuItem value="G">G</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={recipe.active}
                  onChange={(e) =>
                    handleInputChange("active", e.target.checked)
                  }
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <h2>Ingredients</h2>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddIngredientDialogOpen(true)}
          >
            Add Ingredient
          </Button>
        </Box>

        {recipe.ingredients.length === 0 ? (
          <Alert>No ingredients added yet</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>
                    <strong>Ingredient</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Unit</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipe.ingredients.map((ing) => (
                  <TableRow key={ing.id}>
                    <TableCell>{ing.ingredientName}</TableCell>
                    <TableCell>{ing.amount}</TableCell>
                    <TableCell>{ing.unit}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveIngredient(ing.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Recipe"}
        </Button>
        <Button variant="outlined" onClick={() => navigate("/recipes")}>
          Cancel
        </Button>
      </Box>

      <Dialog
        open={addIngredientDialogOpen}
        onClose={() => setAddIngredientDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ingredient</InputLabel>
                <Select
                  value={selectedIngredientId}
                  onChange={(e) =>
                    setSelectedIngredientId(e.target.value as number)
                  }
                >
                  {ingredients.map((ing) => (
                    <MenuItem key={ing.id} value={ing.id}>
                      {ing.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={ingredientUnit}
                  onChange={(e) => setIngredientUnit(e.target.value)}
                >
                  <MenuItem value="KG">Kg</MenuItem>
                  <MenuItem value="G">G</MenuItem>
                  <MenuItem value="ML">Ml</MenuItem>
                  <MenuItem value="PIECE">Piece</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddIngredientDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddIngredient} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecipeDetail;
