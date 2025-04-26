document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Initialize gallery if it exists
    initializeGallery();
});

// Function to highlight the current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if ((href === currentPage) || 
            (currentPage === 'index.html' && href === '/') || 
            (currentPage === '' && href === '/')) {
            link.classList.add('active');
        }
    });
}

// Function to set up smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery initialization for venue page
function initializeGallery() {
    const galleryContainers = document.querySelectorAll('.gallery-container');
    
    galleryContainers.forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const indicators = gallery.querySelectorAll('.indicator');
        
        // Exit if no slides
        if (!slides.length) return;
        
        let currentSlide = 0;
        
        // Show first slide initially
        slides[0].classList.add('active');
        indicators?.[0]?.classList.add('active');
        
        // Add click events to controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        // Add click events to indicators
        if (indicators.length) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
        
        // Function to show a specific slide
        function showSlide(index) {
            // Handle wrapping around
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            indicators?.[currentSlide]?.classList.remove('active');
            
            // Add active class to new slide
            slides[index].classList.add('active');
            indicators?.[index]?.classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Auto-advance slides every 5 seconds
        let autoplayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Pause autoplay on hover
        gallery.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        // Resume autoplay on mouse leave
        gallery.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    });
}