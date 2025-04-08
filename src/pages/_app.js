import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e3a8a",
    },
    secondary: {
      main: "#3b82f6",
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
