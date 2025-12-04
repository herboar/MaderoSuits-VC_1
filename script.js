// ====================================
// Animarek Studios - Fluid Animations
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initSmoothScroll();
    initHeaderScroll();
});

// ====================================
// Navigation
// ====================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }

    hamburger?.addEventListener('click', openMobileMenu);
    closeBtn?.addEventListener('click', closeMobileMenu);

    // Close on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ====================================
// Scroll Animations (Intersection Observer)
// ====================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // Service cards stagger animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ====================================
// Parallax Effects
// ====================================
function initParallaxEffects() {
    const blobs = document.querySelectorAll('.blob');
    const orbs = document.querySelectorAll('.gradient-orb');
    const heroFrame = document.querySelector('.hero-frame');
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Smooth animation loop
    function animate() {
        // Lerp for smooth movement
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        // Apply to blobs
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 15;
            blob.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });
        
        // Apply to orbs
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 10;
            orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });
        
        // Apply to hero frame
        if (heroFrame) {
            heroFrame.style.transform = `perspective(1000px) rotateY(${currentX * 5}deg) rotateX(${-currentY * 5}deg)`;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Scroll-based parallax
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax for hero elements
                const heroText = document.querySelector('.hero-text');
                const heroVisual = document.querySelector('.hero-visual');
                
                if (heroText && scrolled < window.innerHeight) {
                    heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroText.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                }
                
                if (heroVisual && scrolled < window.innerHeight) {
                    heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// Header Scroll Effect
// ====================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background change
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ====================================
// Active Navigation Highlighting
// ====================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ====================================
// Magnetic Button Effect
// ====================================
document.querySelectorAll('.cta-button, .contact-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ====================================
// Service Card Tilt Effect
// ====================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `
            perspective(1000px)
            translateY(-10px)
            rotateX(${y * -10}deg)
            rotateY(${x * 10}deg)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ====================================
// Preloader (optional enhancement)
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 100);
        });
    }, 500);
});
