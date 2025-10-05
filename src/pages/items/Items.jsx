"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  TablePagination,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SearchIcon from "@mui/icons-material/Search"
import { useGetItemsQuery, useDeleteItemMutation } from "../../store/api/itemsApi"
import { useNotification } from "../../hooks/useNotification"
import { handleApiError } from "../../utils/errorHandler"

function ItemsList() {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const { data, isLoading, isError, error, refetch } = useGetItemsQuery({
    page: page + 1,
    limit: rowsPerPage,
    search: searchTerm,
  })

  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteItem(selectedItem.id).unwrap()
      showNotification({
        message: "Item deleted successfully",
        type: "success",
      })
      setDeleteDialogOpen(false)
      setSelectedItem(null)
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
// uncomment for dummy

//   if (isError) {
//     return (
//       <Box>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {handleApiError(error)}
//         </Alert>
//         <Button variant="contained" onClick={refetch}>
//           Retry
//         </Button>
//       </Box>
//     )
//   }

  const items = data?.data || []
  const totalCount = data?.total || 0

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Items
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/items/add")}
          sx={{ borderRadius: 2 }}
        >
          Create Item
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search items by name, supplier, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Item ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Unit Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Wholesale</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actual Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Origin</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No items found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.uniqueId || item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.supplierName || item.supplier}</TableCell>
                    <TableCell>${item.unitPrice}</TableCell>
                    <TableCell>${item.wholesalePrice}</TableCell>
                    <TableCell>
                      <Chip label={`$${item.actualPrice}`} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{item.origin}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => navigate(`/items/edit/${item.id}`)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(item)}
                        disabled={isDeleting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete item "{selectedItem?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ItemsList
