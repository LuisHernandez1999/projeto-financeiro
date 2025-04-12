"use client"

import { useState, useEffect } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  alpha,
  InputBase,
  Tooltip,
  Divider,
  Badge,
} from "@mui/material"
import {
  CreditCard,
  ArrowDownCircle,
  Clock,
  CheckCircle2,
  Settings,
  LogOut,
  User,
  Search,
  Bell,
  Home,
  BarChart3,
  PieChart,
  Building2,
} from "lucide-react"

export default function FinanceSidebar() {
  const [activeItem, setActiveItem] = useState("gastos")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const theme = useTheme()

  // Define custom colors with a more modern palette
  const colors = {
    primary: "#2563eb", // Brighter blue
    secondary: "#0ea5e9", // Bright cyan
    background: "#0f172a", // Dark blue background
    backgroundLight: "#1e293b", // Lighter background for hover states
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    textDisabled: "rgba(255, 255, 255, 0.5)",
    divider: "rgba(255, 255, 255, 0.12)",
    highlight: "#3b82f6", // Highlight color
    accent: "#8b5cf6", // Purple accent
  }

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      badge: 0,
    },
    {
      id: "gastos",
      label: "Gastos",
      icon: <CreditCard size={20} />,
      badge: 3,
    },
    {
      id: "recebidos",
      label: "Recebidos",
      icon: <ArrowDownCircle size={20} />,
      badge: 0,
    },
    {
      id: "projetos",
      label: "Projetos",
      icon: <Building2 size={20} />,
      badge: 5,
    },
    {
      id: "recebidos-nao-finalizados",
      label: "Recebidos não finalizados",
      icon: <Clock size={20} />,
      badge: 0,
    },
    {
      id: "receber-finalizados",
      label: "A receber finalizados",
      icon: <CheckCircle2 size={20} />,
      badge: 0,
    },
    {
      id: "analise-barras",
      label: "Análise de Barras",
      icon: <BarChart3 size={20} />,
      badge: 0,
    },
    {
      id: "analise-pizza",
      label: "Análise de Pizza",
      icon: <PieChart size={20} />,
      badge: 0,
    },
  ]

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = navItems.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredItems(filtered)
    } else {
      setFilteredItems(navItems)
    }
  }, [searchTerm])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: 280,
        bgcolor: colors.background,
        color: colors.textPrimary,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
        borderRight: `1px solid ${colors.divider}`,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo and header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: `1px solid ${colors.divider}`,
          background: `linear-gradient(135deg, ${alpha(colors.primary, 0.2)}, transparent)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              mr: 1.5,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(to right, #ffffff, #a5b4fc)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 10px rgba(255, 255, 255, 0.15)",
              letterSpacing: "0.5px",
            }}
          >
            FinanGroovy
          </Typography>

          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <Tooltip title="Notificações">
              <IconButton
                size="small"
                sx={{
                  color: colors.textSecondary,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: colors.textPrimary,
                    bgcolor: alpha(colors.highlight, 0.15),
                  },
                }}
              >
                <Badge badgeContent={4} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9 } }}>
                  <Bell size={18} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Search input */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: `1px solid ${colors.divider}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: alpha(colors.backgroundLight, 0.6),
            borderRadius: "10px",
            px: 1.5,
            py: 0.75,
            border: `1px solid ${alpha(colors.divider, 0.5)}`,
            transition: "all 0.2s",
            "&:focus-within": {
              bgcolor: alpha(colors.backgroundLight, 0.8),
              boxShadow: `0 0 0 2px ${alpha(colors.highlight, 0.25)}`,
              border: `1px solid ${alpha(colors.highlight, 0.5)}`,
            },
          }}
        >
          <Search size={16} color={colors.textSecondary} />
          <InputBase
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              ml: 1.5,
              flex: 1,
              color: colors.textPrimary,
              fontSize: 14,
              "& .MuiInputBase-input": {
                p: 0,
                "&::placeholder": {
                  color: colors.textSecondary,
                  opacity: 0.7,
                },
              },
            }}
          />
          {searchTerm && (
            <IconButton
              size="small"
              onClick={() => setSearchTerm("")}
              sx={{
                p: 0.25,
                color: colors.textSecondary,
                "&:hover": { color: colors.textPrimary },
              }}
            >
              <Box sx={{ fontSize: 16, fontWeight: "bold" }}>×</Box>
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flexGrow: 1,
          py: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: alpha(colors.primary, 0.5),
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: colors.primary,
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 3,
            py: 1,
            color: colors.textSecondary,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: 11,
          }}
        >
          Menu Principal
        </Typography>

        <List sx={{ px: 1.5 }}>
          {filteredItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5, position: "relative" }}>
              <ListItemButton
                onClick={() => setActiveItem(item.id)}
                sx={{
                  py: 1.25,
                  px: 2,
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  ...(activeItem === item.id
                    ? {
                        background: `linear-gradient(135deg, ${alpha(colors.primary, 0.9)}, ${alpha(
                          colors.accent,
                          0.8,
                        )})`,
                        color: colors.textPrimary,
                        fontWeight: 500,
                        boxShadow: `0 4px 12px ${alpha(colors.primary, 0.25)}`,
                      }
                    : {
                        color: colors.textSecondary,
                        "&:hover": {
                          bgcolor: alpha(colors.backgroundLight, 0.5),
                          transform: "translateX(4px)",
                        },
                      }),
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.id ? colors.textPrimary : colors.secondary,
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: activeItem === item.id ? 500 : 400,
                  }}
                />

                {item.badge > 0 && (
                  <Badge
                    badgeContent={item.badge}
                    color={activeItem === item.id ? "warning" : "primary"}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: 10,
                        height: 18,
                        minWidth: 18,
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}

                {activeItem === item.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: 32,
                      bgcolor: "#ffffff",
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4,
                      animation: "fadeIn 0.2s ease-in-out",
                      "@keyframes fadeIn": {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {filteredItems.length === 0 && (
          <Box sx={{ px: 3, py: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              Nenhum resultado encontrado
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2, borderColor: colors.divider }} />

        <Typography
          variant="caption"
          sx={{
            px: 3,
            py: 1,
            color: colors.textSecondary,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: 11,
          }}
        >
          Atalhos
        </Typography>

        <Box sx={{ px: 3, py: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["Projetos", "Relatórios", "Equipe", "Clientes"].map((shortcut) => (
            <Box
              key={shortcut}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                fontSize: 12,
                fontWeight: 500,
                bgcolor: alpha(colors.backgroundLight, 0.5),
                color: colors.textSecondary,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: alpha(colors.primary, 0.2),
                  color: colors.textPrimary,
                },
              }}
            >
              {shortcut}
            </Box>
          ))}
        </Box>
      </Box>

      {/* User profile and settings */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${colors.divider}`,
          background: `linear-gradient(to top, ${alpha(colors.backgroundLight, 0.3)}, transparent)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              border: `2px solid ${alpha(colors.highlight, 0.3)}`,
              transition: "all 0.2s",
              "&:hover": {
                borderColor: alpha(colors.highlight, 0.6),
                transform: "scale(1.05)",
              },
            }}
          >
            <User size={18} />
          </Avatar>
          <Box sx={{ ml: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary }}>
              Admin
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: colors.success,
                  boxShadow: `0 0 0 2px ${alpha(colors.success, 0.2)}`,
                }}
              />
              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                Plano Premium
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
            <Tooltip title="Configurações">
              <IconButton
                sx={{
                  color: colors.textSecondary,
                  "&:hover": {
                    bgcolor: alpha(colors.backgroundLight, 0.8),
                    color: colors.textPrimary,
                  },
                }}
              >
                <Settings size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sair">
              <IconButton
                sx={{
                  color: colors.textSecondary,
                  "&:hover": {
                    bgcolor: alpha(colors.error, 0.15),
                    color: colors.error,
                  },
                }}
              >
                <LogOut size={18} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
