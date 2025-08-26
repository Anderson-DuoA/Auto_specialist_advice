// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    hamburgerIcon.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileOverlay.addEventListener('click', function() {
        hamburgerIcon.classList.remove('active');
        mobileNav.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Slider de Notícias
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.left-arrow');
    const nextArrow = document.querySelector('.right-arrow');
    let currentSlide = 0;
    
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        sliderTrack.style.transform = `translateX(-${index * 25}%)`;
        currentSlide = index;
    }
    
    prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Filtros de Notícias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            newsCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Formulário de Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Obrigado por se inscrever com o email: ${email}`);
            this.reset();
        });
    }
    
    // Formulário de Contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Paginação
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Aqui iria a lógica para carregar a página correspondente
        });
    });
});

// Seta para voltar ao topo
const backToTopButton = document.getElementById('backToTop');

// Mostrar ou esconder a seta baseado na posição de rolagem
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

// Rolagem suave quando clicar na seta
backToTopButton.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Rolagem suave para links âncora (opcional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
