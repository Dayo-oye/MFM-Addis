// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 800);
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (navMenu.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });
}

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    }
  });
});

// Counter Animation
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };

  updateCounter();
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-count');
      counters.forEach(counter => {
        if (counter.textContent === '0') {
          animateCounter(counter);
        }
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
  counterObserver.observe(aboutSection);
}

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      type: document.getElementById('subject') ? document.getElementById('subject').value : 'Inquiry',
      message: document.getElementById('message').value
    };

    let responseMessage = '';

    switch (formData.type) {
      case 'Testimony':
        responseMessage = `Praise God! Thank you ${formData.name} for sharing your testimony. We rejoice with you!`;
        break;
      case 'Prayer Request':
        responseMessage = `Dear ${formData.name}, your prayer request has been received. Our ministers will intercede for you.`;
        break;
      default:
        responseMessage = `Thank you ${formData.name} for contacting us. We will get back to you shortly.`;
    }

    alert(responseMessage);
    contactForm.reset();
  });
}

// Current Year in Footer
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Slider Navigation Logic (Generic for multiple sliders)
const sliderBtns = document.querySelectorAll('.slider-btn');

if (sliderBtns.length > 0) {
  const scrollAmount = 380; // approx card width + gap

  sliderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sliderId = btn.getAttribute('data-slider');
      const slider = document.getElementById(sliderId || 'servicesSlider');
      if (!slider) return;

      const isNext = btn.classList.contains('next');

      if (isNext) {
        const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;
        if (isAtEnd) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        const isAtStart = slider.scrollLeft <= 10;
        if (isAtStart) {
          slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    });
  });
}

// ========== GALLERY LIGHTBOX LOGIC ==========
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const galleryImages = document.querySelectorAll('.gallery-img');

let currentCategoryImages = [];
let currentIndex = 0;

if (galleryModal && modalImage && galleryImages.length > 0) {
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      const category = img.getAttribute('data-category');
      const imgSrc = img.getAttribute('src');

      // Find all images within the same category for navigation
      currentCategoryImages = Array.from(galleryImages).filter(item =>
        item.getAttribute('data-category') === category
      );

      currentIndex = currentCategoryImages.findIndex(item => item.getAttribute('src') === imgSrc);

      openModal(imgSrc);
    });
  });

  const openModal = (src) => {
    modalImage.src = src;
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  const closeGalleryModal = () => {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction) => {
    if (currentCategoryImages.length === 0) return;

    currentIndex = (currentIndex + direction + currentCategoryImages.length) % currentCategoryImages.length;

    modalImage.style.transform = 'scale(0.95)';
    modalImage.style.opacity = '0';

    setTimeout(() => {
      modalImage.src = currentCategoryImages[currentIndex].getAttribute('src');
      modalImage.style.transform = 'scale(1)';
      modalImage.style.opacity = '1';
    }, 200);
  };

  if (closeModal) closeModal.addEventListener('click', closeGalleryModal);
  if (modalPrev) modalPrev.addEventListener('click', () => navigateModal(-1));
  if (modalNext) modalNext.addEventListener('click', () => navigateModal(1));

  // Close on backdrop click
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;

    if (e.key === 'Escape') closeGalleryModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
  });
}