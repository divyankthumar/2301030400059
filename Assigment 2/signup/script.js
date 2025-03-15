document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
    });
    
    // Password validation criteria
    const lengthCriteria = document.getElementById('length');
    const uppercaseCriteria = document.getElementById('uppercase');
    const lowercaseCriteria = document.getElementById('lowercase');
    const numberCriteria = document.getElementById('number');
    
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        
        // Validate length
        if (password.length >= 8) {
            lengthCriteria.classList.add('valid');
        } else {
            lengthCriteria.classList.remove('valid');
        }
        
        // Validate uppercase
        if (/[A-Z]/.test(password)) {
            uppercaseCriteria.classList.add('valid');
        } else {