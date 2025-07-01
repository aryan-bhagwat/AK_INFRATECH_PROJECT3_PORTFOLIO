// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Defer non-critical operations
    setTimeout(() => {
        initAnimations();
        setupProjectFilters();
        setupCVButton();
    }, 100);

    // Critical operations
    setupNavigation();
    setupScrollToTop();
    setupContactForm();
    loadTheme();
});

// Add throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Update scroll event listeners to use throttle
function setupScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    }, 100));
}

// Initialize animations for elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.hero-content, .section-header, .about-content, .skill-category, .project-card, .contact-content');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('animate');
        element.classList.add(`delay-${(index % 4) + 1}`);
    });
}

// Setup navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Highlight active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
        
        // Add scrolled class to header
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Setup scroll to top button
function setupScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
}

// Setup project filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Setup contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Re-enable button after submission (success or failure)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                showFormMessage('Message sent successfully! Thank you for contacting me.', 'success');
            }, 1000);
        });
    }
}

function showFormMessage(message, type) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        document.getElementById('contactForm').appendChild(messageElement);
    }
    
    // Set message content and type
    messageElement.textContent = message;
    messageElement.className = 'form-message';
    messageElement.classList.add(type === 'success' ? 'success-message' : 'error-message');
    
    // Show message
    messageElement.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}
