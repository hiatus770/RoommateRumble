'use client';
import {createTheme} from "@mui/material/styles";

const lightTheme = createTheme({
    typography: {
        fontFamily: [
            '"Segoe UI Variable Display"',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        background: {
            default: "#fdfdff",
            paper: "#f0f4f9",
        },
        appbar: {
            background: "#dfe4ef",
            button: "rgba(0,0,0,0.05)"
        }
    }
});

const darkTheme = createTheme({
    typography: {
        fontFamily: [
            '"Segoe UI Variable Display"',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#84aaf6',
        },
        background: {
            default: "#161624",
            paper: "#212a3f",
        },
        appbar: {
            background: "#2e3d5b",
            button: "rgba(255,255,255,0.05)"
        }
    }
});

const nordLight = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px #D8DEE9 inset !important;
              }
            `,
        },
    },
    typography: {
        fontFamily: [
            '"Segoe UI Variable Display"',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#5E81AC',
            light: '#81A1C1',
            dark: '#47678f',
            contrastText: '#f6f7fa'
        },
        background: {
            background: "#f6f7fa",
            default: "#D8DEE9",
            paper: "#E5E9F0",
        },
        error: {
            main: "#BF616A",
        },
        success: {
            main: "#A3BE8C",
        },
        appbar: {
            background: "#D8DEE9",
            button: "#ECEFF4"
        }
    }
});

const nordDark = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
              input:-webkit-autofill,
              input:-webkit-autofill:hover,
              input:-webkit-autofill:focus,
              input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 30px #434C5E inset !important;
              }
            `,
        },
        MUIDataTable: {
            styleOverrides: {
                paper: {
                    borderRadius: '1.2vh'
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '"Segoe UI Variable Display"',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#88C0D0',
            light: '#81A1C1',
            dark: '#5E81AC',
            contrastText: '#2E3440'
        },
        background: {
            background: "#2E3440",
            default: "#434C5E",
            paper: "#3B4252",
        },
        error: {
            main: "#BF616A",
        },
        success: {
          main: "#A3BE8C",
        },
        appbar: {
            background: "#434C5E",
            button: "#3B4252"
        }
    }
});

export {lightTheme, darkTheme, nordLight, nordDark};