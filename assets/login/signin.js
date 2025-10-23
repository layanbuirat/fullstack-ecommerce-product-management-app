document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form validation and submission
    const signinForm = document.getElementById('signinForm');
    const signinBtn = document.querySelector('.signin-btn');
    
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            document.getElementById('email-error').textContent = 'Email is required';
            document.getElementById('email').parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email').parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate password
        const password = document.getElementById('password').value.trim();
        if (!password) {
            document.getElementById('password-error').textContent = 'Password is required';
            document.getElementById('password').parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
            document.getElementById('password').parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            signinBtn.classList.add('loading');
            
            // Here you would typically make an API call to your backend
            // For demonstration, we'll simulate a successful login
            setTimeout(() => {
                signinBtn.classList.remove('loading');
                
                // Show success animation
                signinForm.classList.add('animate__animated', 'animate__zoomOut');
                
                setTimeout(() => {
                    // Redirect to home page after successful login
                    window.location.href = "../../index.html";
                }, 500);
            }, 1500);
        } else {
            // Shake animation for errors
            signinForm.classList.add('animate__animated', 'animate__headShake');
            setTimeout(() => {
                signinForm.classList.remove('animate__animated', 'animate__headShake');
            }, 1000);
        }
    });
    
    // Input focus effects
    document.querySelectorAll('.input-with-icon input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('i').style.color = '#8e6c88';
            this.parentElement.querySelector('.input-highlight').style.width = '100%';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('i').style.color = '#8e6c88';
            if (!this.value) {
                this.parentElement.querySelector('.input-highlight').style.width = '0';
            }
        });
    });
    
    // Helper function for email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});