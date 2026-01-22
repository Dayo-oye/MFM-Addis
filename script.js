// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Preloader
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Prayer Request Modal
  const prayerBtn = document.querySelector('.btn-prayer');
  const prayerModal = document.getElementById('prayerModal');
  const modalClose = document.querySelector('.modal-close');
  
  if (prayerBtn) {
    prayerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prayerModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      prayerModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close modal when clicking outside
  prayerModal.addEventListener('click', (e) => {
    if (e.target === prayerModal) {
      prayerModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Prayer form submission
  const prayerForm = document.getElementById('prayerForm');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real application, you would send this data to a server
      alert('Prayer request submitted! We will pray for you.');
      prayerModal.classList.remove('active');
      document.body.style.overflow = '';
      prayerForm.reset();
    });
  }
  
  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Animate numbers counting up
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / 100;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounters(), 20);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  // Initialize counters when in viewport
  const aboutSection = document.querySelector('.about-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (aboutSection) {
    observer.observe(aboutSection);
  }
  
  // Simple AOS (Animate On Scroll) implementation
  function checkScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('aos-animate');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Current year for footer (optional)
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  
  // Initialize events slider (simplified)
  function initializeEvents() {
    const events = [
      { title: "Sunday Worship", date: "Every Sunday", time: "9:00 AM", icon: "fas fa-church" },
      { title: "Champions Prayer", date: "Every Tuesday", time: "9:00 PM", icon: "fas fa-hands-praying" },
      { title: "Manna Water Service", date: "Every Wednesday", time: "6:30 PM", icon: "fas fa-tint" },
      { title: "Night of Solution", date: "2nd Friday Monthly", time: "11:00 PM", icon: "fas fa-moon" }
    ];
    
    const eventsSlider = document.querySelector('.events-slider');
    
    if (eventsSlider) {
      events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'service-card';
        eventCard.setAttribute('data-aos', 'fade-up');
        eventCard.innerHTML = `
          <div class="service-icon">
            <i class="${event.icon}"></i>
          </div>
          <div class="service-content">
            <h3 class="service-title">${event.title}</h3>
            <div class="service-time">
              <i class="fas fa-calendar"></i>
              <span>${event.date}</span>
            </div>
            <div class="service-time">
              <i class="fas fa-clock"></i>
              <span>${event.time} EAT</span>
            </div>
          </div>
        `;
        eventsSlider.appendChild(eventCard);
      });
    }
  }
  
  initializeEvents();
  
  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});