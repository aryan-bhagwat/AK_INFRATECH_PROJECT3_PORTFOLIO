// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup navigation
    setupNavigation();
    
    // Setup scroll to top button
    setupScrollToTop();
    
    // Setup project filtering
    setupProjectFilters();
    
    // Setup form submission
    setupContactForm();
    
    // Setup CV button
    setupCVButton();
    
    // Load theme preference
    loadTheme();
});

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
        // Remove the preventDefault to allow the form to submit
        contactForm.addEventListener('submit', function() {
            // Show success message
            showFormMessage('Message sent successfully! Thank you for contacting me.', 'success');
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

// Toggle between light and dark theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference to local storage
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load theme preference from local storage
function loadTheme() {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
    }
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// After the setupContactForm function, add this:
// Setup CV button functionality
function setupCVButton() {
    const cvButton = document.getElementById('cv-button');
    const cvDownloadButton = document.getElementById('cv-download-button');
    
    if (cvButton) {
        // Set up the view button
        cvButton.setAttribute('href', 'Aryan Bhagwat Resume.pdf');
        cvButton.setAttribute('target', '_blank');
        
        // Add click event to handle potential errors for view button
        cvButton.addEventListener('click', function(e) {
            // If the file doesn't exist, prevent default and show a message
            fetch(cvButton.getAttribute('href'))
                .catch(function() {
                    e.preventDefault();
                    alert('The CV file is currently unavailable. Please try again later.');
                });
        });
    }
    
    if (cvDownloadButton) {
        // Set up the download button
        cvDownloadButton.setAttribute('href', 'Aryan Bhagwat Resume.pdf');
        cvDownloadButton.setAttribute('download', 'Aryan_Bhagwat_Resume.pdf');
        
        // Add click event to handle potential errors for download button
        cvDownloadButton.addEventListener('click', function(e) {
            // If the file doesn't exist, prevent default and show a message
            fetch(cvDownloadButton.getAttribute('href'))
                .catch(function() {
                    e.preventDefault();
                    alert('The CV file is currently unavailable for download. Please try again later.');
                });
        });
    }
}