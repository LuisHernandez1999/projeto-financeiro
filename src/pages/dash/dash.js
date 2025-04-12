"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Typography,
  MenuItem,
  useTheme,
  alpha,
  Card,
  CardContent,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip,
  Button,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Slider,
  Pagination,
  Menu,
  Fade,
  Grow,
  Zoom,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
  Stack,
  Avatar,
  Fab,
  Drawer,
  Snackbar,
  Alert,
} from "@mui/material"
import { CreditCard, Calendar, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Filter, TrendingUp, TrendingDown, Info, Search, Building2, Ruler, Hammer, Truck, Wrench, ChevronDown, SlidersHorizontal, X, Check, ArrowUpDown, Plus, FileText, Clock, DollarSign, CalendarDays, Save, Eye, Edit, Trash2 } from 'lucide-react'
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ptBR } from "date-fns/locale"
import dynamic from "next/dynamic"

// Importação dinâmica do componente para evitar problemas de SSR
const FinanceSidebar = dynamic(() => import("../../components/finance-sidebar"), {
  ssr: false,
})

export default function GastosPage() {
  const [selectedMonth, setSelectedMonth] = useState("6")
  const [chartType, setChartType] = useState("pie") // Começar com pie chart
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([
    "materiais",
    "maodeobra",
    "equipamentos",
    "licencas",
    "consultoria",
  ])
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [hoveredPieSlice, setHoveredPieSlice] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [valueRange, setValueRange] = useState([0, 100000])
  const [tableSearchTerm, setTableSearchTerm] = useState("")
  const [tableValueRange, setTableValueRange] = useState([0, 100000])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [monthMenuAnchor, setMonthMenuAnchor] = useState(null)
  const [sortDirection, setSortDirection] = useState("desc") // "asc" ou "desc"
  const [sortBy, setSortBy] = useState("value") // "name" ou "value"
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: "",
    value: "",
    category: "materiais",
    date: new Date(),
    project: "",
  })
  const [expenses, setExpenses] = useState([
    {
      id: "E001",
      description: "Compra de cimento",
      value: 3500.75,
      category: "materiais",
      date: new Date(2023, 5, 15),
      project: "P001",
    },
    {
      id: "E002",
      description: "Pagamento equipe de obra",
      value: 8200.50,
      category: "maodeobra",
      date: new Date(2023, 5, 18),
      project: "P002",
    },
    {
      id: "E003",
      description: "Aluguel de escavadeira",
      value: 4750.00,
      category: "equipamentos",
      date: new Date(2023, 5, 20),
      project: "P003",
    },
    {
      id: "E004",
      description: "Licença ambiental",
      value: 2300.25,
      category: "licencas",
      date: new Date(2023, 5, 22),
      project: "P004",
    },
    {
      id: "E005",
      description: "Consultoria BIM estrutural",
      value: 5800.00,
      category: "consultoria",
      date: new Date(2023, 5, 25),
      project: "P005",
    },
  ])
  const [expensePage, setExpensePage] = useState(0)
  const [expenseRowsPerPage, setExpenseRowsPerPage] = useState(5)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")
  
  const barChartRef = useRef(null)
  const pieChartRef = useRef(null)
  const theme = useTheme()

  // Modificar o objeto colors para ter background branco
  const colors = {
    primary: "#1e40af", // Deeper blue
    secondary: "#0ea5e9", // Bright cyan
    background: "#f8fafc", // Light background
    cardBackground: "#ffffff",
    chartBackground: "#ffffff", // Background branco para os gráficos
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    divider: "rgba(0, 0, 0, 0.06)",
    chart: {
      materiais: "#3b82f6",
      maodeobra: "#0ea5e9",
      equipamentos: "#10b981",
      licencas: "#f59e0b",
      consultoria: "#ef4444",
    },
    chartGradient: {
      materiais: "linear-gradient(135deg, #3b82f6, #60a5fa)",
      maodeobra: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
      equipamentos: "linear-gradient(135deg, #10b981, #34d399)",
      licencas: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      consultoria: "linear-gradient(135deg, #ef4444, #f87171)",
    },
  }

  // Dados de exemplo para os gráficos - Adaptados para engenharia civil
  const monthlyExpenses = {
    "1": 82450.75,
    "2": 92780.3,
    "3": 78100.5,
    "4": 103200.25,
    "5": 89900.8,
    "6": 95450.6,
    "7": 88800.4,
    "8": 93100.2,
    "9": 86600.9,
    "10": 92950.7,
    "11": 103300.45,
    "12": 108800.15,
  }

  // Dados de categorias por mês - Adaptados para engenharia civil
  const categoryExpensesByMonth = {
    "1": { materiais: 33735.22, maodeobra: 24612.69, equipamentos: 12367.61, licencas: 5245.08, consultoria: 6490.15 },
    "2": { materiais: 38834.09, maodeobra: 27695.08, equipamentos: 14417.05, licencas: 5278.03, consultoria: 6556.06 },
    "3": { materiais: 31630.15, maodeobra: 23525.13, equipamentos: 11315.08, licencas: 5210.05, consultoria: 6420.1 },
    "4": { materiais: 42960.08, maodeobra: 30800.06, equipamentos: 16480.04, licencas: 6320.03, consultoria: 6640.05 },
    "5": { materiais: 36870.24, maodeobra: 26725.2, equipamentos: 14435.12, licencas: 5290.08, consultoria: 6580.16 },
    "6": { materiais: 39035.18, maodeobra: 28862.65, equipamentos: 15517.59, licencas: 5345.06, consultoria: 6690.12 },
    "7": { materiais: 36840.12, maodeobra: 26700.1, equipamentos: 13420.06, licencas: 5280.04, consultoria: 6560.08 },
    "8": { materiais: 38930.06, maodeobra: 27775.05, equipamentos: 14465.03, licencas: 5310.02, consultoria: 6620.04 },
    "9": { materiais: 35780.27, maodeobra: 25650.23, equipamentos: 13390.14, licencas: 5260.09, consultoria: 6520.18 },
    "10": { materiais: 38885.21, maodeobra: 27737.68, equipamentos: 14442.61, licencas: 5295.07, consultoria: 6590.14 },
    "11": { materiais: 42990.14, maodeobra: 30825.11, equipamentos: 16495.07, licencas: 6330.05, consultoria: 6660.09 },
    "12": { materiais: 45140.05, maodeobra: 32950.04, equipamentos: 17570.02, licencas: 6380.02, consultoria: 6760.03 },
  }

  // Projetos de exemplo para engenharia civil
  const projectsData = [
    { 
      id: "P001", 
      name: "Edifício Comercial Centro", 
      value: 28500.25, 
      category: "materiais",
      description: "Construção de edifício comercial de 12 andares no centro da cidade",
      startDate: "2023-03-15",
      endDate: "2024-06-30",
      status: "Em andamento",
      manager: "Carlos Silva",
      client: "Construtora Horizonte",
      location: "Centro, São Paulo"
    },
    { 
      id: "P002", 
      name: "Residencial Parque Verde", 
      value: 22350.8, 
      category: "materiais",
      description: "Construção de condomínio residencial com 120 unidades e área verde",
      startDate: "2023-04-10",
      endDate: "2024-08-15",
      status: "Em andamento",
      manager: "Ana Oliveira",
      client: "Incorporadora Verde Vida",
      location: "Zona Sul, Rio de Janeiro"
    },
    { 
      id: "P003", 
      name: "Ponte Rio Azul", 
      value: 18750.4, 
      category: "equipamentos",
      description: "Construção de ponte estaiada sobre o Rio Azul com 800m de extensão",
      startDate: "2023-02-20",
      endDate: "2025-01-10",
      status: "Em andamento",
      manager: "Roberto Mendes",
      client: "Prefeitura Municipal",
      location: "Rio Azul, Paraná"
    },
    { 
      id: "P004", 
      name: "Reforma Hospital Central", 
      value: 15200.6, 
      category: "maodeobra",
      description: "Reforma e ampliação do Hospital Central com novos 3 pavilhões",
      startDate: "2023-05-05",
      endDate: "2024-03-20",
      status: "Em andamento",
      manager: "Juliana Costa",
      client: "Secretaria de Saúde",
      location: "Belo Horizonte, MG"
    },
    { 
      id: "P005", 
      name: "Modelagem BIM Aeroporto", 
      value: 12800.3, 
      category: "consultoria",
      description: "Desenvolvimento de modelo BIM completo para o novo terminal aeroportuário",
      startDate: "2023-06-01",
      endDate: "2023-12-15",
      status: "Em andamento",
      manager: "Paulo Mendonça",
      client: "Infraero",
      location: "Brasília, DF"
    },
  ]

  // Filtrar projetos com base no termo de busca e faixa de valores
  const filteredProjects = projectsData.filter(
    (project) =>
      project.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) &&
      project.value >= tableValueRange[0] &&
      project.value <= tableValueRange[1] &&
      selectedCategories.includes(project.category),
  )

  // Ordenar projetos
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else {
      return sortDirection === "asc" ? a.value - b.value : b.value - a.value
    }
  })

  // Paginação
  const indexOfLastProject = currentPage * rowsPerPage
  const indexOfFirstProject = indexOfLastProject - rowsPerPage
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(sortedProjects.length / rowsPerPage)

  // Filtrar despesas
  const filteredExpenses = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(expensePage * expenseRowsPerPage, expensePage * expenseRowsPerPage + expenseRowsPerPage)

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const monthIcons = [
    "❄️", // Janeiro
    "💘", // Fevereiro
    "🌱", // Março
    "🌧️", // Abril
    "🌷", // Maio
    "☀️", // Junho
    "🏖️", // Julho
    "🌞", // Agosto
    "🍂", // Setembro
    "🎃", // Outubro
    "🍁", // Novembro
    "🎄", // Dezembro
  ]

  const categoryNames = {
    materiais: "Materiais",
    maodeobra: "Mão de Obra",
    equipamentos: "Equipamentos",
    licencas: "Licenças e Projetos",
    consultoria: "Consultoria BIM",
  }

  const categoryIcons = {
    materiais: <Building2 size={16} />,
    maodeobra: <Hammer size={16} />,
    equipamentos: <Truck size={16} />,
    licencas: <Ruler size={16} />,
    consultoria: <Wrench size={16} />,
  }

  const currentMonthExpense = monthlyExpenses[selectedMonth]
  const previousMonthExpense = monthlyExpenses[selectedMonth === "1" ? "12" : String(Number(selectedMonth) - 1)]
  const percentageChange = ((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100
  const isIncrease = percentageChange > 0

  // Total anual de gastos
  const totalAnnualExpense = Object.values(monthlyExpenses).reduce((sum, expense) => sum + expense, 0)

  // Categorias do mês selecionado
  const currentMonthCategories = categoryExpensesByMonth[selectedMonth]

  // Encontrar maior e menor gasto por categoria no mês atual
  const maxCategory = Object.entries(currentMonthCategories).reduce(
    (max, [category, value]) => (value > max.value ? { category, value } : max),
    { category: "", value: 0 },
  )

  const minCategory = Object.entries(currentMonthCategories).reduce(
    (min, [category, value]) => (value < min.value || min.value === 0 ? { category, value } : min),
    { category: "", value: Number.MAX_VALUE },
  )

  // Filtrar categorias selecionadas
  const filteredCategories = Object.entries(currentMonthCategories)
    .filter(([category]) => selectedCategories.includes(category))
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType)
    }
  }

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length > 1) {
        // Manter pelo menos uma categoria selecionada
        setSelectedCategories(selectedCategories.filter((c) => c !== category))
      }
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleMonthMenuOpen = (event) => {
    setMonthMenuAnchor(event.currentTarget)
  }

  const handleMonthMenuClose = () => {
    setMonthMenuAnchor(null)
  }

  const handleMonthSelect = (month) => {
    setSelectedMonth(month)
    handleMonthMenuClose()
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleSortToggle = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("desc")
    }
  }

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project)
    setProjectModalOpen(true)
  }

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false)
  }

  const handleOpenExpenseModal = () => {
    setNewExpense({
      description: "",
      value: "",
      category: "materiais",
      date: new Date(),
      project: "",
    })
    setExpenseModalOpen(true)
  }

  const handleCloseExpenseModal = () => {
    setExpenseModalOpen(false)
  }

  const handleExpenseChange = (field, value) => {
    setNewExpense({
      ...newExpense,
      [field]: value,
    })
  }

  const handleExpenseSubmit = () => {
    // Validação básica
    if (!newExpense.description || !newExpense.value || !newExpense.category) {
      setSnackbarMessage("Por favor, preencha todos os campos obrigatórios")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
      return
    }

    // Criar nova despesa
    const newId = `E${String(expenses.length + 1).padStart(3, '0')}`
    const expenseToAdd = {
      ...newExpense,
      id: newId,
      value: parseFloat(newExpense.value),
    }

    setExpenses([expenseToAdd, ...expenses])
    setExpenseModalOpen(false)
    setSnackbarMessage("Despesa registrada com sucesso!")
    setSnackbarSeverity("success")
    setSnackbarOpen(true)
  }

  const handleExpensePageChange = (event, newPage) => {
    setExpensePage(newPage)
  }

  const handleExpenseRowsPerPageChange = (event) => {
    setExpenseRowsPerPage(parseInt(event.target.value, 10))
    setExpensePage(0)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  // Efeito para animação do gráfico de pizza
  useEffect(() => {
    if (chartType === "pie") {
      const timer = setTimeout(() => {
        const paths = document.querySelectorAll(".pie-slice")
        paths.forEach((path, index) => {
          setTimeout(() => {
            path.classList.add("animate-in")
          }, index * 100)
        })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [chartType, selectedMonth, selectedCategories])

  // Efeito para animação do gráfico de barras
  useEffect(() => {
    if (chartType === "bar" && barChartRef.current) {
      const bars = barChartRef.current.querySelectorAll(".bar-item")
      bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.height = bar.dataset.height
          bar.style.opacity = "1"
        }, index * 100)
      })
    }
  }, [chartType, selectedMonth, selectedCategories])

  // Efeito para animação 3D no hover do gráfico
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (pieChartRef.current) {
        const { left, top, width, height } = pieChartRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5

        pieChartRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
      }

      if (barChartRef.current) {
        const { left, top, width, height } = barChartRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5

        barChartRef.current.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`
      }
    }

    const handleMouseLeave = () => {
      if (pieChartRef.current) {
        pieChartRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
      }
      if (barChartRef.current) {
        barChartRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
      }
    }

    if (chartType === "pie" && pieChartRef.current) {
      pieChartRef.current.addEventListener("mousemove", handleMouseMove)
      pieChartRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    if (chartType === "bar" && barChartRef.current) {
      barChartRef.current.addEventListener("mousemove", handleMouseMove)
      barChartRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.removeEventListener("mousemove", handleMouseMove)
        pieChartRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (barChartRef.current) {
        barChartRef.current.removeEventListener("mousemove", handleMouseMove)
        barChartRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [chartType, pieChartRef.current, barChartRef.current])

  // CSS para animações do gráfico de pizza
  const pieAnimationStyles = `
    @keyframes pieSliceAnimate {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .pie-slice {
      opacity: 0;
      transform-origin: center;
    }

    .pie-slice.animate-in {
      animation: pieSliceAnimate 0.5s forwards ease-out;
    }
    
    @keyframes barGrow {
      from {
        height: 0;
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .bar-item {
      height: 0;
      opacity: 0;
      transition: height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    .pulse-on-hover:hover {
      animation: pulse 1s infinite;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    .float-animation {
      animation: float 3s ease-in-out infinite;
    }
  `

  return (
    <>
      <style>{pieAnimationStyles}</style>
      <Box sx={{ minHeight: "100vh", bgcolor: colors.background, display: "flex" }}>
        <FinanceSidebar />

        <Box
          sx={{
            flexGrow: 1,
            pl: "280px", // Sidebar fixa com 280px
            transition: "padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {/* Título melhorado */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ position: "relative" }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      color: colors.textPrimary,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      letterSpacing: "-0.5px",
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    Gestão de Gastos - Engenharia Civil
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "40%",
                      height: 3,
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                      borderRadius: "2px",
                    }}
                  />
                </Box>

                {/* Seletor de mês aprimorado */}
                <Box>
                  <Button
                    variant="outlined"
                    onClick={handleMonthMenuOpen}
                    endIcon={<ChevronDown size={16} />}
                    startIcon={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box component="span" sx={{ mr: 0.5, fontSize: "1.2rem" }}>
                          {monthIcons[Number.parseInt(selectedMonth) - 1]}
                        </Box>
                      </Box>
                    }
                    sx={{
                      borderRadius: 2,
                      borderColor: alpha(colors.primary, 0.3),
                      color: colors.primary,
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: colors.primary,
                        backgroundColor: alpha(colors.primary, 0.05),
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 8px ${alpha(colors.primary, 0.15)}`,
                      },
                    }}
                  >
                    {monthNames[Number.parseInt(selectedMonth) - 1]}
                  </Button>
                  <Menu
                    anchorEl={monthMenuAnchor}
                    open={Boolean(monthMenuAnchor)}
                    onClose={handleMonthMenuClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 180,
                        overflow: "visible",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <Box sx={{ p: 1, maxHeight: 300, overflowY: "auto" }}>
                      {monthNames.map((month, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleMonthSelect((index + 1).toString())}
                          selected={selectedMonth === (index + 1).toString()}
                          sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: alpha(colors.primary, 0.1),
                            },
                            "&.Mui-selected": {
                              backgroundColor: alpha(colors.primary, 0.1),
                              "&:hover": {
                                backgroundColor: alpha(colors.primary, 0.15),
                              },
                            },
                          }}
                        >
                          <Box component="span" sx={{ mr: 1.5, fontSize: "1.2rem" }}>
                            {monthIcons[index]}
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {month}
                          </Typography>
                          {selectedMonth === (index + 1).toString() && (
                            <Check size={16} style={{ marginLeft: "auto", color: colors.primary }} />
                          )}
                        </MenuItem>
                      ))}
                    </Box>
                  </Menu>
                </Box>
              </Box>

              {/* Detalhe entre o título e as cards */}
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  border: `1px solid ${colors.divider}`,
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  background: `linear-gradient(to right, ${alpha(colors.primary, 0.03)}, ${alpha(
                    colors.secondary,
                    0.03,
                  )})`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    bgcolor: alpha(colors.primary, 0.1),
                    color: colors.primary,
                    mr: 1.5,
                  }}
                >
                  <Info size={14} />
                </Box>
                <Typography variant="body2" sx={{ color: colors.textSecondary, fontWeight: 500 }}>
                  Visualize os gastos de projetos de engenharia civil e BIM em{" "}
                  {monthNames[Number.parseInt(selectedMonth) - 1]}. Use os filtros para personalizar sua análise por
                  categoria, nome de projeto ou valor.
                </Typography>
              </Paper>
            </Box>

            {/* Cards com alinhamento melhorado */}
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: { xs: "wrap", md: "nowrap" } }}>
              {/* Card de Total de Gastos */}
              <Card
                elevation={0}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 0" },
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: `1px solid ${colors.divider}`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                  }}
                />
                <CardContent sx={{ p: 1.5, display: "flex", alignItems: "center", height: 100 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: alpha(colors.primary, 0.1),
                      color: colors.primary,
                      mr: 1.5,
                    }}
                  >
                    <CreditCard size={18} />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block" }}>
                      Total de Gastos
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: colors.textPrimary,
                        lineHeight: 1.2,
                        textAlign: "right",
                      }}
                    >
                      R$ {totalAnnualExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block", textAlign: "right" }}>
                      Total acumulado no ano
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Card de Gastos por Mês */}
              <Card
                elevation={0}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 0" },
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: `1px solid ${colors.divider}`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    background: `linear-gradient(to right, ${colors.secondary}, ${colors.success})`,
                  }}
                />
                <CardContent sx={{ p: 1.5, display: "flex", alignItems: "center", height: 100 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: alpha(colors.secondary, 0.1),
                      color: colors.secondary,
                      mr: 1.5,
                    }}
                  >
                    <Calendar size={18} />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block" }}>
                      Gastos em {monthNames[Number.parseInt(selectedMonth) - 1]}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: colors.textPrimary,
                          lineHeight: 1.2,
                          textAlign: "right",
                        }}
                      >
                        R$ {currentMonthExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                          px: 0.75,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: isIncrease ? alpha(colors.error, 0.1) : alpha(colors.success, 0.1),
                          color: isIncrease ? colors.error : colors.success,
                        }}
                      >
                        {isIncrease ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        <Typography variant="caption" sx={{ fontWeight: 600, ml: 0.25, fontSize: "0.65rem" }}>
                          {Math.abs(percentageChange).toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block", textAlign: "right" }}>
                      vs. mês anterior
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Card de Maior Gasto */}
              <Card
                elevation={0}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 0" },
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: `1px solid ${colors.divider}`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    background: `linear-gradient(to right, ${colors.error}, ${colors.warning})`,
                  }}
                />
                <CardContent sx={{ p: 1.5, display: "flex", alignItems: "center", height: 100 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: alpha(colors.error, 0.1),
                      color: colors.error,
                      mr: 1.5,
                    }}
                  >
                    <TrendingUp size={18} />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block" }}>
                      Maior Gasto
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: colors.textPrimary,
                        lineHeight: 1.2,
                        textAlign: "right",
                      }}
                    >
                      R$ {maxCategory.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block", textAlign: "right" }}>
                      {categoryNames[maxCategory.category]}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Card de Menor Gasto */}
              <Card
                elevation={0}
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 0" },
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: `1px solid ${colors.divider}`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 3,
                    width: "100%",
                    background: `linear-gradient(to right, ${colors.success}, ${colors.secondary})`,
                  }}
                />
                <CardContent sx={{ p: 1.5, display: "flex", alignItems: "center", height: 100 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: alpha(colors.success, 0.1),
                      color: colors.success,
                      mr: 1.5,
                    }}
                  >
                    <TrendingDown size={18} />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block" }}>
                      Menor Gasto
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: colors.textPrimary,
                        lineHeight: 1.2,
                        textAlign: "right",
                      }}
                    >
                      R$ {minCategory.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, display: "block", textAlign: "right" }}>
                      {categoryNames[minCategory.category]}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Filtros de busca e valor */}
            <Box sx={{ mb: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  border: `1px solid ${colors.divider}`,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  alignItems: { xs: "stretch", md: "center" },
                }}
              >
                <TextField
                  size="small"
                  placeholder="Buscar projeto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color={colors.textSecondary} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      backgroundColor: alpha(colors.primary, 0.02),
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: alpha(colors.primary, 0.05),
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        boxShadow: `0 0 0 2px ${alpha(colors.primary, 0.2)}`,
                      },
                    },
                  }}
                />

                <Box sx={{ flex: 3, px: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: colors.textSecondary, fontWeight: 500 }}>
                    Faixa de Valor: R$ {valueRange[0].toLocaleString("pt-BR")} - R${" "}
                    {valueRange[1].toLocaleString("pt-BR")}
                  </Typography>
                  <Slider
                    value={valueRange}
                    onChange={(e, newValue) => setValueRange(newValue)}
                    min={0}
                    max={100000}
                    step={1000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                    sx={{
                      color: colors.primary,
                      "& .MuiSlider-thumb": {
                        width: 14,
                        height: 14,
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: `0 0 0 8px ${alpha(colors.primary, 0.16)}`,
                        },
                      },
                      "& .MuiSlider-rail": {
                        opacity: 0.3,
                      },
                    }}
                  />
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSearchTerm("")
                    setValueRange([0, 100000])
                    setSelectedCategories(Object.keys(categoryNames))
                  }}
                  sx={{
                    borderColor: alpha(colors.primary, 0.3),
                    color: colors.primary,
                    "&:hover": {
                      borderColor: colors.primary,
                      backgroundColor: alpha(colors.primary, 0.05),
                    },
                    alignSelf: { xs: "flex-start", md: "center" },
                    whiteSpace: "nowrap",
                  }}
                >
                  Limpar Filtros
                </Button>
              </Paper>
            </Box>

            {/* Gráfico com opções - COMPLETAMENTE REFORMULADO */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 1.5,
                overflow: "hidden",
                border: `1px solid ${colors.divider}`,
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {/* Fundo branco para o gráfico */}
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: colors.chartBackground,
                }}
              >
                {/* Cabeçalho do gráfico com controles */}
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: `1px solid ${colors.divider}`,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: `linear-gradient(135deg, ${alpha(colors.primary, 0.8)}, ${alpha(
                          colors.secondary,
                          0.8,
                        )})`,
                        color: "#fff",
                        mr: 2,
                        boxShadow: `0 2px 10px ${alpha(colors.primary, 0.3)}`,
                      }}
                    >
                      {chartType === "bar" ? <BarChart3 size={20} /> : <PieChart size={20} />}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: colors.textPrimary,
                          letterSpacing: "-0.3px",
                        }}
                      >
                        Análise de Gastos por Categoria
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                        {monthNames[Number.parseInt(selectedMonth) - 1]} · {selectedCategories.length} categorias
                        selecionadas
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Filtrar categorias">
                      <IconButton
                        size="small"
                        onClick={() => setShowFilters(!showFilters)}
                        sx={{
                          color: showFilters ? colors.primary : colors.textSecondary,
                          bgcolor: showFilters ? alpha(colors.primary, 0.1) : alpha(colors.textSecondary, 0.05),
                          "&:hover": {
                            bgcolor: showFilters ? alpha(colors.primary, 0.15) : alpha(colors.textSecondary, 0.1),
                          },
                        }}
                      >
                        <Filter size={18} />
                      </IconButton>
                    </Tooltip>

                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                    <ToggleButtonGroup
                      size="small"
                      value={chartType}
                      exclusive
                      onChange={handleChartTypeChange}
                      aria-label="tipo de gráfico"
                      sx={{
                        "& .MuiToggleButton-root": {
                          border: `1px solid ${alpha(colors.primary, 0.2)}`,
                          color: colors.textSecondary,
                          "&.Mui-selected": {
                            bgcolor: alpha(colors.primary, 0.1),
                            color: colors.primary,
                            "&:hover": {
                              bgcolor: alpha(colors.primary, 0.15),
                            },
                          },
                          "&:hover": {
                            bgcolor: alpha(colors.primary, 0.05),
                          },
                        },
                      }}
                    >
                      <ToggleButton value="bar" aria-label="gráfico de barras">
                        <BarChart3 size={18} />
                      </ToggleButton>
                      <ToggleButton value="pie" aria-label="gráfico de pizza">
                        <PieChart size={18} />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>

                {/* Filtros integrados no header */}
                <Box
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${colors.divider}`,
                    bgcolor: alpha(colors.primary, 0.02),
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600, mr: 1 }}>
                    Filtrar:
                  </Typography>

                  {Object.entries(categoryNames).map(([key, name]) => {
                    const isSelected = selectedCategories.includes(key)
                    return (
                      <Chip
                        key={key}
                        label={name}
                        icon={isSelected ? categoryIcons[key] : null}
                        onClick={() => toggleCategory(key)}
                        variant={isSelected ? "filled" : "outlined"}
                        sx={{
                          bgcolor: isSelected ? colors.chart[key] : "transparent",
                          color: isSelected ? "#fff" : colors.chart[key],
                          borderColor: colors.chart[key],
                          fontWeight: 500,
                          "& .MuiChip-icon": {
                            color: "inherit",
                          },
                          "&:hover": {
                            bgcolor: isSelected ? alpha(colors.chart[key], 0.9) : alpha(colors.chart[key], 0.1),
                          },
                          transition: "all 0.2s ease",
                        }}
                      />
                    )
                  })}

                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setSelectedCategories(Object.keys(categoryNames))}
                    sx={{
                      color: colors.primary,
                      textTransform: "none",
                      ml: "auto",
                      fontWeight: 500,
                      "&:hover": {
                        bgcolor: alpha(colors.primary, 0.05),
                      },
                    }}
                  >
                    Selecionar todas
                  </Button>
                </Box>

                {/* Conteúdo do gráfico - COMPLETAMENTE REFORMULADO */}
                <Box sx={{ p: 3, position: "relative", zIndex: 1 }}>
                  {chartType === "bar" ? (
                    // Gráfico de barras aprimorado
                    <Box
                      ref={barChartRef}
                      sx={{
                        height: 320,
                        display: "flex",
                        alignItems: "flex-end",
                        position: "relative",
                        bgcolor: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
                        transition: "transform 0.3s ease-out",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Eixo Y com estilo melhorado */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 40,
                          width: 60,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          pr: 1.5,
                        }}
                      >
                        {[50000, 37500, 25000, 12500, 0].map((value) => (
                          <Typography
                            key={value}
                            variant="caption"
                            sx={{
                              color: alpha(colors.textSecondary, 0.8),
                              fontSize: "0.7rem",
                              fontWeight: 500,
                            }}
                          >
                            {value > 0 ? `R$ ${value.toLocaleString("pt-BR")}` : "R$ 0"}
                          </Typography>
                        ))}
                      </Box>

                      {/* Linhas de grade estilizadas */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: 60,
                          right: 0,
                          top: 0,
                          bottom: 40,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {[50000, 37500, 25000, 12500, 0].map((value) => (
                          <Box
                            key={value}
                            sx={{
                              width: "100%",
                              height: value === 0 ? 2 : 1,
                              bgcolor:
                                value === 0
                                  ? alpha(colors.textSecondary, 0.2)
                                  : `rgba(${value === 25000 ? "59, 130, 246" : "0, 0, 0"}, ${value === 25000 ? 0.08 : 0.05})`,
                              borderRadius: value === 0 ? 0 : 1,
                            }}
                          />
                        ))}
                      </Box>

                      {/* Área do gráfico de barras com design aprimorado */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "flex-end",
                          width: "100%",
                          height: "100%",
                          pl: 7,
                          pr: 2,
                          pb: 4,
                        }}
                      >
                        {/* Renderizar barras para cada categoria selecionada */}
                        {selectedCategories.map((category) => {
                          const isHovered = hoveredCategory === category
                          const barHeight = (currentMonthCategories[category] / 50000) * 250

                          return (
                            <Box
                              key={category}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: `${80 / selectedCategories.length}%`,
                                position: "relative",
                              }}
                              onMouseEnter={() => setHoveredCategory(category)}
                              onMouseLeave={() => setHoveredCategory(null)}
                            >
                              {/* Reflexo da barra (efeito de espelho) */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  width: isHovered ? "45%" : "35%",
                                  height: 10,
                                  background: `linear-gradient(to bottom, ${alpha(colors.chart[category], 0.3)}, transparent)`,
                                  borderRadius: "50%",
                                  filter: "blur(3px)",
                                  opacity: 0.7,
                                  transform: "scaleY(0.3)",
                                  transition: "all 0.3s ease",
                                }}
                              />

                              {/* Barra principal com design aprimorado */}
                              <Box
                                className="bar-item"
                                data-height={`${barHeight}px`}
                                sx={{
                                  position: "relative",
                                  width: isHovered ? "45%" : "35%",
                                  background: colors.chartGradient[category],
                                  borderRadius: "6px 6px 0 0",
                                  transition: "all 0.3s ease",
                                  boxShadow: isHovered
                                    ? `0 0 20px ${alpha(colors.chart[category], 0.4)}, 0 -3px 8px ${alpha(colors.chart[category], 0.3)} inset`
                                    : `0 4px 6px ${alpha(colors.chart[category], 0.2)}, 0 -2px 6px ${alpha(colors.chart[category], 0.2)} inset`,
                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "30%",
                                    background: `linear-gradient(to bottom, ${alpha("#ffffff", 0.4)}, transparent)`,
                                    borderRadius: "6px 6px 0 0",
                                  },
                                  "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "20%",
                                    background: `linear-gradient(to top, ${alpha(colors.chart[category], 0.7)}, transparent)`,
                                  },
                                  transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                                }}
                              >
                                {/* Valor no topo da barra */}
                                <Typography
                                  variant="caption"
                                  sx={{
                                    position: "absolute",
                                    top: -25,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    color: colors.chart[category],
                                    fontWeight: 700,
                                    fontSize: isHovered ? "0.75rem" : "0.7rem",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.3s ease",
                                    opacity: isHovered ? 1 : 0.9,
                                    textShadow: isHovered ? `0 0 10px ${alpha(colors.chart[category], 0.3)}` : "none",
                                  }}
                                >
                                  R${" "}
                                  {currentMonthCategories[category].toLocaleString("pt-BR", {
                                    minimumFractionDigits: 0,
                                  })}
                                </Typography>
                              </Box>

                              {/* Tooltip detalhado no hover */}
                              {isHovered && (
                                <Zoom in={isHovered}>
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: barHeight < 100 ? -90 : -60,
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      bgcolor: "#fff",
                                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                      borderRadius: 2,
                                      p: 1.5,
                                      zIndex: 10,
                                      width: 160,
                                      textAlign: "center",
                                      border: `1px solid ${alpha(colors.chart[category], 0.2)}`,
                                      "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -6,
                                        left: "50%",
                                        transform: "translateX(-50%) rotate(45deg)",
                                        width: 12,
                                        height: 12,
                                        bgcolor: "#fff",
                                        borderRight: `1px solid ${alpha(colors.chart[category], 0.2)}`,
                                        borderBottom: `1px solid ${alpha(colors.chart[category], 0.2)}`,
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 0.5 }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 24,
                                          height: 24,
                                          borderRadius: "6px",
                                          background: colors.chart[category],
                                          color: "#fff",
                                          mr: 1,
                                        }}
                                      >
                                        {categoryIcons[category]}
                                      </Box>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: colors.chart[category] }}
                                      >
                                        {categoryNames[category]}
                                      </Typography>
                                    </Box>
                                    <Typography
                                      variant="h6"
                                      sx={{ fontWeight: 700, color: colors.textPrimary, mb: 0.5 }}
                                    >
                                      R${" "}
                                      {currentMonthCategories[category].toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </Typography>
                                    <Box
                                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                                        Percentual:
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600, color: colors.chart[category] }}
                                      >
                                        {((currentMonthCategories[category] / currentMonthExpense) * 100).toFixed(1)}%
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Zoom>
                              )}

                              {/* Legenda abaixo da barra */}
                              <Typography
                                variant="caption"
                                sx={{
                                  color: isHovered ? colors.chart[category] : alpha(colors.textPrimary, 0.7),
                                  fontWeight: isHovered ? 600 : 500,
                                  mt: 1.5,
                                  fontSize: "0.7rem",
                                  transition: "all 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {categoryNames[category]}
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>
                  ) : (
                    // Gráfico de pizza redesenhado e aumentado - COMPLETAMENTE REFORMULADO
                    <Box
                      sx={{
                        height: 450,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
                      }}
                    >
                      <Box
                        ref={pieChartRef}
                        sx={{
                          position: "relative",
                          width: 400,
                          height: 400,
                          transition: "transform 0.3s ease-out",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Círculo de fundo para efeito de profundidade */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 380,
                            height: 380,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(249,250,251,1) 0%, rgba(243,244,246,1) 100%)",
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
                          }}
                        />

                        {/* Renderizar segmentos do gráfico de pizza */}
                        {Object.entries(filteredCategories).map(([category, value], index, arr) => {
                          const total = Object.values(filteredCategories).reduce((sum, val) => sum + val, 0)
                          const percentage = (value / total) * 100

                          // Calcular ângulos para o segmento
                          let startAngle = 0
                          for (let i = 0; i < index; i++) {
                            const prevValue = Object.values(filteredCategories)[i]
                            startAngle += (prevValue / total) * 360
                          }
                          const endAngle = startAngle + (value / total) * 360

                          // Converter ângulos para coordenadas
                          const startRad = (startAngle - 90) * (Math.PI / 180)
                          const endRad = (endAngle - 90) * (Math.PI / 180)

                          const x1 = 200 + 160 * Math.cos(startRad)
                          const y1 = 200 + 160 * Math.sin(startRad)
                          const x2 = 200 + 160 * Math.cos(endRad)
                          const y2 = 200 + 160 * Math.sin(endRad)

                          // Determinar se o arco é maior que 180 graus
                          const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

                          // Calcular posição do texto
                          const midAngle = (startAngle + endAngle) / 2
                          const midRad = (midAngle - 90) * (Math.PI / 180)
                          const textX = 200 + 105 * Math.cos(midRad)
                          const textY = 200 + 105 * Math.sin(midRad)

                          // Para o efeito de hover
                          const isHovered = hoveredPieSlice === category
                          const hoverOffset = isHovered ? 20 : 0
                          const hoverX = hoverOffset * Math.cos(midRad)
                          const hoverY = hoverOffset * Math.sin(midRad)

                          return (
                            <Box
                              key={category}
                              sx={{ position: "absolute", inset: 0 }}
                              onMouseEnter={() => setHoveredPieSlice(category)}
                              onMouseLeave={() => setHoveredPieSlice(null)}
                            >
                              <svg width="400" height="400" viewBox="0 0 400 400">
                                <defs>
                                  <linearGradient id={`gradient-${category}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={alpha(colors.chart[category], 1)} />
                                    <stop offset="100%" stopColor={alpha(colors.chart[category], 0.8)} />
                                  </linearGradient>
                                  <filter id={`shadow-${category}`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow
                                      dx="0"
                                      dy="0"
                                      stdDeviation={isHovered ? "8" : "4"}
                                      floodColor={colors.chart[category]}
                                      floodOpacity="0.3"
                                    />
                                  </filter>
                                  <filter id={`inner-shadow-${category}`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                    <feOffset in="blur" dx="0" dy="-3" result="offsetBlur" />
                                    <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
                                  </filter>
                                </defs>
                                <path
                                  d={`M ${200 + hoverX} ${200 + hoverY} L ${x1 + hoverX} ${y1 + hoverY} A 160 160 0 ${largeArcFlag} 1 ${x2 + hoverX} ${y2 + hoverY} Z`}
                                  fill={`url(#gradient-${category})`}
                                  stroke="#fff"
                                  strokeWidth="2"
                                  opacity={isHovered ? 1 : 0.9}
                                  filter={`url(#shadow-${category})`}
                                  style={{ transition: "all 0.3s ease" }}
                                  className="pie-slice pulse-on-hover"
                                />
                                {percentage > 5 && (
                                  <g>
                                    <text
                                      x={textX + hoverX}
                                      y={textY + hoverY - 10}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      fill="#fff"
                                      fontSize={isHovered ? "20" : "18"}
                                      fontWeight="bold"
                                      style={{ transition: "all 0.3s ease", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                                    >
                                      {percentage.toFixed(0)}%
                                    </text>
                                    {isHovered && (
                                      <text
                                        x={textX + hoverX}
                                        y={textY + hoverY + 10}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="#fff"
                                        fontSize="12"
                                        fontWeight="500"
                                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                                      >
                                        {categoryNames[category]}
                                      </text>
                                    )}
                                  </g>
                                )}
                              </svg>

                              {/* Tooltip no hover */}
                              {isHovered && (
                                <Zoom in={isHovered}>
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: `translate(calc(-50% + ${hoverX * 2.2}px), calc(-50% + ${hoverY * 2.2}px))`,
                                      bgcolor: "#fff",
                                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                      borderRadius: 2,
                                      p: 1.5,
                                      zIndex: 10,
                                      width: 180,
                                      textAlign: "center",
                                      border: `1px solid ${alpha(colors.chart[category], 0.2)}`,
                                    }}
                                  >
                                    <Box
                                      sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 28,
                                          height: 28,
                                          borderRadius: "8px",
                                          background: colors.chart[category],
                                          color: "#fff",
                                          mr: 1,
                                        }}
                                      >
                                        {categoryIcons[category]}
                                      </Box>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: colors.chart[category] }}
                                      >
                                        {categoryNames[category]}
                                      </Typography>
                                    </Box>
                                    <Typography
                                      variant="h6"
                                      sx={{ fontWeight: 700, color: colors.textPrimary, mb: 0.5 }}
                                    >
                                      R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Box
                                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                                        Percentual:
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600, color: colors.chart[category] }}
                                      >
                                        {percentage.toFixed(1)}%
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 0.5,
                                      }}
                                    >
                                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                                        Projetos:
                                      </Typography>
                                      <Typography variant="caption" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                                        {filteredProjects.filter((p) => p.category === category).length}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Zoom>
                              )}
                            </Box>
                          )
                        })}

                        {/* Círculo central com efeito de vidro minimalista */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 140,
                            height: 140,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(5px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 30px rgba(0,0,0,0.08)",
                            border: "4px solid rgba(255,255,255,0.9)",
                            zIndex: 5,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translate(-50%, -50%) scale(1.05)",
                              boxShadow: "0 0 40px rgba(0,0,0,0.12)",
                            },
                          }}
                          className="float-animation"
                        >
                          <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                            Total
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary }}>
                            R$ {currentMonthExpense.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 500, mt: 0.5 }}>
                            {filteredProjects.length} projetos
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {/* Legenda minimalista */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                      flexWrap: "wrap",
                      gap: 2,
                      p: 1.5,
                    }}
                  >
                    {Object.entries(categoryNames)
                      .filter(([key]) => selectedCategories.includes(key))
                      .map(([key, name]) => {
                        const isActive = hoveredCategory === key || hoveredPieSlice === key
                        return (
                          <Box
                            key={key}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 0.75,
                              borderRadius: 1.5,
                              transition: "all 0.2s ease",
                              cursor: "pointer",
                              background: isActive ? alpha(colors.chart[key], 0.1) : "transparent",
                              border: `1px solid ${isActive ? alpha(colors.chart[key], 0.3) : "transparent"}`,
                              "&:hover": {
                                background: alpha(colors.chart[key], 0.1),
                                border: `1px solid ${alpha(colors.chart[key], 0.3)}`,
                              },
                            }}
                            onMouseEnter={() =>
                              chartType === "bar" ? setHoveredCategory(key) : setHoveredPieSlice(key)
                            }
                            onMouseLeave={() =>
                              chartType === "bar" ? setHoveredCategory(null) : setHoveredPieSlice(null)
                            }
                          >
                            <Box
                              sx={{
                                width: 14,
                                height: 14,
                                borderRadius: 1,
                                background: colors.chartGradient[key],
                                mr: 1,
                                boxShadow: isActive ? `0 0 8px ${alpha(colors.chart[key], 0.5)}` : "none",
                                transition: "all 0.2s ease",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: isActive ? colors.chart[key] : colors.textPrimary,
                                fontWeight: isActive ? 600 : 500,
                                transition: "all 0.2s ease",
                              }}
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                ml: 1,
                                color: isActive ? colors.chart[key] : colors.textSecondary,
                                fontWeight: isActive ? 600 : 400,
                                transition: "all 0.2s ease",
                              }}
                            >
                              {((currentMonthCategories[key] / currentMonthExpense) * 100).toFixed(1)}%
                            </Typography>
                          </Box>
                        )
                      })}
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Lista de projetos aprimorada com pesquisa e paginação */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 1.5,
                overflow: "hidden",
                border: `1px solid ${colors.divider}`,
                mt: 3,
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${colors.divider}`,
                  flexWrap: { xs: "wrap", md: "nowrap" },
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary }}>
                  Projetos de Engenharia e BIM
                </Typography>

                {/* Filtros de tabela aprimorados */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexGrow: 1,
                    justifyContent: "flex-end",
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Buscar projeto..."
                    value={tableSearchTerm}
                    onChange={(e) => {
                      setTableSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset para primeira página ao filtrar
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={16} color={colors.textSecondary} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: { xs: "100%", sm: 200 },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                        backgroundColor: alpha(colors.primary, 0.02),
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: alpha(colors.primary, 0.05),
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#fff",
                          boxShadow: `0 0 0 2px ${alpha(colors.primary, 0.2)}`,
                        },
                      },
                    }}
                  />

                  <Box sx={{ position: "relative" }}>
                    <Tooltip title="Filtrar por valor">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<SlidersHorizontal size={16} />}
                        onClick={() => {
                          const dialog = document.getElementById("value-filter-dialog")
                          if (dialog) {
                            dialog.style.display = dialog.style.display === "none" ? "block" : "none"
                          }
                        }}
                        sx={{
                          borderColor: alpha(colors.primary, 0.3),
                          color: colors.primary,
                          height: 40,
                          "&:hover": {
                            borderColor: colors.primary,
                            backgroundColor: alpha(colors.primary, 0.05),
                          },
                        }}
                      >
                        Valor
                      </Button>
                    </Tooltip>

                    {/* Dialog para filtro de valor */}
                    <Box
                      id="value-filter-dialog"
                      sx={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        mt: 1,
                        width: 280,
                        bgcolor: "background.paper",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        borderRadius: 2,
                        p: 2,
                        zIndex: 10,
                        display: "none",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Filtrar por valor
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const dialog = document.getElementById("value-filter-dialog")
                            if (dialog) dialog.style.display = "none"
                          }}
                        >
                          <X size={16} />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 1, color: colors.textSecondary, fontWeight: 500 }}>
                        R$ {tableValueRange[0].toLocaleString("pt-BR")} - R${" "}
                        {tableValueRange[1].toLocaleString("pt-BR")}
                      </Typography>

                      <Slider
                        value={tableValueRange}
                        onChange={(e, newValue) => {
                          setTableValueRange(newValue)
                          setCurrentPage(1) // Reset para primeira página ao filtrar
                        }}
                        min={0}
                        max={100000}
                        step={1000}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                        sx={{
                          color: colors.primary,
                          "& .MuiSlider-thumb": {
                            width: 14,
                            height: 14,
                            "&:hover, &.Mui-focusVisible": {
                              boxShadow: `0 0 0 8px ${alpha(colors.primary, 0.16)}`,
                            },
                          },
                          "& .MuiSlider-rail": {
                            opacity: 0.3,
                          },
                        }}
                      />

                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => {
                            setTableValueRange([0, 100000])
                            setCurrentPage(1)
                            const dialog = document.getElementById("value-filter-dialog")
                            if (dialog) dialog.style.display = "none"
                          }}
                          sx={{
                            color: colors.textSecondary,
                            mr: 1,
                            "&:hover": {
                              backgroundColor: alpha(colors.textSecondary, 0.05),
                            },
                          }}
                        >
                          Resetar
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            const dialog = document.getElementById("value-filter-dialog")
                            if (dialog) dialog.style.display = "none"
                          }}
                          sx={{
                            bgcolor: colors.primary,
                            "&:hover": {
                              bgcolor: alpha(colors.primary, 0.9),
                            },
                          }}
                        >
                          Aplicar
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ bgcolor: "#fff", p: 0 }}>
                {filteredProjects.length > 0 ? (
                  <>
                    {/* Cabeçalho da tabela com ordenação */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderBottom: `1px solid ${colors.divider}`,
                        bgcolor: alpha(colors.primary, 0.02),
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            color: colors.primary,
                          },
                        }}
                        onClick={() => handleSortToggle("name")}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 0.5 }}>
                          Projeto
                        </Typography>
                        <ArrowUpDown size={14} color={sortBy === "name" ? colors.primary : colors.textSecondary} />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            color: colors.primary,
                          },
                        }}
                        onClick={() => handleSortToggle("value")}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 0.5 }}>
                          Valor
                        </Typography>
                        <ArrowUpDown size={14} color={sortBy === "value" ? colors.primary : colors.textSecondary} />
                      </Box>
                    </Box>

                    {/* Linhas da tabela */}
                    {currentProjects.map((project, index) => (
                      <Grow in={true} key={project.id} style={{ transformOrigin: "0 0 0" }} timeout={index * 100}>
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: index < currentProjects.length - 1 ? `1px solid ${colors.divider}` : "none",
                            transition: "background-color 0.2s",
                            "&:hover": {
                              bgcolor: alpha(colors.primary, 0.02),
                            },
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpenProjectModal(project)}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: "8px",
                                background: alpha(colors.chart[project.category], 0.1),
                                color: colors.chart[project.category],
                                mr: 2,
                              }}
                            >
                              {categoryIcons[project.category]}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                                {project.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                                {project.id} · {categoryNames[project.category]}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 700,
                                color: colors.textPrimary,
                                bgcolor: alpha(colors.chart[project.category], 0.1),
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                mr: 1,
                              }}
                            >
                              R$ {project.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </Typography>
                            <Tooltip title="Ver detalhes">
                              <IconButton size="small" color="primary">
                                <Eye size={16} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grow>
                    ))}

                    {/* Paginação */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderTop: `1px solid ${colors.divider}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                        Mostrando {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} de{" "}
                        {filteredProjects.length} projetos
                      </Typography>

                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                        showFirstButton
                        showLastButton
                        sx={{
                          "& .MuiPaginationItem-root": {
                            borderRadius: 1,
                          },
                          "& .Mui-selected": {
                            fontWeight: 600,
                          },
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 1 }}>
                      Nenhum projeto encontrado com os filtros atuais.
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setTableSearchTerm("")
                        setTableValueRange([0, 100000])
                        setSelectedCategories(Object.keys(categoryNames))
                      }}
                      sx={{
                        mt: 1,
                        borderColor: alpha(colors.primary, 0.3),
                        color: colors.primary,
                        "&:hover": {
                          borderColor: colors.primary,
                          backgroundColor: alpha(colors.primary, 0.05),
                        },
                      }}
                    >
                      Limpar Filtros
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>

            {/* Nova tabela de gastos recentes */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 1.5,
                overflow: "hidden",
                border: `1px solid ${colors.divider}`,
                mt: 3,
                mb: 3,
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${colors.divider}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: alpha(colors.primary, 0.1),
                      color: colors.primary,
                      mr: 1.5,
                    }}
                  >
                    <CreditCard size={18} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary }}>
                      Gastos Recentes
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                      Gerencie os gastos dos seus projetos
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  onClick={handleOpenExpenseModal}
                  sx={{
                    bgcolor: colors.primary,
                    "&:hover": {
                      bgcolor: alpha(colors.primary, 0.9),
                    },
                    borderRadius: 2,
                    boxShadow: `0 4px 12px ${alpha(colors.primary, 0.2)}`,
                  }}
                >
                  Adicionar Gasto
                </Button>
              </Box>

              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de gastos">
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(colors.primary, 0.02) }}>
                      <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Categoria</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Projeto</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Valor</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredExpenses.map((expense) => {
                      const project = projectsData.find(p => p.id === expense.project) || { name: "N/A" };
                      return (
                        <TableRow
                          key={expense.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": { bgcolor: alpha(colors.primary, 0.02) },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {expense.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={categoryIcons[expense.category]}
                              label={categoryNames[expense.category]}
                              size="small"
                              sx={{
                                bgcolor: alpha(colors.chart[expense.category], 0.1),
                                color: colors.chart[expense.category],
                                fontWeight: 500,
                                "& .MuiChip-icon": {
                                  color: colors.chart[expense.category],
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {expense.date.toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {project.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              R$ {expense.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                              <Tooltip title="Editar">
                                <IconButton size="small" color="primary">
                                  <Edit size={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Excluir">
                                <IconButton size="small" color="error">
                                  <Trash2 size={16} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                  borderTop: `1px solid ${colors.divider}`,
                }}
              >
                <TablePagination
                  component="div"
                  count={expenses.length}
                  page={expensePage}
                  onPageChange={handleExpensePageChange}
                  rowsPerPage={expenseRowsPerPage}
                  onRowsPerPageChange={handleExpenseRowsPerPageChange}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage="Itens por página:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Modal de detalhes do projeto */}
      <Dialog
        open={projectModalOpen}
        onClose={handleCloseProjectModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ p: 3, pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(colors.chart[selectedProject.category], 0.2),
                      color: colors.chart[selectedProject.category],
                      mr: 2,
                    }}
                  >
                    {categoryIcons[selectedProject.category]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {selectedProject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedProject.id} · {categoryNames[selectedProject.category]}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseProjectModal}>
                  <X size={20} />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Descrição do Projeto
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                    {selectedProject.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Detalhes
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Status:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedProject.status}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Gerente:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedProject.manager}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Cliente:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedProject.client}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Localização:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedProject.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Início:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Date(selectedProject.startDate).toLocaleDateString("pt-BR")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Término:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Date(selectedProject.endDate).toLocaleDateString("pt-BR")}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={handleCloseProjectModal} color="primary">
                Fechar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Modal para adicionar novo gasto */}
      <Dialog open={expenseModalOpen} onClose={handleCloseExpenseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ p: 3 }}>Adicionar Novo Gasto</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={newExpense.description}
                onChange={(e) => handleExpenseChange("description", e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Valor"
                value={newExpense.value}
                onChange={(e) => handleExpenseChange("value", e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="category-label">Categoria</InputLabel>
                <Select
                  labelId="category-label"
                  value={newExpense.category}
                  onChange={(e) => handleExpenseChange("category", e.target.value)}
                  label="Categoria"
                >
                  {Object.entries(categoryNames).map(([key, name]) => (
                    <MenuItem key={key} value={key}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                  label="Data"
                  value={newExpense.date}
                  onChange={(date) => handleExpenseChange("date", date)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  locale={ptBR}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Projeto (ID)"
                value={newExpense.project}
                onChange={(e) => handleExpenseChange("project", e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseExpenseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleExpenseSubmit} color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
