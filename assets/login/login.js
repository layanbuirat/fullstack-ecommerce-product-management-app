document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Form validation
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.querySelector('.register-btn');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            document.getElementById('firstName-error').textContent = 'First name is required';
            document.getElementById('firstName').parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate last name
        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            document.getElementById('lastName-error').textContent = 'Last name is required';
            document.getElementById('lastName').parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
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
        
        // Validate phone
        const phone = document.getElementById('phone').value.trim();
        if (!phone) {
            document.getElementById('phone-error').textContent = 'Phone number is required';
            document.getElementById('phone').parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
            document.getElementById('phone').parentElement.parentElement.classList.add('error');
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
        
        // Validate confirm password
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        if (!confirmPassword) {
            document.getElementById('confirmPassword-error').textContent = 'Please confirm your password';
            document.getElementById('confirmPassword').parentElement.parentElement.classList.add('error');
            isValid = false;
        } else if (confirmPassword !== password) {
            document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
            document.getElementById('confirmPassword').parentElement.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate terms
        if (!document.getElementById('terms').checked) {
            document.getElementById('terms-error').textContent = 'You must accept the terms';
            document.getElementById('terms').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            registerBtn.classList.add('loading');
            
            // Simulate API call (replace with actual registration logic)
            setTimeout(() => {
                registerBtn.classList.remove('loading');
                
                // Show success animation
                registerForm.classList.add('animate__animated', 'animate__zoomOut');
                
                setTimeout(() => {
                    // Redirect after animation completes
                    window.location.href = "../login/login.html";
                }, 500);
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Shake animation for errors
            registerForm.classList.add('animate__animated', 'animate__headShake');
            setTimeout(() => {
                registerForm.classList.remove('animate__animated', 'animate__headShake');
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
    
    // Helper functions for validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation - adjust as needed for your region
        const re = /^[0-9\-\+]{9,15}$/;
        return re.test(phone);
    }
});