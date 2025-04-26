document.addEventListener('DOMContentLoaded', function() {
    // Position navigation points along the braid path
    positionNavPoints();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Function to position navigation points along the SVG path
function positionNavPoints() {
    const braidPath = document.querySelector('.braid-path');
    const navPoints = document.querySelectorAll('.nav-point');
    const braidContainer = document.querySelector('.braid-container');
    
    if (!braidPath || navPoints.length === 0 || !braidContainer) return;
    
    // Get the total length of the path
    const pathLength = braidPath.getTotalLength ? braidPath.getTotalLength() : 1000;
    if (!pathLength) return;
    
    // Get container dimensions for scaling calculations
    const containerRect = braidContainer.getBoundingClientRect();
    const svgRect = braidPath.getBoundingClientRect();
    
    // SVG viewBox dimensions (from the SVG element)
    const svgElement = braidPath.closest('svg');
    const viewBoxWidth = svgElement ? parseFloat(svgElement.getAttribute('viewBox').split(' ')[2]) : 1000;
    const viewBoxHeight = svgElement ? parseFloat(svgElement.getAttribute('viewBox').split(' ')[3]) : 200;
    
    // Calculate scale factors
    const scaleX = containerRect.width / viewBoxWidth;
    const scaleY = containerRect.height / viewBoxHeight;
    
    // Position each nav point along the path at specific intervals
    navPoints.forEach((point, index) => {
        // Calculate position along the path (evenly spaced)
        const position = pathLength * (index + 1) / (navPoints.length + 1);
        
        // Get the point coordinates at this position
        if (braidPath.getPointAtLength) {
            const pointOnPath = braidPath.getPointAtLength(position);
            
            // Convert SVG coordinates to page coordinates
            const x = (pointOnPath.x * scaleX);
            const y = (pointOnPath.y * scaleY);
            
            // Set the point's position as percentage of container width
            const xPercent = (x / containerRect.width) * 100;
            point.style.left = `${xPercent}%`;
            
            // Set absolute position for y-coordinate
            point.style.top = `${y+22}px`;
            
            // For debugging
            console.log(`Nav point ${index+1} positioned at SVG(${pointOnPath.x}, ${pointOnPath.y}), Screen(${x}, ${y})`);
        }
    });
}

// Handle page transitions with a simple fade effect
window.addEventListener('pageshow', function() {
    document.body.classList.add('fade-in');
});

// Add active class to current page nav item
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage) {
        document.querySelectorAll('.nav-point').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    } else {
        // On index page
        document.querySelector('.nav-point[href="index.html"]')?.classList.add('active');
    }
});