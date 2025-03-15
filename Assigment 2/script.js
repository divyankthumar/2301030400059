document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.planet-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                section.classList.add('active');
                
                // Add a slight delay to content animation
                setTimeout(() => {
                    section.querySelector('.content-box').classList.add('fade-in');
                }, 300);
            }
        });
    };
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .planet-section {
            opacity: 0.7;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .planet-section.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .content-box {
            opacity: 0;
            transform: translateX(20px);
            transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
        }
        
        .content-box.fade-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .visual-box {
            position: relative;
            overflow: hidden;
        }
        
        .visual-box::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(74, 158, 255, 0.2), rgba(125, 74, 229, 0.2));
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .active .visual-box::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Interactive orbit visualization (simplified)
    const orbitVisualization = document.querySelector('#orbit-visualization .visual-box');
    if (orbitVisualization) {
        // Create canvas for orbit visualization
        const canvas = document.createElement('canvas');
        canvas.width = orbitVisualization.offsetWidth;
        canvas.height = orbitVisualization.offsetHeight;
        orbitVisualization.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Simple orbit animation
        const drawOrbits = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Center point (sun)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Draw sun
            ctx.beginPath();
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#ffcc00';
            ctx.fill();
            
            // Draw orbits
            const time = Date.now() / 1000;
            const planets = [
                { radius: 60, speed: 1.5, color: '#e67e22', size: 5, glow: '#ff9f43' }, // Mercury-like
                { radius: 100, speed: 1.0, color: '#3498db', size: 7, glow: '#74b9ff' }, // Earth-like
                { radius: 150, speed: 0.7, color: '#e74c3c', size: 6, glow: '#ff7675' }, // Mars-like
                { radius: 200, speed: 0.5, color: '#f1c40f', size: 10, glow: '#ffeaa7' } // Jupiter-like
            ];
            
            planets.forEach(planet => {
                // Draw orbit path
                ctx.beginPath();
                ctx.arc(centerX, centerY, planet.radius, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.stroke();
                
                // Calculate planet position
                const angle = time * planet.speed;
                const x = centerX + Math.cos(angle) * planet.radius;
                const y = centerY + Math.sin(angle) * planet.radius;
                
                // Draw planet glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 2);
                gradient.addColorStop(0, planet.glow);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.beginPath();
                ctx.arc(x, y, planet.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Draw planet
                ctx.beginPath();
                ctx.arc(x, y, planet.size, 0, Math.PI * 2);
                ctx.fillStyle = planet.color;
                ctx.fill();
                
                // Add highlight
                ctx.beginPath();
                ctx.arc(x - planet.size/3, y - planet.size/3, planet.size/4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fill();
            });
            
            requestAnimationFrame(drawOrbits);
        };
        
        drawOrbits();
    }
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
    
    // Resize handler for canvas
    window.addEventListener('resize', function() {
        const canvas = document.querySelector('#orbit-visualization canvas');
        if (canvas) {
            canvas.width = orbitVisualization.offsetWidth;
            canvas.height = orbitVisualization.offsetHeight;
        }
    });
});