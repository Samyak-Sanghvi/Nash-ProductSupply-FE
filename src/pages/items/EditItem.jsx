"use client"

import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem, CircularProgress, Alert } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SaveIcon from "@mui/icons-material/Save"
import { useGetItemByIdQuery, useUpdateItemMutation } from "../../store/api/itemsApi"
import { useGetSuppliersQuery } from "../../store/api/suppliersApi"
import { useNotification } from "../../hooks/useNotification"

function EditItem() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showSuccess, showError } = useNotification()

  const { data: item, isLoading: isLoadingItem, error: itemError } = useGetItemByIdQuery(id)
  const { data: suppliersData, isLoading: isLoadingSuppliers } = useGetSuppliersQuery({ page: 1, limit: 100 })
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  React.useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        uniqueNo: item.uniqueNo,
        supplierId: item.supplierId,
        packaging: item.packaging,
        unitPrice: item.unitPrice,
        wholesalePrice: item.wholesalePrice,
        actualPrice: item.actualPrice,
        origin: item.origin,
        sku: item.sku,
        description: item.description,
        category: item.category,
        stock: item.stock,
        minStock: item.minStock,
      })
    }
  }, [item, reset])

  const onSubmit = async (data) => {
    try {
      await updateItem({ id, ...data }).unwrap()
      showSuccess("Item updated successfully")
      navigate("/items")
    } catch (error) {
      showError(error?.data?.message || "Failed to update item")
    }
  }

  if (isLoadingItem || isLoadingSuppliers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  // if (itemError) {
  //   return (
  //     <Box>
  //       <Alert severity="error" sx={{ mb: 2 }}>
  //         {itemError?.data?.message || "Failed to load item"}
  //       </Alert>
  //       <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/items")}>
  //         Back to Items
  //       </Button>
  //     </Box>
  //   )
  // }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/items")} sx={{ mb: 2 }}>
        Back to Items
      </Button>

      <Typography variant="h4" fontWeight={600} mb={3}>
        Edit Item
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
              <TextField fullWidth label="Unique ID" {...register("uniqueNo")} disabled />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Supplier"
                {...register("supplierId", { required: "Supplier is required" })}
                error={!!errors.supplierId}
                helperText={errors.supplierId?.message}
              >
                {suppliersData?.data?.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                {...register("category")}
                placeholder="e.g., Electronics, Hardware"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="SKU" {...register("sku")} placeholder="Stock Keeping Unit" />
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
                {...register("unitPrice", { required: "Unit price is required", valueAsNumber: true })}
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
                  valueAsNumber: true,
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
                  valueAsNumber: true,
                })}
                error={!!errors.actualPrice}
                helperText={errors.actualPrice?.message}
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                placeholder="Current stock"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Minimum Stock"
                type="number"
                {...register("minStock", { valueAsNumber: true })}
                placeholder="Minimum stock level"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Origin" {...register("origin")} placeholder="Country of origin" />
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
                <Button variant="outlined" onClick={() => navigate("/items")} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={isUpdating ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Item"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default EditItem
