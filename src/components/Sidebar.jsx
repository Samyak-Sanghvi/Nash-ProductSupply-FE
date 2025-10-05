"use client"

import { useNavigate, useLocation } from "react-router-dom"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import BusinessIcon from "@mui/icons-material/Business"
import InventoryIcon from "@mui/icons-material/Inventory"
import ListAltIcon from "@mui/icons-material/ListAlt"
import DescriptionIcon from "@mui/icons-material/Description"

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Suppliers", icon: <BusinessIcon />, path: "/suppliers" },
  { text: "Items", icon: <InventoryIcon />, path: "/items" },
  { text: "Supplier List", icon: <ListAltIcon />, path: "/supplier-list" },
  // { text: "Quotations", icon: <DescriptionIcon />, path: "/quotations" },
]

function Sidebar({ drawerWidth, mobileOpen, onDrawerToggle }) {
  const navigate = useNavigate()
  const location = useLocation()

  const drawer = (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <InventoryIcon sx={{ fontSize: 32 }} />
        <Typography variant="h6" fontWeight={600}>
          AlbaSca
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    backgroundColor: isActive ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "white" : "text.secondary",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
