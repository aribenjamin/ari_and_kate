// Add simple animation effects to the wedding website
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animations to page elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100 * (index + 1));
    });
    
    // Add parallax effect to background images if they exist
    window.addEventListener('scroll', function() {
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        
        parallaxBgs.forEach(bg => {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = bg.getAttribute('data-speed') || 0.5;
            
            // Apply the parallax effect
            bg.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        });
    });
    
    // Add smooth animations to navigation points
    const navPoints = document.querySelectorAll('.nav-point');
    
    navPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.querySelector('.point').style.transform = 'scale(1.3)';
            this.querySelector('.point').style.transition = 'transform 0.3s ease';
        });
        
        point.addEventListener('mouseleave', function() {
            this.querySelector('.point').style.transform = 'scale(1)';
        });
    });
});

// Add a simple gallery slideshow for the venue page
function initializeGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const slides = galleryContainer.querySelectorAll('.gallery-slide');
    const prevBtn = galleryContainer.querySelector('.gallery-prev');
    const nextBtn = galleryContainer.querySelector('.gallery-next');
    
    let currentSlide = 0;
    
    // Hide all slides initially except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Add event listeners to buttons
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
    
    function showSlide(index) {
        // Handle wrapping around
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // Hide current slide
        slides[currentSlide].style.display = 'none';
        
        // Show new slide
        slides[index].style.display = 'block';
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);