"use client"

import { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Avatar,
  useTheme,
  alpha,
  Badge,
} from "@mui/material"
import {
  LayoutDashboard,
  CreditCard,
  BarChart2,
  PieChart,
  Settings,
  LogOut,
  Menu,
  X,
  Wallet,
  Users,
  HelpCircle,
  Bell,
  Search,
  Plus,
} from "lucide-react"

// Sidebar width
const DRAWER_WIDTH = 260 // Reduced from 280

export default function Sidebar() {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { text: "Transactions", icon: <CreditCard size={20} /> },
    { text: "Analytics", icon: <BarChart2 size={20} /> },
    { text: "Budgets", icon: <PieChart size={20} /> },
    { text: "Accounts", icon: <Wallet size={20} /> },
    { text: "Shared", icon: <Users size={20} /> },
  ]

  const bottomMenuItems = [
    { text: "Settings", icon: <Settings size={20} /> },
    { text: "Help & Support", icon: <HelpCircle size={20} /> },
    { text: "Logout", icon: <LogOut size={20} /> },
  ]

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "linear-gradient(180deg, #ffffff, #f8fafc)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          opacity: 0.4,
          zIndex: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 25%), radial-gradient(circle at 80% 60%, rgba(139, 92, 246, 0.03) 0%, transparent 30%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo and toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              width: 40,
              height: 40,
              mr: 2,
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
          >
            <Wallet size={20} />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #1e293b, #334155)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            FinanGroovy
          </Typography>
        </Box>
        <IconButton
          onClick={toggleMobileDrawer}
          sx={{
            display: { xs: "flex", md: "none" },
            bgcolor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <X size={18} />
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.6 }} />

      {/* User profile */}
      <Box sx={{ p: 2.5, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Avatar
            src="/placeholder.svg?height=40&width=40"
            alt="User Avatar"
            sx={{
              width: 42,
              height: 42,
              mr: 2,
              border: "2px solid white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Alex Johnson
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha("#64748b", 0.9),
                fontSize: "0.8rem",
              }}
            >
              alex@example.com
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Quick actions */}
      <Box
        sx={{
          px: 2.5,
          mb: 2,
          display: "flex",
          gap: 1.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 1.5,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <IconButton
            sx={{
              bgcolor: alpha("#6366f1", 0.1),
              color: "#6366f1",
              mb: 1,
              "&:hover": {
                bgcolor: alpha("#6366f1", 0.2),
              },
            }}
          >
            <Plus size={18} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "#0f172a",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            Add New
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 1.5,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <IconButton
            sx={{
              bgcolor: alpha("#f59e0b", 0.1),
              color: "#f59e0b",
              mb: 1,
              "&:hover": {
                bgcolor: alpha("#f59e0b", 0.2),
              },
            }}
          >
            <Bell size={18} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "#0f172a",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            Alerts
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            p: 1.5,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <IconButton
            sx={{
              bgcolor: alpha("#10b981", 0.1),
              color: "#10b981",
              mb: 1,
              "&:hover": {
                bgcolor: alpha("#10b981", 0.2),
              },
            }}
          >
            <Search size={18} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "#0f172a",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            Search
          </Typography>
        </Box>
      </Box>

      {/* Main menu items */}
      <List
        sx={{
          px: 2.5,
          py: 1,
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 3,
                py: 1.2,
                px: 2,
                ...(item.active
                  ? {
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                      },
                    }
                  : {
                      bgcolor: "white",
                      color: "#0f172a",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        bgcolor: alpha("#6366f1", 0.05),
                      },
                    }),
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: item.active ? "white" : alpha("#64748b", 0.9),
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
              {item.text === "Transactions" && (
                <Badge
                  badgeContent="3"
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#ef4444",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ opacity: 0.6 }} />

      {/* Bottom menu items */}
      <List
        sx={{
          px: 2.5,
          py: 1.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 3,
                py: 1.2,
                px: 2,
                bgcolor: "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
                border: "1px solid rgba(255, 255, 255, 0.7)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: alpha("#6366f1", 0.05),
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: alpha("#64748b", 0.9),
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#0f172a",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Pro upgrade banner */}
      <Box
        sx={{
          mx: 2.5,
          mb: 2.5,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(15, 23, 42, 0.2)",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.2,
            background:
              "radial-gradient(circle at 90% 90%, #6366f1 0%, transparent 25%), radial-gradient(circle at 10% 10%, #8b5cf6 0%, transparent 25%)",
            zIndex: -1,
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: "0.95rem",
          }}
        >
          Upgrade to Pro
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            mb: 2,
            opacity: 0.8,
          }}
        >
          Get advanced features and premium support
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 2,
              bgcolor: "white",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Learn More
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile drawer toggle */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1100,
          display: { xs: "block", md: "none" },
        }}
      >
        <IconButton
          onClick={toggleMobileDrawer}
          sx={{
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <Menu size={20} />
        </IconButton>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            borderRight: "none",
            zIndex: 1200, // Ensure sidebar is above other content
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            position: "fixed",
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            overflowX: "hidden",
            borderRight: "none",
            boxShadow: "2px 0 20px rgba(0, 0, 0, 0.04)",
            zIndex: 1200,
            height: "100%",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
