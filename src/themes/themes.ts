import { createTheme } from "@mui/material";

const customTheme = createTheme({
  typography: {
    fontFamily: "inherit",
  },

  palette: {
    primary: {
      main: "#4A42A6",
    },
    secondary: {
      main: "#FCFCFC",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          paddingTop: "0.6rem",
          paddingBottom: "0.6rem",
          boxShadow: "none",
          width: "325px",
          "&:hover": {
            backgroundColor: "#3370FF",
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#FFFFFF",
            color: "#004BF9",
            "&:hover": {
              backgroundColor: "#FAFAFA",
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#FFFFFF",
            color: "#282828",
            "&:hover": {
              backgroundColor: "#FAFAFA",
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            backgroundColor: "#FFFFFF",
            color: "#282828",
            borderColor: "#282828",
            "&:hover": {
              backgroundColor: "#FAFAFA",
              borderColor: "#282828",
            },
          },
        },

        {
          props: { fullWidth: true },
          style: {
            width: "100%",
          },
        },
      ],
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          variant: "standard",
          fontSize: "1rem",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& fieldset": {
            border: "1px solid rgba(245, 245, 245, 0.212)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 1)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(255, 255, 255, 1)",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(62, 63, 92, 1)",
          color: "rgba(255, 255, 255, 1)",
          height: "40px",
        },
        icon: {
          color: "#FFFFFF",
        },
      },
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              bgcolor: "rgba(62, 63, 92, 1)",
              color: "rgba(255, 255, 255, 1)",
            },
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {},
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 1)",
          "&.Mui-focused": {
            color: "rgba(255, 255, 255, 1)",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ebebeb",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(62, 63, 92, 1)",
          color: "rgba(255, 255, 255, 1)",
          borderRadius: "8px",
          fontSize: "12px",
        },
      },
    },
  },
});

export default customTheme;
