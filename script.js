// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initScrollEffects();
    initTypingAnimation();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initCreativeAnimations();
});

// Enhanced Theme Toggle with Smooth Transitions
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
    
    setTheme(initialTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function(e) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Theme toggle clicked. Current:', currentTheme, 'New:', newTheme);
        
        // Create elegant transition effect
        createThemeTransition(e);
        
        setTimeout(() => {
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }, 150);
    });
    
    // Listen for system theme changes
    prefersDark.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function createThemeTransition(event) {
    const transition = document.createElement('div');
    const rect = event.target.closest('.theme-toggle').getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    transition.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: 0;
        height: 0;
        background: var(--accent-primary);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 0.1;
    `;
    
    document.body.appendChild(transition);
    
    requestAnimationFrame(() => {
        const size = Math.max(window.innerWidth, window.innerHeight) * 2.5;
        transition.style.width = size + 'px';
        transition.style.height = size + 'px';
    });
    
    setTimeout(() => transition.remove(), 800);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = theme === 'dark' ? '#0f0f0f' : '#fdfcfb';
    }
    
    // Debug log
    console.log('Theme changed to:', theme);
}

// Professional Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const navLinksArray = document.querySelectorAll('.nav-link');

    if (!hamburger || !navLinks || !navbar) return;

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on nav links
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link based on scroll position
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const roles = [
        'Lead Senior Consultant (Cyber Security)',
       
        
    ];
    
    const roleElement = document.getElementById('roleText');
    if (!roleElement) return;
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeRole();
                }, 2000);
                return;
            }
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            }
        }
        
        const timeout = isDeleting ? 50 : 100;
        setTimeout(typeRole, timeout);
    }

    // Start typing animation after page load
    setTimeout(typeRole, 1500);
}

// Professional Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-item')) {
                    setTimeout(() => animateSkillBar(entry.target), 200);
                }
                
                if (entry.target.classList.contains('story-card')) {
                    const cards = document.querySelectorAll('.story-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, index * 150);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    if (progressBar && !progressBar.animated) {
        const targetWidth = progressBar.getAttribute('data-width');
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
            progressBar.animated = true;
        }, 300);
    }
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm();
        if (!isValid) return;
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission with professional feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        
        // Loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Success state
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            submitButton.innerHTML = '<span class="btn-text">Message Sent!</span><div class="btn-arrow">✓</div>';
            
            setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.classList.remove('success');
                submitButton.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
        
        console.log('Form submitted:', formObject);
    });
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('invalid');
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    field.classList.add('valid');
    clearFieldError(field);
    return true;
}

function clearValidation(e) {
    const field = e.target;
    field.classList.remove('valid', 'invalid');
    clearFieldError(field);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Creative Animations and Interactions
function initCreativeAnimations() {
    // Profile frame 3D effect
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
        profileFrame.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * 5;
            const rotateY = (mouseX / rect.width) * -5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Social links platform-specific hover colors
    const socialLinks = document.querySelectorAll('.social-link[data-platform]');
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-platform');
        let hoverColor;
        
        switch(platform) {
            case 'github': hoverColor = '#333'; break;
            case 'linkedin': hoverColor = '#0077b5'; break;
            case 'twitter': hoverColor = '#1da1f2'; break;
            case 'dribbble': hoverColor = '#ea4c89'; break;
            default: hoverColor = 'var(--accent-primary)';
        }
        
        link.addEventListener('mouseenter', function() {
            this.style.setProperty('--hover-color', hoverColor);
        });
    });
    
    // Decorative stars interaction
    const stars = document.querySelectorAll('.deco-star');
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            this.style.animation = 'gentleTwinkle 0.6s ease-in-out 2';
        });
    });
    
    // Floating shapes interaction on scroll
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Page Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance Optimizations
const resizeObserver = new ResizeObserver(debounce(() => {
    // Handle resize events efficiently
    const isMobile = window.innerWidth <= 768;
    document.documentElement.style.setProperty('--is-mobile', isMobile ? '1' : '0');
}, 100));

resizeObserver.observe(document.documentElement);

// Console Branding
console.log('%c🏛️ Welcome to my Museum-Quality Portfolio!', 
    'color: #8b6f47; font-size: 24px; font-weight: 600; font-family: "Playfair Display", serif;');
console.log('%c✨ Inspired by Harvey.ai aesthetics and Louvre sophistication', 
    'color: #6b5b73; font-size: 14px; font-style: italic;');
console.log('%c💼 Crafted for GFG Patna Workshop', 
    'color: #7c8471; font-size: 12px;');
console.log('%c🎨 Professional • Elegant • Unique', 
    'color: #c19a6b; font-size: 12px; font-weight: 500;');
    