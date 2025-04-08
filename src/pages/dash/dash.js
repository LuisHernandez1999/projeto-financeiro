"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  ButtonGroup,
  Chip,
  Avatar,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Paper,
  Container,
} from "@mui/material"
import {
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ChevronRight,
  Home,
  ShoppingBag,
  Car,
  Utensils,
  Wifi,
  Smartphone,
  Briefcase,
  HeartPulse,
  Plus,
  Filter,
  Download,
  LayoutDashboard,
} from "lucide-react"

// Import the sidebar component
import Sidebar from "../../components/sideBar"

// Define sidebar width to use throughout the component
const DRAWER_WIDTH = 260

// Sample data for expenses
const expenseData = [
  { id: 1, category: "Housing", amount: 1200, color: "#6366f1", icon: <Home size={20} /> },
  { id: 2, category: "Shopping", amount: 450, color: "#0ea5e9", icon: <ShoppingBag size={20} /> },
  { id: 3, category: "Transport", amount: 350, color: "#f59e0b", icon: <Car size={20} /> },
  { id: 4, category: "Food", amount: 480, color: "#10b981", icon: <Utensils size={20} /> },
  { id: 5, category: "Utilities", amount: 180, color: "#8b5cf6", icon: <Wifi size={20} /> },
  { id: 6, category: "Phone", amount: 85, color: "#ec4899", icon: <Smartphone size={20} /> },
  { id: 7, category: "Insurance", amount: 120, color: "#3b82f6", icon: <Briefcase size={20} /> },
  { id: 8, category: "Healthcare", amount: 95, color: "#ef4444", icon: <HeartPulse size={20} /> },
]

// Sample data for upcoming expenses
const upcomingExpenses = [
  {
    id: 1,
    name: "Rent Payment",
    amount: 1200,
    dueDate: "2025-04-15",
    category: "Housing",
    icon: <Home size={20} />,
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Car Insurance",
    amount: 120,
    dueDate: "2025-04-18",
    category: "Insurance",
    icon: <Car size={20} />,
    color: "#f59e0b",
  },
  {
    id: 3,
    name: "Internet Bill",
    amount: 65,
    dueDate: "2025-04-20",
    category: "Utilities",
    icon: <Wifi size={20} />,
    color: "#8b5cf6",
  },
  {
    id: 4,
    name: "Phone Bill",
    amount: 85,
    dueDate: "2025-04-22",
    category: "Phone",
    icon: <Smartphone size={20} />,
    color: "#ec4899",
  },
]

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

