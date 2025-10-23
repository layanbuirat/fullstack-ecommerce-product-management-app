document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            document.getElementById('name-error').textContent = 'Please enter your name';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            document.getElementById('email-error').textContent = 'Please enter your email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate phone
        if (phone === '') {
            document.getElementById('phone-error').textContent = 'Please enter your phone number';
            document.getElementById('phone-error').style.display = 'block';
            isValid = false;
        } else if (!isValidPhone(phone)) {
            document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
            document.getElementById('phone-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('message-error').textContent = 'Please enter your message';
            document.getElementById('message-error').style.display = 'block';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it
            console.log('Form submitted:', {
                name,
                email,
                phone,
                subject: document.getElementById('subject').value.trim(),
                message
            });
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // Helper functions for validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation - adjust as needed
        const re = /^[0-9\-\+]{9,15}$/;
        return re.test(phone);
    }
});