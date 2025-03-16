const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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

const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};


fadeInOnScroll();

window.addEventListener('scroll', fadeInOnScroll);

class ProductCarousel {
    constructor(container) {
        this.container = container;
        this.products = Array.from(container.querySelectorAll('.product-card'));
        this.currentIndex = 0;
        this.maxVisible = 4;

        this.checkAndInitialize();
        window.addEventListener('resize', () => this.checkAndInitialize());
    }
    
    checkAndInitialize() {

        if (window.innerWidth <= 768) {
            this.setupCarousel();
        } else {
            this.resetCarousel();
        }
    }
    
    setupCarousel() {
        if (this.initialized) return;
        
        this.products.forEach((product, index) => {
            if (index !== 0) {
                product.style.display = 'none';
            }
        });
        
        this.navContainer = document.createElement('div');
        this.navContainer.className = 'carousel-nav';
        
        this.prevButton = document.createElement('button');
        this.prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        this.prevButton.addEventListener('click', () => this.navigate('prev'));
        
        this.nextButton = document.createElement('button');
        this.nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        this.nextButton.addEventListener('click', () => this.navigate('next'));
        
        this.navContainer.appendChild(this.prevButton);
        this.navContainer.appendChild(this.nextButton);
        
        this.container.appendChild(this.navContainer);
        
        this.initialized = true;
        this.updateNavButtons();
    }
    
    resetCarousel() {
        if (!this.initialized) return;
        
        if (this.navContainer) {
            this.navContainer.remove();
        }
        
        this.products.forEach(product => {
            product.style.display = '';
        });
        
        this.initialized = false;
    }
    
    navigate(direction) {
        this.products[this.currentIndex].style.display = 'none';
        
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.products.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
        }
        
        this.products[this.currentIndex].style.display = 'block';
        this.updateNavButtons();
    }
    
    updateNavButtons() {
        this.prevButton.disabled = false;
        this.nextButton.disabled = false;
    }
}

const productsContainer = document.querySelector('.products');
const productCarousel = new ProductCarousel(productsContainer);

const cartButtons = document.querySelectorAll('.product-cart');
let cartCount = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        
        let cartBadge = document.querySelector('.cart-badge');
        
        if (!cartBadge) {
            cartBadge = document.createElement('div');
            cartBadge.className = 'cart-badge';
            document.querySelector('.cta-button').appendChild(cartBadge);
        }
        
        cartBadge.textContent = cartCount;
        
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 500);
        
        showNotification('Produto adicionado ao carrinho!');
    });
});

