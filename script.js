document.addEventListener('DOMContentLoaded', function() {
    // Suavizar scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar classe ativa ao item de menu correspondente à seção visível
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Filtro de notícias por categoria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            newsCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }
            
            // Simulação de inscrição
            alert('Obrigado por se inscrever em nossa newsletter!');
            this.reset();
        });
    }
    
    // Paginação
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Simulação de troca de página
            // Em uma implementação real, isso carregaria novos artigos
            console.log('Página alterada para: ', button.textContent);
        });
    });
    
    // Animação para os cards de notícias
    const newsCardsAll = document.querySelectorAll('.news-card, .featured-card');
    
    function checkScroll() {
        newsCardsAll.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar opacidade para animação
    newsCardsAll.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verificar scroll na inicialização e durante o scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

// Funcionalidade do Slider de Notícias
// Funcionalidade do Slider de Notícias - Apenas com clique nas setas
function initNewsSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const arrows = document.querySelectorAll('.slider-arrow');
    let currentSlide = 0;

    // Função para mudar de slide
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        track.style.transform = `translateX(-${index * 25}%)`;
        
        // Atualizar slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        currentSlide = index;
    }

    // Event listeners para as setas
    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            if (this.classList.contains('left-arrow')) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(currentSlide + 1);
            }
        });
    });

    // Navegação por teclado (opcional)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Swipe para dispositivos móveis (opcional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.slider-container');
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50;
        
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe para a esquerda
            goToSlide(currentSlide + 1);
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe para a direita
            goToSlide(currentSlide - 1);
        }
    }
}

// Inicializar o slider quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initNewsSlider();
});

// Menu Hamburguer - Funciona apenas em telas menores
function initHamburgerMenu() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.createElement('div');
    
    // Verificar se estamos em uma tela menor onde o hamburguer deve funcionar
    function shouldShowHamburger() {
        return window.innerWidth <= 1024;
    }
    
    // Só inicializar o menu hamburguer se estivermos em tela menor
    if (!shouldShowHamburger()) {
        return; // Não inicializar em telas grandes
    }
    
    // Criar overlay
    mobileOverlay.classList.add('mobile-overlay');
    document.body.appendChild(mobileOverlay);
    
    // Alternar menu
    function toggleMenu() {
        hamburgerIcon.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Event listeners
    hamburgerIcon.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar em um link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Verificar quando a janela é redimensionada
    window.addEventListener('resize', function() {
        if (!shouldShowHamburger()) {
            // Se mudou para tela grande, fechar menu mobile
            hamburgerIcon.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Inicializar o menu hamburguer quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // ... seu código existente ...
    
    // Adicione esta linha para inicializar o menu hamburguer
    initHamburgerMenu();
    
    // ... resto do seu código ...
});