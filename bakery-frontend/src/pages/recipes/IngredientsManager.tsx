import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { ingredientAPI, type Ingredient } from "../../services/recipeAPI";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const IngredientsManager: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [formData, setFormData] = useState<Omit<Ingredient, "id">>({
    name: "",
    unit: "KG",
    unitPrice: 0,
    active: true,
  });

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const response = await ingredientAPI.getAll();
      setIngredients(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load ingredients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (ingredient?: Ingredient) => {
    if (ingredient) {
      setSelectedIngredient(ingredient);
      setFormData(ingredient);
    } else {
      setSelectedIngredient(null);
      setFormData({
        name: "",
        unit: "KG",
        unitPrice: 0,
        active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (!formData.name) {
      setError("Please enter ingredient name");
      return;
    }

    try {
      if (selectedIngredient) {
        await ingredientAPI.update(selectedIngredient.id, formData);
      } else {
        await ingredientAPI.create(formData);
      }
      await loadIngredients();
      setOpenDialog(false);
    } catch (err) {
      setError("Failed to save ingredient");
      console.error(err);
    }
  };

  const handleDelete = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedIngredient) return;

    try {
      await ingredientAPI.delete(selectedIngredient.id);
      setIngredients(ingredients.filter((i) => i.id !== selectedIngredient.id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError("Failed to delete ingredient");
      console.error(err);
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <h1>Ingredients</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          New Ingredient
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Unit</strong>
              </TableCell>
              <TableCell>
                <strong>Unit Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No ingredients found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              ingredients.map((ingredient) => (
                <TableRow key={ingredient.id} hover>
                  <TableCell>
                    <strong>{ingredient.name}</strong>
                  </TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                  <TableCell>${ingredient.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={ingredient.active ? "Active" : "Inactive"}
                      color={ingredient.active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog(ingredient)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(ingredient)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedIngredient ? "Edit Ingredient" : "New Ingredient"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitPrice: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Ingredient</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedIngredient?.name}"? This
          action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IngredientsManager;
