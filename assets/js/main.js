// Navegação Mobile
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Carrossel de Imagens
class Carousel {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".carousel-slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")

    this.init()
  }

  init() {
    // Event listeners para botões
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    // Event listeners para indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto-play do carrossel
    this.startAutoPlay()

    // Pausar auto-play ao passar o mouse
    const carousel = document.querySelector(".carousel-container")
    carousel.addEventListener("mouseenter", () => this.stopAutoPlay())
    carousel.addEventListener("mouseleave", () => this.startAutoPlay())
  }

  showSlide(index) {
    // Remover classe active de todos os slides e indicadores
    this.slides.forEach((slide) => slide.classList.remove("active"))
    this.indicators.forEach((indicator) => indicator.classList.remove("active"))

    // Adicionar classe active ao slide e indicador atual
    this.slides[index].classList.add("active")
    this.indicators[index].classList.add("active")

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.showSlide(prevIndex)
  }

  goToSlide(index) {
    this.showSlide(index)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 3000) // Muda a cada 5 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
    }
  }
}

// Inicializar carrossel quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  new Carousel()
})

// Formulário de Contato - Enviar para WhatsApp
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const message = document.getElementById("message").value

  if (name && message) {
    const whatsappMessage = `Olá! Meu nome é ${name}.\n\n${message}`
    const phoneNumber = "5511999999999" // Substitua pelo número real da academia
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappUrl, "_blank")

    // Limpar formulário
    document.getElementById("name").value = ""
    document.getElementById("message").value = ""

    // Mostrar mensagem de sucesso
    alert("Redirecionando para o WhatsApp...")
  } else {
    alert("Por favor, preencha todos os campos.")
  }
})

// Botão WhatsApp Flutuante
function openWhatsApp() {
  const phoneNumber = "5511999999999" // Substitua pelo número real da academia
  const message = "Olá! Gostaria de saber mais informações sobre a academia."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Abrir Google Maps
function openGoogleMaps() {
  const address = "Rua das Flores, 123 - Centro, São Paulo - SP"
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  window.open(mapsUrl, "_blank")
}

// Animações ao fazer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação aos elementos
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".class-card, .stat, .schedule-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})



// Contador animado para estatísticas
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace("+", ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + "+"
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target + "+"
      }
    }

    // Iniciar animação quando o elemento estiver visível
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          counterObserver.unobserve(entry.target)
        }
      })
    })

    counterObserver.observe(counter)
  })
}

// Inicializar contador quando a página carregar
document.addEventListener("DOMContentLoaded", animateCounters)

// Validação de formulário em tempo real
document.getElementById("name").addEventListener("input", function () {
  const name = this.value.trim()
  if (name.length < 2) {
    this.style.borderColor = "#ff6b35"
  } else {
    this.style.borderColor = "#28a745"
  }
})

document.getElementById("message").addEventListener("input", function () {
  const message = this.value.trim()
  if (message.length < 10) {
    this.style.borderColor = "#ff6b35"
  } else {
    this.style.borderColor = "#28a745"
  }
})

// Preloader (opcional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Lazy loading para imagens (melhoria de performance)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}
