// Toggle password visibility
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update eye icon if needed
        // You can add SVG changes here if you want to switch between visible/hidden eye icons
    });
    
    // Form submission handler (prevent default for demo)
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // You would typically send this data to your server for authentication
        console.log('Login attempt:', { email, password, rememberMe });
        
        // For demo purposes only - you would implement actual authentication logic
        alert('Login form submitted! Check console for details.');
    });
});
