"use client"

import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SaveIcon from "@mui/icons-material/Save"
import { useCreateSupplierMutation } from "../../store/api/suppliersApi"
import { useNotification } from "../../hooks/useNotification"
import { handleApiError } from "../../utils/errorHandler"
const USE_DUMMY_DATA = true;
function AddSupplier() {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [createSupplier, { isLoading }] = useCreateSupplierMutation()

  const onSubmit = async (data) => {
    // --- NEW: Handle dummy data submission ---
     if (USE_DUMMY_DATA) {
      // --- DUMMY SUBMIT LOGIC ---
      try {
        // 1. Get the current list from localStorage
        const storedSuppliers = JSON.parse(localStorage.getItem("dummySuppliers") || "[]");

        // 2. Create the new supplier with a unique ID
        const newSupplier = {
          ...data,
          id: Date.now(), // Simple unique ID for dummy data
        };

        // 3. Add it to the list and save back to localStorage
        const updatedSuppliers = [...storedSuppliers, newSupplier];
        localStorage.setItem("dummySuppliers", JSON.stringify(updatedSuppliers));
        
        showNotification({ message: "Supplier saved to local storage", type: "success" });
        navigate("/suppliers");
      } catch (error) {
        console.error("Failed to save dummy supplier", error);
        showNotification({ message: "Failed to save dummy data", type: "error" });
      }
    } else{ // TILL HERE
    try {
      await createSupplier(data).unwrap()
      showNotification({
        message: "Supplier created successfully",
        type: "success",
      })
      navigate("/suppliers")
    } catch (err) {
      handleApiError(err, showNotification)
    }
  }
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/suppliers")} sx={{ mb: 2 }}>
        Back to Suppliers
      </Button>

      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New Supplier
      </Typography>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Supplier Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Unique ID"
                {...register("uniqueId", { required: "Unique ID is required" })}
                error={!!errors.uniqueId}
                helperText={errors.uniqueId?.message}
                placeholder="SUP001"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                {...register("contactNo", {
                  required: "Contact number is required",
                })}
                error={!!errors.contactNo}
                helperText={errors.contactNo?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="Status" defaultValue="Active" {...register("status")}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Other Details"
                multiline
                rows={4}
                {...register("otherDetails")}
                placeholder="Additional information about the supplier..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={() => navigate("/suppliers")} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Supplier"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default AddSupplier
