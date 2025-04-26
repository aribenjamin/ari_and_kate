// Confetti animation effect for wedding website with simplified execution

// Black and white glitter confetti function
function createDOMConfetti() {
    console.log("Creating black & white glitter confetti");
    // Monochromatic colors for glitter
    const colors = [
        '#FFFFFF', // Pure white
        '#F0F0F0', // Slightly off-white
        '#E0E0E0', // Light gray
        '#D0D0D0', // Medium light gray
        '#303030', // Dark gray
        '#101010', // Nearly black
        '#000000'  // Pure black
    ];
    
    // Check if container already exists and remove it to prevent duplicates
    const existingContainer = document.getElementById('dom-confetti-container');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1'; // Lower z-index so it's behind content
    container.id = 'dom-confetti-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 5; // 5-13px (smaller for glitter look)
            const isCircle = Math.random() > 0.5;
            
            confetti.style.position = 'absolute';
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px';
            confetti.style.borderRadius = isCircle ? '50%' : '0';
            confetti.style.opacity = '0.9';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Enhanced shine effect for glitter
            confetti.style.boxShadow = `0 0 3px rgba(255,255,255,0.8), 0 0 2px rgba(0,0,0,0.3)`;
            
            // Add gradient for metallic look to some particles
            if (Math.random() > 0.5) {
                const isLight = color.charAt(1) > '8'; // Check if it's a lighter color
                if (isLight) {
                    confetti.style.background = `linear-gradient(135deg, ${color} 20%, #FFFFFF 50%, ${color} 80%)`;
                } else {
                    confetti.style.background = `linear-gradient(135deg, ${color} 30%, #909090 50%, ${color} 70%)`;
                }
            }
            
            container.appendChild(confetti);
            
            // Animate falling - keeping the same animation approach
            const duration = Math.random() * 3 + 2; // 2-5s
            const delay = Math.random() * 0.5; // 0-0.5s
            
            confetti.style.transition = `top ${duration}s ease ${delay}s, 
                                        left ${duration}s ease ${delay}s, 
                                        transform ${duration}s ease ${delay}s`;
            
            // Start animation after a tiny delay to ensure transition works
            setTimeout(() => {
                confetti.style.top = `${window.innerHeight + 20}px`;
                confetti.style.left = `${parseFloat(confetti.style.left) + (Math.random() * 40 - 20)}%`;
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
                
                // Remove after animation completes
                setTimeout(() => {
                    confetti.remove();
                }, (duration + delay) * 1000 + 500);
            }, 10);
        }, Math.random() * 500); // Stagger creation
    }
}

// Trigger confetti right away (only on homepage)
if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname === '/' || 
    window.location.pathname.split('/').pop() === '') {
    
    document.addEventListener('DOMContentLoaded', function() {
        // Short delay before triggering confetti
        setTimeout(createDOMConfetti, 200);
    });
}