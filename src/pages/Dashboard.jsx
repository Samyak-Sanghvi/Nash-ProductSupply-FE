import { Box, Grid, Card, CardContent, Typography, Paper } from "@mui/material"
import BusinessIcon from "@mui/icons-material/Business"
import InventoryIcon from "@mui/icons-material/Inventory"
import DescriptionIcon from "@mui/icons-material/Description"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

const stats = [
  {
    title: "Total Suppliers",
    value: "24",
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    color: "#1976d2",
    change: "+12%",
  },
  {
    title: "Total Items",
    value: "156",
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    color: "#2e7d32",
    change: "+8%",
  },
  {
    title: "Active Quotations",
    value: "8",
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    color: "#ed6c02",
    change: "+3",
  },
  {
    title: "Monthly Growth",
    value: "18%",
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: "#9c27b0",
    change: "+5%",
  },
]

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={600} mb={1}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "success.main", fontWeight: 500 }}>
                      {stat.change} from last month
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: stat.color,
                      color: "white",
                      borderRadius: 2,
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography color="text.secondary">No recent activity to display</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Actions
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography color="text.secondary">Use the sidebar to navigate</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
