// Menu Hamburguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    // Toggle menu
    function toggleMenu() {
        hamburgerIcon.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Abrir/fechar menu ao clicar no ícone
    hamburgerIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Fechar menu ao clicar fora
    mobileOverlay.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Slider de notícias
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;
    
    // Função para atualizar o slider
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar classes ativas
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Navegação para a direita
    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });
    
    // Navegação para a esquerda
    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    // Auto-play do slider
    let slideInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Pausar auto-play ao interagir com o slider
    sliderTrack.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    sliderTrack.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
    });
    
    // Filtros de notícias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Obter o filtro selecionado
            const filter = this.getAttribute('data-filter');
            
            // Filtrar as notícias
            newsCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Paginação
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Aqui você implementaria a lógica de paginação real
            // Por enquanto é apenas visual
        });
    });
    
    // Formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Aqui você implementaria o envio do formulário
            alert('Obrigado por se inscrever em nossa newsletter!');
            emailInput.value = '';
        }
    });
    
    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Header sticky
    const header = document.querySelector('header');
    const desktopNav = document.querySelector('.desktop-nav');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerHeight) {
            desktopNav.classList.add('sticky');
            document.body.style.paddingTop = desktopNav.offsetHeight + 'px';
        } else {
            desktopNav.classList.remove('sticky');
            document.body.style.paddingTop = 0;
        }
    });
    
    // Adicionar classe sticky inicial se necessário
    if (window.pageYOffset > headerHeight) {
        desktopNav.classList.add('sticky');
        document.body.style.paddingTop = desktopNav.offsetHeight + 'px';
    }
    
    // Animações de entrada suave para elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.news-card, .featured-card, .info-section').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Adicionar estilos CSS para animação
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .sticky {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(animationStyles);
});
