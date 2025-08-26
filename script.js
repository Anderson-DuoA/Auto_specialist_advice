// Menu mobile toggle - versão otimizada
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Cache de elementos DOM
    const domCache = {
        hamburger: document.querySelector('.hamburger-icon'),
        mobileNav: document.querySelector('.mobile-nav'),
        mobileOverlay: document.createElement('div'),
        body: document.body,
        backToTop: document.getElementById('backToTop'),
        sliderTrack: document.querySelector('.slider-track'),
        slides: document.querySelectorAll('.slide'),
        leftArrow: document.querySelector('.left-arrow'),
        rightArrow: document.querySelector('.right-arrow'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        newsCards: document.querySelectorAll('.news-card')
    };
    
    // Adicionar overlay para mobile
    domCache.mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(domCache.mobileOverlay);
    
    // Toggle menu mobile
    function toggleMobileMenu() {
        domCache.hamburger.classList.toggle('active');
        domCache.mobileNav.classList.toggle('active');
        domCache.mobileOverlay.classList.toggle('active');
        domCache.body.classList.toggle('no-scroll');
    }
    
    // Fechar menu ao clicar no overlay
    function closeMobileMenu() {
        domCache.hamburger.classList.remove('active');
        domCache.mobileNav.classList.remove('active');
        domCache.mobileOverlay.classList.remove('active');
        domCache.body.classList.remove('no-scroll');
    }
    
    // Event listeners para menu mobile
    domCache.hamburger.addEventListener('click', toggleMobileMenu);
    domCache.mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Back to top button
    function handleScroll() {
        if (window.scrollY > 300) {
            domCache.backToTop.classList.add('show');
        } else {
            domCache.backToTop.classList.remove('show');
        }
    }
    
    // Scroll suave para links internos
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    closeMobileMenu();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Slider de notícias
    let currentSlide = 0;
    const slideCount = domCache.slides.length;
    
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        currentSlide = index;
        domCache.sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar classes ativas
        domCache.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Auto-play para o slider
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pausar auto-play ao interagir
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    function resumeSlider() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Filtro de notícias
    function filterNews(category) {
        domCache.newsCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Paginação de notícias (simulada)
    function setupPagination() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Simular carregamento de mais notícias
                console.log('Loading page:', this.textContent);
            });
        });
    }
    
    // Newsletter form handling
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            console.log('Email cadastrado:', email);
            alert('Thank you for signing up! You will receive our updates soon.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    }
    
    // Validação simples de email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Lazy loading para imagens
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Forçar carregamento se necessário
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Inicialização
    function init() {
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        domCache.backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Slider controls
        domCache.leftArrow.addEventListener('click', () => {
            pauseSlider();
            goToSlide(currentSlide - 1);
            setTimeout(resumeSlider, 5000);
        });
        
        domCache.rightArrow.addEventListener('click', () => {
            pauseSlider();
            goToSlide(currentSlide + 1);
            setTimeout(resumeSlider, 5000);
        });
        
        // Pausar slider ao passar mouse
        domCache.sliderTrack.addEventListener('mouseenter', pauseSlider);
        domCache.sliderTrack.addEventListener('mouseleave', resumeSlider);
        
        // Filtros de notícias
        domCache.filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                domCache.filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterNews(this.getAttribute('data-filter'));
            });
        });
        
        // Newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }
        
        // Configurações adicionais
        setupSmoothScrolling();
        setupPagination();
        initLazyLoading();
        
        // Inicializar scroll position
        handleScroll();
    }
    
    // Iniciar tudo quando o DOM estiver pronto
    init();
});

// Service Worker para cache (opcional - descomente se quiser implementar)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
*/

// Web Vitals monitoring (opcional)
/*
const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};
reportWebVitals(console.log);
*/
