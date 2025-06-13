// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  })

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement
  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    htmlElement.className = savedTheme
    updateThemeIcon(savedTheme)
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    htmlElement.className = prefersDark ? "dark" : "light"
    updateThemeIcon(prefersDark ? "dark" : "light")
  }

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.className
    const newTheme = currentTheme === "light" ? "dark" : "light"

    htmlElement.className = newTheme
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)

    // Update charts with new theme
    updateChartsForTheme(newTheme)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun"
    } else {
      themeIcon.className = "fas fa-moon"
    }
  }

  // Navigation functionality
  window.showSection = (sectionId) => {
    // Hide all sections
    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
      section.classList.remove("active")
    })

    // Remove active class from all nav items
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Show selected section
    document.getElementById(sectionId).classList.add("active")
    document.getElementById("nav-" + sectionId).classList.add("active")

    // Refresh AOS animations
    AOS.refresh()
  }

  // Copy code functionality
  window.copyCode = (codeId) => {
    const codeElement = document.getElementById(codeId)
    const textArea = document.createElement("textarea")
    textArea.value = codeElement.textContent
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)

    // Show feedback
    event.target.textContent = "Copied!"
    setTimeout(() => {
      event.target.textContent = "Copy Code"
    }, 2000)
  }

  // Interactive chart functionality
  window.updateChart = () => {
    const feature = document.getElementById("feature-select").value
    const chartType = document.getElementById("chart-type").value
    const bins = document.getElementById("bins-slider").value
    const theme = htmlElement.className

    // Sample data for demonstration
    const sampleData = generateSampleData(feature, 303)

    let trace
    if (chartType === "histogram") {
      trace = {
        x: sampleData,
        type: "histogram",
        nbinsx: Number.parseInt(bins),
        marker: {
          color: theme === "dark" ? "#FF5A5F" : "#3498db",
          opacity: 0.7,
        },
        name: feature,
      }
    } else if (chartType === "box") {
      trace = {
        y: sampleData,
        type: "box",
        marker: {
          color: theme === "dark" ? "#00C9A7" : "#e74c3c",
        },
        name: feature,
      }
    } else if (chartType === "violin") {
      trace = {
        y: sampleData,
        type: "violin",
        marker: {
          color: theme === "dark" ? "#845EC2" : "#9b59b6",
        },
        name: feature,
      }
    }

    const layout = {
      title: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} of ${feature}`,
      xaxis: {
        title: chartType === "histogram" ? feature : "",
        color: theme === "dark" ? "#e2e8f0" : "#2c3e50",
      },
      yaxis: {
        title: chartType !== "histogram" ? feature : "Frequency",
        color: theme === "dark" ? "#e2e8f0" : "#2c3e50",
      },
      paper_bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      plot_bgcolor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      font: {
        color: theme === "dark" ? "#e2e8f0" : "#2c3e50",
      },
      margin: { t: 50, r: 30, b: 50, l: 50 },
    }

    Plotly.newPlot("interactiveChart", [trace], layout, { responsive: true })
  }

  window.updateBinsValue = () => {
    const value = document.getElementById("bins-slider").value
    document.getElementById("bins-value").textContent = value
  }

  function generateSampleData(feature, count) {
    // Generate realistic sample data based on feature type
    const data = []
    for (let i = 0; i < count; i++) {
      switch (feature) {
        case "age":
          data.push(Math.floor(Math.random() * 48) + 29) // 29-77
          break
        case "trestbps":
          data.push(Math.floor(Math.random() * 100) + 90) // 90-190
          break
        case "chol":
          data.push(Math.floor(Math.random() * 400) + 100) // 100-500
          break
        case "thalach":
          data.push(Math.floor(Math.random() * 100) + 70) // 70-170
          break
      }
    }
    return data
  }

  // Download functions
  window.downloadNotebook = () => {
    alert("Jupyter notebook download would start here. This is a demo function.")
  }

  window.downloadDataset = () => {
    alert("Dataset download would start here. This is a demo function.")
  }

  window.downloadCheatsheet = () => {
    alert("Cheat sheet download would start here. This is a demo function.")
  }

  // Update charts based on theme
  function updateChartsForTheme(theme) {
    const textColor = theme === "dark" ? "#e2e8f0" : "#2c3e50"
    const bgColor = theme === "dark" ? "#1e1e1e" : "#ffffff"

    // Update age distribution chart
    if (document.getElementById("ageDistribution")) {
      Plotly.update(
        "ageDistribution",
        {
          marker: { colorscale: theme === "dark" ? "Plasma" : "Viridis" },
        },
        {
          paper_bgcolor: bgColor,
          plot_bgcolor: bgColor,
          font: { color: textColor },
          xaxis: { color: textColor },
          yaxis: { color: textColor },
        },
      )
    }

    // Update correlation heatmap
    if (document.getElementById("correlationHeatmap")) {
      Plotly.update(
        "correlationHeatmap",
        {
          colorscale: theme === "dark" ? "Plasma" : "RdBu",
        },
        {
          paper_bgcolor: bgColor,
          plot_bgcolor: bgColor,
          font: { color: textColor },
          xaxis: { color: textColor },
          yaxis: { color: textColor },
        },
      )
    }

    // Update interactive chart if it exists
    if (document.getElementById("interactiveChart")) {
      window.updateChart()
    }
  }

  // Initialize charts when page loads
  function initCharts() {
    const theme = htmlElement.className
    const textColor = theme === "dark" ? "#e2e8f0" : "#2c3e50"
    const bgColor = theme === "dark" ? "#1e1e1e" : "#ffffff"

    // Create age distribution chart
    if (document.getElementById("ageDistribution")) {
      const ageData = generateSampleData("age", 303)
      const ageTrace = {
        x: ageData,
        type: "histogram",
        nbinsx: 20,
        marker: {
          color: ageData,
          colorscale: theme === "dark" ? "Plasma" : "Viridis",
          opacity: 0.7,
        },
        name: "Age Distribution",
      }

      const ageLayout = {
        title: "Age Distribution in Heart Disease Dataset",
        xaxis: { title: "Age (years)", color: textColor },
        yaxis: { title: "Number of Patients", color: textColor },
        paper_bgcolor: bgColor,
        plot_bgcolor: bgColor,
        font: { color: textColor },
        margin: { t: 50, r: 30, b: 50, l: 50 },
      }

      Plotly.newPlot("ageDistribution", [ageTrace], ageLayout, { responsive: true })
    }

    // Create correlation heatmap
    if (document.getElementById("correlationHeatmap")) {
      const features = [
        "age",
        "sex",
        "cp",
        "trestbps",
        "chol",
        "fbs",
        "restecg",
        "thalach",
        "exang",
        "oldpeak",
        "slope",
        "ca",
        "thal",
        "target",
      ]
      const correlationMatrix = [
        [1.0, 0.28, 0.29, 0.28, 0.21, 0.12, 0.16, -0.4, 0.1, 0.21, 0.17, 0.28, 0.07, 0.23],
        [0.28, 1.0, -0.05, -0.06, -0.2, 0.05, -0.06, -0.04, 0.44, -0.04, 0.03, 0.12, 0.21, 0.28],
        [0.29, -0.05, 1.0, 0.05, -0.08, 0.09, 0.04, 0.3, -0.39, -0.15, -0.03, -0.18, -0.16, -0.43],
        [0.28, -0.06, 0.05, 1.0, 0.12, 0.18, 0.11, -0.04, 0.07, 0.19, 0.14, 0.1, 0.06, 0.14],
        [0.21, -0.2, -0.08, 0.12, 1.0, 0.01, -0.15, -0.01, 0.07, 0.05, 0.04, 0.07, 0.1, 0.09],
        [0.12, 0.05, 0.09, 0.18, 0.01, 1.0, 0.03, -0.01, 0.03, 0.01, 0.01, 0.14, -0.03, 0.03],
        [0.16, -0.06, 0.04, 0.11, -0.15, 0.03, 1.0, 0.04, 0.07, 0.07, 0.12, 0.18, 0.21, 0.14],
        [-0.4, -0.04, 0.3, -0.04, -0.01, -0.01, 0.04, 1.0, -0.38, -0.34, -0.17, -0.21, -0.1, -0.42],
        [0.1, 0.44, -0.39, 0.07, 0.07, 0.03, 0.07, -0.38, 1.0, 0.21, 0.26, 0.47, 0.49, 0.44],
        [0.21, -0.04, -0.15, 0.19, 0.05, 0.01, 0.07, -0.34, 0.21, 1.0, 0.58, 0.67, 0.21, 0.43],
        [0.17, 0.03, -0.03, 0.14, 0.04, 0.01, 0.12, -0.17, 0.26, 0.58, 1.0, 0.12, 0.1, 0.35],
        [0.28, 0.12, -0.18, 0.1, 0.07, 0.14, 0.18, -0.21, 0.47, 0.67, 0.12, 1.0, 0.15, 0.46],
        [0.07, 0.21, -0.16, 0.06, 0.1, -0.03, 0.21, -0.1, 0.49, 0.21, 0.1, 0.15, 1.0, 0.34],
        [0.23, 0.28, -0.43, 0.14, 0.09, 0.03, 0.14, -0.42, 0.44, 0.43, 0.35, 0.46, 0.34, 1.0],
      ]

      const heatmapTrace = {
        z: correlationMatrix,
        x: features,
        y: features,
        type: "heatmap",
        colorscale: theme === "dark" ? "Plasma" : "RdBu",
        zmid: 0,
        showscale: true,
        hoverongaps: false,
      }

      const heatmapLayout = {
        title: "Feature Correlation Matrix",
        xaxis: { title: "Features", tickangle: 45, color: textColor },
        yaxis: { title: "Features", color: textColor },
        paper_bgcolor: bgColor,
        plot_bgcolor: bgColor,
        font: { color: textColor },
        margin: { t: 80, r: 50, b: 100, l: 100 },
      }

      Plotly.newPlot("correlationHeatmap", [heatmapTrace], heatmapLayout, { responsive: true })
    }

    // Initialize interactive chart
    if (document.getElementById("interactiveChart")) {
      window.updateChart()
    }
  }

  // Initialize charts
  initCharts()
})