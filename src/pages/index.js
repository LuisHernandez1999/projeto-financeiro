"use client"

import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Paper,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Checkbox,
  FormControlLabel,
  Divider,
  alpha,
} from "@mui/material"

export default function LoginPage() {
  // State for form fields
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Refs for animation elements
  const paperRef = useRef(null)
  const formRef = useRef(null)

  // Create a custom theme with enhanced colors
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e40af", // Deeper blue
        light: "#3b82f6",
        dark: "#1e3a8a",
      },
      secondary: {
        main: "#0ea5e9", // Bright cyan
        light: "#38bdf8",
        dark: "#0284c7",
      },
      background: {
        default: "#0f172a",
        paper: "rgba(255, 255, 255, 0.95)",
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
      h4: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)",
      "0px 3px 3px -2px rgba(0,0,0,0.1),0px 2px 6px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)",
      "0px 3px 4px -2px rgba(0,0,0,0.1),0px 3px 8px 0px rgba(0,0,0,0.07),0px 1px 12px 0px rgba(0,0,0,0.06)",
      "0px 2px 5px -1px rgba(0,0,0,0.1),0px 4px 10px 0px rgba(0,0,0,0.07),0px 1px 16px 0px rgba(0,0,0,0.06)",
      "0px 3px 6px -1px rgba(0,0,0,0.1),0px 5px 12px 0px rgba(0,0,0,0.07),0px 1px 20px 0px rgba(0,0,0,0.06)",
      "0px 3px 7px -2px rgba(0,0,0,0.1),0px 6px 14px 0px rgba(0,0,0,0.07),0px 1px 24px 0px rgba(0,0,0,0.06)",
      "0px 4px 8px -2px rgba(0,0,0,0.1),0px 7px 16px 0px rgba(0,0,0,0.07),0px 2px 28px 0px rgba(0,0,0,0.06)",
      "0px 5px 9px -2px rgba(0,0,0,0.1),0px 8px 18px 0px rgba(0,0,0,0.07),0px 2px 32px 0px rgba(0,0,0,0.06)",
      "0px 5px 10px -3px rgba(0,0,0,0.1),0px 9px 20px 0px rgba(0,0,0,0.07),0px 2px 36px 0px rgba(0,0,0,0.06)",
      "0px 6px 11px -3px rgba(0,0,0,0.1),0px 10px 22px 0px rgba(0,0,0,0.07),0px 3px 40px 0px rgba(0,0,0,0.06)",
      "0px 6px 12px -3px rgba(0,0,0,0.1),0px 11px 24px 0px rgba(0,0,0,0.07),0px 3px 44px 0px rgba(0,0,0,0.06)",
      "0px 7px 13px -4px rgba(0,0,0,0.1),0px 12px 26px 0px rgba(0,0,0,0.07),0px 3px 48px 0px rgba(0,0,0,0.06)",
      "0px 7px 14px -4px rgba(0,0,0,0.1),0px 13px 28px 0px rgba(0,0,0,0.07),0px 4px 52px 0px rgba(0,0,0,0.06)",
      "0px 8px 15px -4px rgba(0,0,0,0.1),0px 14px 30px 0px rgba(0,0,0,0.07),0px 4px 56px 0px rgba(0,0,0,0.06)",
      "0px 8px 16px -5px rgba(0,0,0,0.1),0px 15px 32px 0px rgba(0,0,0,0.07),0px 4px 60px 0px rgba(0,0,0,0.06)",
      "0px 9px 17px -5px rgba(0,0,0,0.1),0px 16px 34px 0px rgba(0,0,0,0.07),0px 5px 64px 0px rgba(0,0,0,0.06)",
      "0px 9px 18px -5px rgba(0,0,0,0.1),0px 17px 36px 0px rgba(0,0,0,0.07),0px 5px 68px 0px rgba(0,0,0,0.06)",
      "0px 10px 19px -6px rgba(0,0,0,0.1),0px 18px 38px 0px rgba(0,0,0,0.07),0px 5px 72px 0px rgba(0,0,0,0.06)",
      "0px 10px 20px -6px rgba(0,0,0,0.1),0px 19px 40px 0px rgba(0,0,0,0.07),0px 6px 76px 0px rgba(0,0,0,0.06)",
      "0px 11px 21px -6px rgba(0,0,0,0.1),0px 20px 42px 0px rgba(0,0,0,0.07),0px 6px 80px 0px rgba(0,0,0,0.06)",
      "0px 11px 22px -7px rgba(0,0,0,0.1),0px 21px 44px 0px rgba(0,0,0,0.07),0px 6px 84px 0px rgba(0,0,0,0.06)",
      "0px 12px 23px -7px rgba(0,0,0,0.1),0px 22px 46px 0px rgba(0,0,0,0.07),0px 7px 88px 0px rgba(0,0,0,0.06)",
      "0px 12px 24px -7px rgba(0,0,0,0.1),0px 23px 48px 0px rgba(0,0,0,0.07),0px 7px 92px 0px rgba(0,0,0,0.06)",
      "0px 13px 25px -8px rgba(0,0,0,0.1),0px 24px 50px 0px rgba(0,0,0,0.07),0px 7px 96px 0px rgba(0,0,0,0.06)",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
    },
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt with:", { email, password, rememberMe })
      setIsLoading(false)
      // Add your authentication logic here
    }, 1500)
  }

  // Create animated background elements
  useEffect(() => {
    // Add font link
    const fontLink = document.createElement("link")
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    fontLink.rel = "stylesheet"
    document.head.appendChild(fontLink)

    // Create animated background
    const container = document.getElementById("login-container")
    if (container) {
      // Clear any existing circles
      const existingCircles = container.querySelectorAll(".blur-circle")
      existingCircles.forEach((circle) => circle.remove())

      // Create new circles with enhanced colors
      const colors = [
        "rgba(59, 130, 246, 0.08)", // Blue
        "rgba(14, 165, 233, 0.07)", // Cyan
        "rgba(99, 102, 241, 0.06)", // Indigo
        "rgba(168, 85, 247, 0.05)", // Purple
        "rgba(236, 72, 153, 0.04)", // Pink
      ]

      for (let i = 0; i < 8; i++) {
        const circle = document.createElement("div")
        circle.className = "blur-circle"

        // Style the circle with more vibrant colors
        Object.assign(circle.style, {
          position: "absolute",
          width: `${200 + i * 100}px`,
          height: `${200 + i * 100}px`,
          borderRadius: "50%",
          background: colors[i % colors.length],
          filter: "blur(80px)",
          zIndex: "0",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 20s cubic-bezier(0.21, 0.61, 0.35, 1)",
          opacity: 0,
        })

        container.appendChild(circle)

        // Delayed appearance for staggered effect
        setTimeout(() => {
          circle.style.opacity = 1
        }, i * 200)

        // Animate the circle with more natural movement
        const animateCircle = () => {
          const x = Math.random() * 100
          const y = Math.random() * 100

          Object.assign(circle.style, {
            left: `${x}%`,
            top: `${y}%`,
          })

          setTimeout(animateCircle, 15000 + i * 5000)
        }

        setTimeout(animateCircle, 1000)
      }

      // Add floating particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div")
        const size = Math.random() * 6 + 1

        Object.assign(particle.style, {
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "50%",
          zIndex: "0",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s linear infinite`,
          opacity: Math.random() * 0.5 + 0.1,
        })

        container.appendChild(particle)
      }

      // Add keyframe animation for particles
      const style = document.createElement("style")
      style.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-10px) translateX(30px);
          }
          75% {
            transform: translateY(-20px) translateX(15px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `
      document.head.appendChild(style)
    }

    // Add entrance animation for the form
    if (paperRef.current) {
      paperRef.current.style.opacity = "0"
      paperRef.current.style.transform = "translateY(20px)"

      setTimeout(() => {
        paperRef.current.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
        paperRef.current.style.opacity = "1"
        paperRef.current.style.transform = "translateY(0)"
      }, 300)
    }

    return () => {
      // Cleanup
      document.head.removeChild(fontLink)
    }
  }, [])

  return (
    <>
      <Head>
        <title>FinanGroovy - Login</title>
        <meta name="description" content="Login to FinanGroovy" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          id="login-container"
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            position: "relative",
            overflow: "hidden",
            "& *": {
              boxSizing: "border-box",
            },
          }}
        >
          {/* Animated light beam */}
          <Box
            sx={{
              position: "absolute",
              width: "150%",
              height: "150%",
              top: "-25%",
              left: "-25%",
              background:
                "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(14, 165, 233, 0.05) 30%, rgba(0, 0, 0, 0) 70%)",
              transform: "rotate(-45deg)",
              animation: "rotateBeam 20s linear infinite",
              "@keyframes rotateBeam": {
                "0%": { transform: "rotate(-45deg)" },
                "100%": { transform: "rotate(315deg)" },
              },
              zIndex: 0,
            }}
          />

          <Container maxWidth="sm" sx={{ zIndex: 1, px: { xs: 2, sm: 3 } }}>
            <Paper
              ref={paperRef}
              elevation={24}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                backdropFilter: "blur(20px)",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #1e40af, #0ea5e9, #8b5cf6, #1e40af)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 8s linear infinite",
                },
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                    animation: "logoEntrance 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                    "@keyframes logoEntrance": {
                      "0%": { transform: "scale(0.8)", opacity: 0 },
                      "100%": { transform: "scale(1)", opacity: 1 },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #1e40af, #0ea5e9)",
                      boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)",
                      mr: 2,
                      animation: "pulse 2s infinite",
                    }}
                  >
                    {/* Trending Up Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      background: "linear-gradient(90deg, #1e40af, #0ea5e9)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 2px 10px rgba(14, 165, 233, 0.2)",
                    }}
                  >
                    FinanGroovy
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 300,
                    textAlign: "center",
                    mt: 1,
                    animation: "fadeIn 1.5s ease-out",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "translateY(10px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  Gerencie suas finanças com estilo
                </Typography>
              </Box>

              {/* Login Form */}
              <Box
                component="form"
                ref={formRef}
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": {
                    mb: 2.5,
                  },
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    animation: "slideUp 0.6s ease-out",
                    "@keyframes slideUp": {
                      "0%": { opacity: 0, transform: "translateY(20px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.main, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* User Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={theme.palette.primary.main}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    animation: "slideUp 0.8s ease-out",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.main, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                        borderWidth: "2px",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* Lock Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={theme.palette.primary.main}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: theme.palette.primary.main,
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {showPassword ? (
                            // Eye Off Icon
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                              <line x1="2" x2="22" y1="2" y2="22"></line>
                            </svg>
                          ) : (
                            // Eye Icon
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    animation: "slideUp 1s ease-out",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          color: theme.palette.primary.main,
                          "&.Mui-checked": {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Lembrar-me
                      </Typography>
                    }
                  />
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Esqueceu a senha?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    mt: 1,
                    mb: 3,
                    py: 1.5,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    animation: "slideUp 1.2s ease-out",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "all 0.5s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 7px 14px rgba(14, 165, 233, 0.3)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                  endIcon={
                    isLoading ? null : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    )
                  }
                >
                  {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "2px solid rgba(255, 255, 255, 0.5)",
                          borderTopColor: "transparent",
                          animation: "spin 1s linear infinite",
                          mr: 1,
                          "@keyframes spin": {
                            "0%": { transform: "rotate(0deg)" },
                            "100%": { transform: "rotate(360deg)" },
                          },
                        }}
                      />
                      Entrando...
                    </Box>
                  ) : (
                    "Entrar"
                  )}
                </Button>

                <Divider sx={{ my: 2, animation: "fadeIn 1.5s ease-out" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", px: 1 }}>
                    ou continue com
                  </Typography>
                </Divider>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                    animation: "fadeIn 1.8s ease-out",
                  }}
                >
                  {/* Social login buttons */}
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      minWidth: "unset",
                      width: 44,
                      height: 44,
                      p: 0,
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "#4285F4",
                      "&:hover": {
                        borderColor: "#4285F4",
                        background: "rgba(66, 133, 244, 0.04)",
                      },
                    }}
                  >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      minWidth: "unset",
                      width: 44,
                      height: 44,
                      p: 0,
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "#1877F2",
                      "&:hover": {
                        borderColor: "#1877F2",
                        background: "rgba(24, 119, 242, 0.04)",
                      },
                    }}
                  >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "50%",
                      minWidth: "unset",
                      width: 44,
                      height: 44,
                      p: 0,
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "#000000",
                      "&:hover": {
                        borderColor: "#000000",
                        background: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.451 14.095c-.301-1.308-1.176-2.086-2.533-2.103-.68-.009-1.36-.001-2.041-.001-.185 0-.186 0-.186-.19 0-1.227.035-2.457-.01-3.683-.05-1.347-.961-2.314-2.253-2.416-.901-.071-1.696.328-2.187 1.068-.149.225-.149.225-.368.118-1.562-.759-3.125-1.517-4.687-2.275-.786-.382-1.603.299-1.444 1.094.038.19.145.363.258.522.918 1.289 1.845 2.572 2.775 3.854.168.232.134.284-.108.397-1.268.592-1.878 1.866-1.512 3.147.37 1.294 1.576 2.229 2.97 2.175.62-.024 1.243-.004 1.864-.004.16 0 .161 0 .161.156 0 1.246-.033 2.493.01 3.737.046 1.32.947 2.298 2.23 2.416.892.082 1.682-.305 2.18-1.044.157-.233.157-.233.377-.123 1.562.759 3.124 1.517 4.687 2.275.787.382 1.604-.299 1.444-1.094-.038-.19-.145-.363-.258-.522-.918-1.289-1.845-2.572-2.775-3.854-.168-.232-.133-.284.108-.397 1.277-.596 1.881-1.886 1.498-3.173zm-6.704 2.165c-.168.003-.336.001-.504.001-1.232 0-2.465-.002-3.697.001-.436.001-.708-.271-.708-.653-.001-.384.271-.656.711-.656 1.232-.001 2.465.002 3.697-.001.168-.001.336.001.504-.001.436-.005.716.264.72.646.004.382-.276.658-.723.663z"
                      />
                    </svg>
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                    animation: "fadeIn 2s ease-out",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "text.secondary", mr: 0.5 }}>
                    Não tem uma conta?
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      p: 0,
                      minWidth: "auto",
                      "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Criar conta
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}
