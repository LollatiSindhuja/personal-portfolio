// Global Variables
let isLoading = true
let currentTheme = localStorage.getItem("theme") || "light"

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializePreloader()
  initializeNavigation()
  initializeTypingAnimation()
  initializeScrollAnimations()
  initializeSkillBars()
  initializeCounters()
  initializeContactForm()
  initializeScrollToTop()
  initializeParticles()
  initializeSkillsChart()
})

// Theme Management
function initializeTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon()

  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", toggleTheme)
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.documentElement.setAttribute("data-theme", currentTheme)
  localStorage.setItem("theme", currentTheme)
  updateThemeIcon()
}

function updateThemeIcon() {
  const themeIcon = document.querySelector("#theme-toggle i")
  themeIcon.className = currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"
}

// Preloader
function initializePreloader() {
  const preloader = document.getElementById("preloader")

  // Simulate loading time
  setTimeout(() => {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
      isLoading = false
      // Trigger animations after preloader
      triggerInitialAnimations()
    }, 500)
  }, 2000)
}

function triggerInitialAnimations() {
  // Add animation classes to elements
  const heroElements = document.querySelectorAll(".hero-text > *")
  heroElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    setTimeout(() => {
      el.style.transition = "all 0.8s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active navigation link
    updateActiveNavLink()
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach((link) => link.classList.remove("active"))
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`)
      if (activeLink) activeLink.classList.add("active")
    }
  })
}

// Typing Animation
function initializeTypingAnimation() {
  const typingText = document.querySelector(".typing-text")
  const roles = [
    "Python Developer",
    "Web Developer",
    "Software Engineer",
    "Problem Solver",
    "Tech Enthusiast",
    "Full Stack Developer",
  ]

  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeRole() {
    const currentRole = roles[roleIndex]

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      typingSpeed = 500
    }

    setTimeout(typeRole, typingSpeed)
  }

  // Start typing animation after preloader
  setTimeout(typeRole, 2500)
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Special handling for different elements
        if (entry.target.classList.contains("skill-category")) {
          animateSkillBars(entry.target)
        }

        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target)
        }
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  const animatedElements = [
    ".about .text-block",
    ".experience-item",
    ".project-card",
    ".skill-category",
    ".contact-method",
    ".timeline-item",
  ]

  animatedElements.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add("fade-in")
      el.style.transitionDelay = `${index * 0.1}s`
      observer.observe(el)
    })
  })
}

// Skill Bars Animation
function initializeSkillBars() {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".skill-category").forEach((category) => {
    skillObserver.observe(category)
  })
}

function animateSkillBars(container) {
  const skillBars = container.querySelectorAll(".skill-progress")
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width
    }, index * 200)
  })
}

// Counter Animation
function initializeCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".stat-number").forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    if (current < target) {
      current += increment
      element.textContent = Math.floor(current)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById("contact-form")
  const submitBtn = form.querySelector('button[type="submit"]')

  form.addEventListener("submit", handleFormSubmit)

  // Real-time validation
  const inputs = form.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input))
    input.addEventListener("input", () => clearFieldError(input))
  })
}

function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.target
  const submitBtn = form.querySelector('button[type="submit"]')
  const formData = new FormData(form)

  // Validate all fields
  const isValid = validateForm(form)

  if (!isValid) {
    showNotification("Please fix the errors in the form", "error")
    return
  }

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false

    showNotification("Message sent successfully! I'll get back to you soon.", "success")
    form.reset()
  }, 2000)
}

function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  return isValid
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    errorMessage = "This field is required"
    isValid = false
  }

  // Email validation
  if (fieldName === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address"
      isValid = false
    }
  }

  // Name validation
  if (fieldName === "name" && value) {
    if (value.length < 2) {
      errorMessage = "Name must be at least 2 characters long"
      isValid = false
    }
  }

  // Message validation
  if (fieldName === "message" && value) {
    if (value.length < 10) {
      errorMessage = "Message must be at least 10 characters long"
      isValid = false
    }
  }

  showFieldError(field, errorMessage)
  return isValid
}

function showFieldError(field, message) {
  const errorElement = field.parentNode.querySelector(".form-error")
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.toggle("show", !!message)
    field.style.borderColor = message ? "var(--error-color)" : ""
  }
}

function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector(".form-error")
  if (errorElement) {
    errorElement.classList.remove("show")
    field.style.borderColor = ""
  }
}

// Notifications
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Trigger animation
  setTimeout(() => notification.classList.add("show"), 100)

  // Remove notification
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => document.body.removeChild(notification), 300)
  }, 4000)
}

// Scroll to Top Button
function initializeScrollToTop() {
  const scrollBtn = document.getElementById("scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("show")
    } else {
      scrollBtn.classList.remove("show")
    }
  })

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Particles Animation
function initializeParticles() {
  const particlesContainer = document.querySelector(".hero-particles")
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer)
  }
}

function createParticle(container) {
  const particle = document.createElement("div")
  particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
    `

  container.appendChild(particle)

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
    }
  }, 20000)
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// Skills Chart
function initializeSkillsChart() {
  const canvas = document.getElementById("skillsChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 100

  const skills = [
    { name: "Python", value: 90, color: "#3776ab" },
    { name: "JavaScript", value: 80, color: "#f7df1e" },
    { name: "HTML/CSS", value: 95, color: "#e34f26" },
    { name: "React", value: 85, color: "#61dafb" },
    { name: "MySQL", value: 80, color: "#4479a1" },
  ]

  let currentAngle = -Math.PI / 2
  const total = skills.reduce((sum, skill) => sum + skill.value, 0)

  skills.forEach((skill) => {
    const sliceAngle = (skill.value / total) * 2 * Math.PI

    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fillStyle = skill.color
    ctx.fill()

    // Draw label
    const labelAngle = currentAngle + sliceAngle / 2
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

    ctx.fillStyle = "#ffffff"
    ctx.font = "12px Inter"
    ctx.textAlign = "center"
    ctx.fillText(skill.name, labelX, labelY)

    currentAngle += sliceAngle
  })
}

// Download Resume Functionality
document.getElementById("download-resume")?.addEventListener("click", () => {
  // Create a simple resume content
  const resumeContent = `
        LOLLATI SINDHUJA
        Software Developer & Computer Science Engineer
        
        Contact: sindhujalollati@gmail.com | +91-9550193362
        Location: Madhira, Warangal, Telangana
        
        EDUCATION
        • B-Tech Computer Science Engineering (2023-2027)
          Chaitanya Deemed to be University, Hyderabad
        
        EXPERIENCE
        • Engineer, Web Development & Python Developer - Wipro (Aug 2024 - Feb 2025)
        • Python Programming Intern - Code Alpha (Oct 2024 - Dec 2024)
        
        SKILLS
        • Programming: Python, Java, JavaScript
        • Web Technologies: HTML/CSS, React, Node.js
        • Database: MySQL
        • Tools: Git, MS Office, MATLAB
    `

  // Create and download text file
  const blob = new Blob([resumeContent], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "Lollati_Sindhuja_Resume.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  showNotification("Resume downloaded successfully!", "success")
})

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key to close mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.getElementById("nav-toggle")
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }

  // Arrow keys for navigation
  if (e.key === "ArrowUp" && e.ctrlKey) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (e.key === "ArrowDown" && e.ctrlKey) {
    e.preventDefault()
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }
})

// Performance Optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink()
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("loading-skeleton")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.classList.add("loading-skeleton")
    imageObserver.observe(img)
  })
}

// Initialize lazy loading
initializeLazyLoading()

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // Could send error to analytics service here
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Analytics (placeholder for Google Analytics or similar)
function trackEvent(eventName, eventData) {
  // Placeholder for analytics tracking
  console.log("Event tracked:", eventName, eventData)

  // Example: gtag('event', eventName, eventData);
}

// Track important interactions
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    trackEvent("button_click", { button_type: "primary", button_text: e.target.textContent })
  }

  if (e.target.matches(".nav-link")) {
    trackEvent("navigation_click", { section: e.target.getAttribute("href") })
  }

  if (e.target.matches(".social-link")) {
    trackEvent("social_click", { platform: e.target.getAttribute("data-tooltip") })
  }
})

// Page Visibility API
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden
    trackEvent("page_hidden")
  } else {
    // Page is visible
    trackEvent("page_visible")
  }
})

// Continuous particle generation
setInterval(() => {
  const particlesContainer = document.querySelector(".hero-particles")
  if (particlesContainer && !isLoading) {
    createParticle(particlesContainer)
  }
}, 2000)

console.log("🚀 Portfolio loaded successfully!")