// Calculate days remaining
const getDaysRemaining = (dateString) => {
  const today = new Date()
  const dueDate = new Date(dateString)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function ExpensesDashboard() {
  const theme = useTheme()
  const [chartType, setChartType] = useState("pie")
  const [isLoading, setIsLoading] = useState(true)

  // Calculate totals
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0)
  const totalIncome = 4500 // Sample income
  const balance = totalIncome - totalExpenses
  const savingsRate = Math.round((balance / totalIncome) * 100)

  // Prepare chart data
  const chartData = expenseData.map((item) => ({
    name: item.category,
    value: item.amount,
    fill: item.fill || item.color,
  }))

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Initialize chart when component mounts or when chartType changes
  useEffect(() => {
    if (!isLoading) {
      // Initialize chart
      const chartContainer = document.getElementById("expense-chart")
      if (chartContainer) {
        chartContainer.innerHTML = ""

        if (chartType === "pie") {
          renderPieChart(chartData, formatCurrency)
        } else {
          renderBarChart(chartData, formatCurrency)
        }
      }
    }
  }, [chartType, isLoading, chartData])

  // Render pie chart using vanilla JavaScript
  const renderPieChart = (data, formatter) => {
    const container = document.getElementById("expense-chart")
    const width = container.clientWidth
    const height = container.clientHeight || 400
    const radius = Math.min(width, height) / 2 - 40

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    container.appendChild(svg)

    // Create group for pie chart
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g.setAttribute("transform", `translate(${width / 2}, ${height / 2})`)
    svg.appendChild(g)

    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Calculate angles for pie slices
    let startAngle = 0
    data.forEach((item, index) => {
      const percentage = item.value / total
      const endAngle = startAngle + percentage * 2 * Math.PI

      // Create pie slice path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

      // Calculate path coordinates
      const x1 = radius * Math.cos(startAngle)
      const y1 = radius * Math.sin(startAngle)
      const x2 = radius * Math.cos(endAngle)
      const y2 = radius * Math.sin(endAngle)

      // Create inner radius for donut chart
      const innerRadius = radius * 0.6
      const x1Inner = innerRadius * Math.cos(startAngle)
      const y1Inner = innerRadius * Math.sin(startAngle)
      const x2Inner = innerRadius * Math.cos(endAngle)
      const y2Inner = innerRadius * Math.sin(endAngle)

      // Create path data
      const largeArcFlag = percentage > 0.5 ? 1 : 0
      const pathData = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        L ${x2Inner} ${y2Inner}
        A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}
        Z
      `

      path.setAttribute("d", pathData)
      path.setAttribute("fill", item.fill)
      path.setAttribute("stroke", "white")
      path.setAttribute("stroke-width", "2")
      path.style.transition = "all 0.3s"

      // Add hover effect
      path.addEventListener("mouseover", () => {
        path.setAttribute("opacity", "0.8")
        showTooltip(item.name, formatter(item.value), item.fill)
      })

      path.addEventListener("mouseout", () => {
        path.setAttribute("opacity", "1")
        hideTooltip()
      })

      g.appendChild(path)

      // Add label
      const midAngle = startAngle + (endAngle - startAngle) / 2
      const labelRadius = radius * 0.8
      const labelX = labelRadius * Math.cos(midAngle)
      const labelY = labelRadius * Math.sin(midAngle)

      if (percentage > 0.05) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", labelX)
        text.setAttribute("y", labelY)
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("dominant-baseline", "middle")
        text.setAttribute("fill", "white")
        text.setAttribute("font-weight", "bold")
        text.setAttribute("font-size", "12px")
        text.textContent = `${Math.round(percentage * 100)}%`
        g.appendChild(text)
      }

      startAngle = endAngle
    })

    // Create tooltip
    const tooltip = document.createElement("div")
    tooltip.id = "chart-tooltip"
    tooltip.style.position = "absolute"
    tooltip.style.padding = "10px"
    tooltip.style.background = "white"
    tooltip.style.borderRadius = "8px"
    tooltip.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
    tooltip.style.pointerEvents = "none"
    tooltip.style.opacity = "0"
    tooltip.style.transition = "opacity 0.2s"
    tooltip.style.zIndex = "1000"
    document.body.appendChild(tooltip)
  }

  // Render bar chart using vanilla JavaScript
  const renderBarChart = (data, formatter) => {
    const container = document.getElementById("expense-chart")
    const width = container.clientWidth
    const height = container.clientHeight || 400
    const margin = { top: 20, right: 20, bottom: 60, left: 60 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    container.appendChild(svg)

    // Create group for chart
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g.setAttribute("transform", `translate(${margin.left}, ${margin.top})`)
    svg.appendChild(g)

    // Calculate max value for scale
    const maxValue = Math.max(...data.map((d) => d.value)) * 1.1

    // Create scales
    const barWidth = (chartWidth / data.length) * 0.7
    const barPadding = (chartWidth / data.length) * 0.3

    // Create axes
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "g")
    xAxis.setAttribute("transform", `translate(0, ${chartHeight})`)
    g.appendChild(xAxis)

    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g.appendChild(yAxis)

    // Create y-axis line
    const yAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
    yAxisLine.setAttribute("x1", 0)
    yAxisLine.setAttribute("y1", 0)
    yAxisLine.setAttribute("x2", 0)
    yAxisLine.setAttribute("y2", chartHeight)
    yAxisLine.setAttribute("stroke", "#e2e8f0")
    yAxis.appendChild(yAxisLine)

    // Create y-axis ticks
    const tickCount = 5
    for (let i = 0; i <= tickCount; i++) {
      const y = chartHeight - (i / tickCount) * chartHeight
      const value = (i / tickCount) * maxValue

      // Tick line
      const tickLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
      tickLine.setAttribute("x1", -5)
      tickLine.setAttribute("y1", y)
      tickLine.setAttribute("x2", chartWidth)
      tickLine.setAttribute("y2", y)
      tickLine.setAttribute("stroke", "#e2e8f0")
      tickLine.setAttribute("stroke-dasharray", i > 0 ? "2,2" : "none")
      yAxis.appendChild(tickLine)

      // Tick label
      const tickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
      tickLabel.setAttribute("x", -10)
      tickLabel.setAttribute("y", y)
      tickLabel.setAttribute("text-anchor", "end")
      tickLabel.setAttribute("dominant-baseline", "middle")
      tickLabel.setAttribute("fill", "#64748b")
      tickLabel.setAttribute("font-size", "12px")
      tickLabel.textContent = formatter(value)
      yAxis.appendChild(tickLabel)
    }

    // Create bars
    data.forEach((item, index) => {
      const x = index * (barWidth + barPadding) + barPadding / 2
      const barHeight = (item.value / maxValue) * chartHeight
      const y = chartHeight - barHeight

      // Create bar
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("x", x)
      rect.setAttribute("y", chartHeight) // Start from bottom for animation
      rect.setAttribute("width", barWidth)
      rect.setAttribute("height", 0) // Start with 0 height for animation
      rect.setAttribute("fill", item.fill)
      rect.setAttribute("rx", "4")
      rect.setAttribute("ry", "4")
      rect.style.transition = "y 0.5s ease, height 0.5s ease"

      // Add hover effect
      rect.addEventListener("mouseover", () => {
        rect.setAttribute("opacity", "0.8")
        showTooltip(item.name, formatter(item.value), item.fill)
      })

      rect.addEventListener("mouseout", () => {
        rect.setAttribute("opacity", "1")
        hideTooltip()
      })

      g.appendChild(rect)

      // Animate the bar after a delay
      setTimeout(() => {
        rect.setAttribute("y", y)
        rect.setAttribute("height", barHeight)
      }, 100 * index)

      // Create x-axis label
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
      label.setAttribute("x", x + barWidth / 2)
      label.setAttribute("y", chartHeight + 20)
      label.setAttribute("text-anchor", "middle")
      label.setAttribute("fill", "#64748b")
      label.setAttribute("font-size", "12px")
      label.textContent = item.name
      xAxis.appendChild(label)
    })

    // Create tooltip
    const tooltip = document.createElement("div")
    tooltip.id = "chart-tooltip"
    tooltip.style.position = "absolute"
    tooltip.style.padding = "10px"
    tooltip.style.background = "white"
    tooltip.style.borderRadius = "8px"
    tooltip.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
    tooltip.style.pointerEvents = "none"
    tooltip.style.opacity = "0"
    tooltip.style.transition = "opacity 0.2s"
    tooltip.style.zIndex = "1000"
    document.body.appendChild(tooltip)
  }

  // Show tooltip
  const showTooltip = (name, value, color) => {
    const tooltip = document.getElementById("chart-tooltip")
    if (tooltip) {
      tooltip.innerHTML = `
        <div style="color: ${color}; font-weight: bold; margin-bottom: 4px;">${name}</div>
        <div style="font-weight: bold;">${value}</div>
      `
      tooltip.style.opacity = "1"

      // Position tooltip near mouse
      document.addEventListener("mousemove", positionTooltip)
    }
  }

  // Position tooltip
  const positionTooltip = (e) => {
    const tooltip = document.getElementById("chart-tooltip")
    if (tooltip) {
      tooltip.style.left = `${e.pageX + 10}px`
      tooltip.style.top = `${e.pageY - 10}px`
    }
  }

  // Hide tooltip
  const hideTooltip = () => {
    const tooltip = document.getElementById("chart-tooltip")
    if (tooltip) {
      tooltip.style.opacity = "0"
      document.removeEventListener("mousemove", positionTooltip)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          ml: { md: `${DRAWER_WIDTH}px` },
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          overflow: "auto",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "1500px", // Aumentado de 1400px para 1500px
            px: { xs: 1, sm: 2, md: 3 },
            mx: "auto",
            pl: { md: 3 },
          }}
        >
          {/* Dashboard header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  background: "#6366f1",
                  color: "white",
                  width: 40,
                  height: 40,
                  mr: 2,
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <LayoutDashboard size={22} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    mb: 0.5,
                  }}
                >
                  Expenses Dashboard
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#64748b",
                    maxWidth: "500px",
                  }}
                >
                  Track, analyze and manage your expenses efficiently
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Calendar size={18} />}
                sx={{
                  borderRadius: 2,
                  borderColor: "#e2e8f0",
                  color: "#334155",
                  bgcolor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#cbd5e1",
                    bgcolor: "white",
                  },
                }}
              >
                April 2025
              </Button>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 5px rgba(99, 102, 241, 0.2)",
                  bgcolor: "#6366f1",
                  px: 2,
                  py: 1,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#4f46e5",
                  },
                }}
              >
                Add Expense
              </Button>
            </Box>
          </Box>

          {/* Stats cards */}
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {/* Monthly Income Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Monthly Income
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "#10b981",
                        color: "white",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <TrendingUp size={18} />
                    </Avatar>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#0f172a",
                      fontSize: "1.75rem", // Aumentado tamanho da fonte
                    }}
                  >
                    {formatCurrency(totalIncome)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      icon={<ArrowUpRight size={14} />}
                      label="12% from last month"
                      size="small"
                      sx={{
                        bgcolor: alpha("#10b981", 0.1),
                        color: "#059669",
                        fontWeight: 500,
                        borderRadius: "12px",
                        height: "24px",
                        "& .MuiChip-icon": {
                          color: "#059669",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Balance Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Current Balance
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "#6366f1",
                        color: "white",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <Wallet size={18} />
                    </Avatar>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#0f172a",
                      fontSize: "1.75rem", // Aumentado tamanho da fonte
                    }}
                  >
                    {formatCurrency(balance)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "#64748b", mr: 1, fontSize: "0.875rem" }}>
                      Savings rate:
                    </Typography>
                    <Chip
                      label={`${savingsRate}%`}
                      size="small"
                      sx={{
                        bgcolor: alpha("#6366f1", 0.1),
                        color: "#4f46e5",
                        fontWeight: 600,
                        borderRadius: "12px",
                        height: "24px",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Monthly Expenses Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Monthly Expenses
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "#ef4444",
                        color: "white",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <TrendingDown size={18} />
                    </Avatar>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#0f172a",
                      fontSize: "1.75rem", // Aumentado tamanho da fonte
                    }}
                  >
                    {formatCurrency(totalExpenses)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      icon={<ArrowDownRight size={14} />}
                      label="8% from last month"
                      size="small"
                      sx={{
                        bgcolor: alpha("#ef4444", 0.1),
                        color: "#dc2626",
                        fontWeight: 500,
                        borderRadius: "12px",
                        height: "24px",
                        "& .MuiChip-icon": {
                          color: "#dc2626",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Upcoming Expenses Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Upcoming Expenses
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: "#f59e0b",
                        color: "white",
                        width: 36,
                        height: 36,
                      }}
                    >
                      <Clock size={18} />
                    </Avatar>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#0f172a",
                      fontSize: "1.75rem", // Aumentado tamanho da fonte
                    }}
                  >
                    {formatCurrency(upcomingExpenses.reduce((sum, item) => sum + item.amount, 0))}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "#64748b", mr: 1, fontSize: "0.875rem" }}>
                      Next due:
                    </Typography>
                    <Chip
                      label={formatDate(upcomingExpenses[0].dueDate)}
                      size="small"
                      sx={{
                        bgcolor: alpha("#f59e0b", 0.1),
                        color: "#d97706",
                        fontWeight: 600,
                        borderRadius: "12px",
                        height: "24px",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main content area */}
          <Grid container spacing={4}>
            {/* Chart section */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <Box sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2.5,
                      flexWrap: "wrap",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#0f172a",
                      }}
                    >
                      Expense Breakdown
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Filter size={16} />}
                        sx={{
                          borderRadius: 2,
                          borderColor: "#e2e8f0",
                          color: "#334155",
                          bgcolor: "white",
                          textTransform: "none",
                          fontSize: "0.8125rem",
                          "&:hover": {
                            borderColor: "#cbd5e1",
                            bgcolor: "white",
                          },
                        }}
                      >
                        Filter
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download size={16} />}
                        sx={{
                          borderRadius: 2,
                          borderColor: "#e2e8f0",
                          color: "#334155",
                          bgcolor: "white",
                          textTransform: "none",
                          fontSize: "0.8125rem",
                          "&:hover": {
                            borderColor: "#cbd5e1",
                            bgcolor: "white",
                          },
                        }}
                      >
                        Export
                      </Button>
                      <ButtonGroup
                        size="small"
                        aria-label="chart type"
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <Button
                          variant={chartType === "pie" ? "contained" : "outlined"}
                          onClick={() => setChartType("pie")}
                          startIcon={<PieChart size={16} />}
                          sx={{
                            borderRadius: "8px 0 0 8px",
                            textTransform: "none",
                            fontSize: "0.8125rem",
                            ...(chartType === "pie"
                              ? {
                                  bgcolor: "#6366f1",
                                  "&:hover": {
                                    bgcolor: "#4f46e5",
                                  },
                                }
                              : {
                                  bgcolor: "white",
                                  color: "#334155",
                                  borderColor: "#e2e8f0",
                                  "&:hover": {
                                    bgcolor: "white",
                                    borderColor: "#cbd5e1",
                                  },
                                }),
                          }}
                        >
                          Pie
                        </Button>
                        <Button
                          variant={chartType === "bar" ? "contained" : "outlined"}
                          onClick={() => setChartType("bar")}
                          startIcon={<BarChart3 size={16} />}
                          sx={{
                            borderRadius: "0 8px 8px 0",
                            textTransform: "none",
                            fontSize: "0.8125rem",
                            ...(chartType === "bar"
                              ? {
                                  bgcolor: "#6366f1",
                                  "&:hover": {
                                    bgcolor: "#4f46e5",
                                  },
                                }
                              : {
                                  bgcolor: "white",
                                  color: "#334155",
                                  borderColor: "#e2e8f0",
                                  "&:hover": {
                                    bgcolor: "white",
                                    borderColor: "#cbd5e1",
                                  },
                                }),
                          }}
                        >
                          Bar
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      height: 350,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {isLoading ? (
                      <Box sx={{ width: "100%", textAlign: "center" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 6,
                            bgcolor: alpha("#6366f1", 0.1),
                            borderRadius: 1,
                            mb: 2,
                            position: "relative",
                            overflow: "hidden",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "30%",
                              height: "100%",
                              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                              animation: "loading 1.5s infinite",
                              borderRadius: 1,
                            },
                            "@keyframes loading": {
                              "0%": {
                                left: "-30%",
                              },
                              "100%": {
                                left: "100%",
                              },
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          Loading chart data...
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        id="expense-chart"
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Upcoming expenses section */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f1f5f9",
                  background: "white",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <Box sx={{ p: 3 }}>
                  {/* Aumentado padding de 2.5 para 3 */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#0f172a",
                      }}
                    >
                      Upcoming Expenses
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: "#f8fafc",
                        width: 28,
                        height: 28,
                        color: "#64748b",
                        "&:hover": { bgcolor: "#f1f5f9" },
                      }}
                    >
                      <MoreVertical size={16} />
                    </IconButton>
                  </Box>

                  <List sx={{ px: 0 }}>
                    {upcomingExpenses.map((expense, index) => {
                      const daysLeft = getDaysRemaining(expense.dueDate)
                      const isUrgent = daysLeft <= 3

                      return (
                        <Box key={expense.id}>
                          <ListItem
                            sx={{
                              px: 2,
                              py: 1.5,
                              borderRadius: 2,
                              mb: 1,
                              bgcolor: alpha(expense.color, 0.03),
                              border: `1px solid ${alpha(expense.color, 0.08)}`,
                              transition: "all 0.2s",
                              "&:hover": {
                                bgcolor: alpha(expense.color, 0.08),
                                transform: "translateX(4px)",
                              },
                            }}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                sx={{
                                  color: expense.color,
                                  bgcolor: alpha(expense.color, 0.1),
                                  width: 24,
                                  height: 24,
                                  "&:hover": {
                                    bgcolor: alpha(expense.color, 0.2),
                                  },
                                }}
                              >
                                <ChevronRight size={14} />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar sx={{ minWidth: 44 }}>
                              <Avatar
                                sx={{
                                  bgcolor: alpha(expense.color, 0.1),
                                  color: expense.color,
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                {expense.icon}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    color: "#0f172a",
                                    mb: 0.25,
                                    fontSize: "0.9375rem",
                                  }}
                                >
                                  {expense.name}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#64748b",
                                      display: "flex",
                                      alignItems: "center",
                                      fontWeight: 500,
                                      fontSize: "0.8125rem",
                                    }}
                                  >
                                    <DollarSign size={14} style={{ marginRight: 2 }} />
                                    {formatCurrency(expense.amount)}
                                  </Typography>
                                  <Chip
                                    label={`${daysLeft} days left`}
                                    size="small"
                                    sx={{
                                      fontSize: "0.6875rem",
                                      height: 18,
                                      fontWeight: 600,
                                      bgcolor: isUrgent ? alpha("#ef4444", 0.1) : alpha("#f59e0b", 0.1),
                                      color: isUrgent ? "#dc2626" : "#d97706",
                                      borderRadius: "9px",
                                    }}
                                  />
                                </Box>
                              }
                            />
                          </ListItem>
                          {index < upcomingExpenses.length - 1 && (
                            <Box
                              sx={{
                                height: 1,
                                bgcolor: "#f1f5f9",
                                width: "92%",
                                mx: "auto",
                                my: 0.5,
                              }}
                            />
                          )}
                        </Box>
                      )
                    })}
                  </List>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        borderColor: alpha("#6366f1", 0.3),
                        color: "#6366f1",
                        fontWeight: 600,
                        textTransform: "none",
                        bgcolor: alpha("#6366f1", 0.03),
                        "&:hover": {
                          borderColor: "#6366f1",
                          bgcolor: alpha("#6366f1", 0.05),
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      View All Expenses
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
