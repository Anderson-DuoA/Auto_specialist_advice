document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const dom = {
        hamburger: document.querySelector('.hamburger-icon'),
        mobileNav: document.querySelector('.mobile-nav'),
        backToTop: document.getElementById('backToTop'),
        sliderTrack: document.querySelector('.slider-track'),
        slides: document.querySelectorAll('.slide'),
        leftArrow: document.querySelector('.left-arrow'),
        rightArrow: document.querySelector('.right-arrow'),
        body: document.body
    };

    // --- Menu Mobile ---
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    dom.body.appendChild(mobileOverlay);

    function toggleMobileMenu() {
        dom.hamburger.classList.toggle('active');
        dom.mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        dom.body.classList.toggle('no-scroll');
    }

    if (dom.hamburger) {
        dom.hamburger.addEventListener('click', toggleMobileMenu);
        mobileOverlay.addEventListener('click', toggleMobileMenu);
    }

    // --- Slider de Notícias ---
    let currentSlide = 0;
    let slideInterval;
    const slideCount = dom.slides.length;

    function goToSlide(index) {
        if (!dom.sliderTrack || slideCount <= 1) return;

        currentSlide = (index + slideCount) % slideCount;
        dom.sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function startSliderAutoPlay() {
        stopSliderAutoPlay();
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopSliderAutoPlay() {
        clearInterval(slideInterval);
    }

    if (slideCount > 1) {
        if (dom.leftArrow) {
            dom.leftArrow.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
                stopSliderAutoPlay();
                startSliderAutoPlay();
            });
        }
        if (dom.rightArrow) {
            dom.rightArrow.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
                stopSliderAutoPlay();
                startSliderAutoPlay();
            });
        }
        
        const sliderContainer = document.querySelector('.news-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSliderAutoPlay);
            sliderContainer.addEventListener('mouseleave', startSliderAutoPlay);
        }

        startSliderAutoPlay();
    }

    // --- Botão Voltar ao Topo ---
    function handleScroll() {
        if (window.scrollY > 300) {
            dom.backToTop.classList.add('show');
        } else {
            dom.backToTop.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScroll);
    if (dom.backToTop) {
        dom.backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    handleScroll();
});