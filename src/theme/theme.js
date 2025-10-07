import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7367f0",//#91C4C3
      light: "#ede9ff",
      dark: "#8074ffff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#546e7a",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h7:{fontWeight: 500 , fontSize: "1rem"}
  },
  components: {
     MuiTextField: {
      defaultProps: {
        size: "small", // all TextFields will be small by default
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
           
            height: "36px",     // input height
          },
          "& .MuiInputBase-input": {
            
          },
            "& .MuiInputBase-multiline": {
          
            lineHeight: 1.5,
            minHeight: "80px", // minimum height for multiline
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
        //   borderRadius: 12,
        },
      },
    },
  },
})

export default theme
