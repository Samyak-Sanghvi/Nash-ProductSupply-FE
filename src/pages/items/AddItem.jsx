"use client"

import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SaveIcon from "@mui/icons-material/Save"
import { useCreateItemMutation } from "../../store/api/itemsApi"
import { useGetSuppliersQuery } from "../../store/api/suppliersApi"
import { useNotification } from "../../hooks/useNotification"
import { handleApiError } from "../../utils/errorHandler"

function AddItem() {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: suppliersData } = useGetSuppliersQuery({ page: 1, limit: 100 })
  const suppliers = suppliersData?.data || []

  const [createItem, { isLoading }] = useCreateItemMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createItem(data).unwrap()
      showNotification({
        message: "Item created successfully",
        type: "success",
      })
      navigate("/items")
    } catch (err) {
      handleApiError(err, showNotification)
    }
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/items")} sx={{ mb: 2 }}>
        Back to Items
      </Button>

      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New Item
      </Typography>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Item Name"
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
                placeholder="ITM001"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Supplier"
                defaultValue=""
                {...register("supplierId", { required: "Supplier is required" })}
                error={!!errors.supplierId}
                helperText={errors.supplierId?.message}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Packaging"
                {...register("packaging")}
                placeholder="e.g., Box of 10, Pack of 50"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                {...register("unitPrice", { required: "Unit price is required" })}
                error={!!errors.unitPrice}
                helperText={errors.unitPrice?.message}
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Wholesale Price"
                type="number"
                {...register("wholesalePrice", {
                  required: "Wholesale price is required",
                })}
                error={!!errors.wholesalePrice}
                helperText={errors.wholesalePrice?.message}
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Actual Price"
                type="number"
                {...register("actualPrice", {
                  required: "Actual price is required",
                })}
                error={!!errors.actualPrice}
                helperText={errors.actualPrice?.message}
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Origin" {...register("origin")} placeholder="Country of origin" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="QR/ID Code" {...register("qrId")} placeholder="Barcode or QR code" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register("description")}
                placeholder="Detailed description of the item..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={() => navigate("/items")} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Item"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default AddItem
