"use client"

import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem, CircularProgress, Alert } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SaveIcon from "@mui/icons-material/Save"
import { useGetSupplierByIdQuery, useUpdateSupplierMutation } from "../../store/api/suppliersApi"
import { useNotification } from "../../hooks/useNotification"
import { handleApiError } from "../../utils/errorHandler"

function EditSupplier() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showNotification } = useNotification()

  const { data: supplier, isLoading, isError, error } = useGetSupplierByIdQuery(id)

  const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (supplier) {
      reset(supplier)
    }
  }, [supplier, reset])

  const onSubmit = async (data) => {
    try {
      await updateSupplier({ id, ...data }).unwrap()
      showNotification({
        message: "Supplier updated successfully",
        type: "success",
      })
      navigate("/suppliers")
    } catch (err) {
      handleApiError(err, showNotification)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {handleApiError(error)}
        </Alert>
        <Button variant="contained" onClick={() => navigate("/suppliers")}>
          Back to Suppliers
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/suppliers")} sx={{ mb: 2 }}>
        Back to Suppliers
      </Button>

      <Typography variant="h4" fontWeight={600} mb={3}>
        Edit Supplier
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
              <TextField fullWidth label="Unique ID" {...register("uniqueId")} disabled />
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
              <TextField fullWidth select label="Status" {...register("status")}>
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
                <Button variant="outlined" onClick={() => navigate("/suppliers")} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Supplier"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default EditSupplier
