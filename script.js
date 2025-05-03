/**
 * JavaScript Interactive Playground
 * This script demonstrates event handling, interactive components, and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initEventHandlers();
    initTabs();
    initGallery();
    initAccordion();
    initFormValidation();
});

/**
 * Event Handling Section
 * Demonstrates various event types including click, hover, keypress, and double-click
 */
function initEventHandlers() {
    const eventOutput = document.getElementById('event-output');
    const colorButton = document.getElementById('color-button');
    const textButton = document.getElementById('text-button');
    const secretButton = document.getElementById('secret-button');
    const keyPressArea = document.querySelector('.key-press-area');
    const keyOutput = document.getElementById('key-output');
    
    // Colors for page background cycling
    const colors = ['#f0f9ff', '#ede9fe', '#fef2f2', '#ecfdf5', '#fff7ed'];
    let colorIndex = 0;
    
    // Text messages for cycling
    const messages = [
        'Click again to see a new message!',
        'JavaScript events are powerful!',
        'Keep clicking for more fun!',
        'Event handling is easy!',
        'You\'re doing great!'
    ];
    let messageIndex = 0;
    
    // Click event - Change page background color
    colorButton.addEventListener('click', function(event) {
        document.body.style.backgroundColor = colors[colorIndex];
        eventOutput.innerHTML = `<p>Background color changed to ${colors[colorIndex]}</p>`;
        colorIndex = (colorIndex + 1) % colors.length;
        
        // Add animation to the button
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 500);
    });
    
    // Click event - Change text content
    textButton.addEventListener('click', function() {
        eventOutput.innerHTML = `<p>${messages[messageIndex]}</p>`;
        messageIndex = (messageIndex + 1) % messages.length;
    });
    
    // Secret double-click event
    secretButton.addEventListener('dblclick', function() {
        eventOutput.innerHTML = '<p>🎉 You discovered the secret double-click action! 🎉</p>';
        
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
    });
    
    // Track long press
    let pressTimer;
    secretButton.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            eventOutput.innerHTML = '<p>🌟 Amazing! You found the long press secret! 🌟</p>';
            document.body.classList.add('rainbow-mode');
            setTimeout(() => {
                document.body.classList.remove('rainbow-mode');
            }, 3000);
        }, 1000);
    });
    
    secretButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Hover event
    const hoverArea = document.querySelector('.hover-area');
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = 'Magic happening! 🪄';
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me to see magic!';
    });
    
    // Keypress event
    keyPressArea.addEventListener('keydown', function(event) {
        keyOutput.textContent = event.key;
        keyOutput.style.color = getRandomColor();
        eventOutput.innerHTML = `<p>Key pressed: ${event.key} (Code: ${event.code})</p>`;
    });
    
    // Focus handling for key press area
    keyPressArea.addEventListener('click', function() {
        this.focus();
    });
}

/**
 * Create a confetti element for animation
 */
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    document.body.appendChild(confetti);
    
    // Animate and remove
    setTimeout(() => {
        document.body.removeChild(confetti);
    }, 3000);
}

/**
 * Generate a random color
 * @returns {string} A random hex color
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Tabs Component
 * Creates interactive tabs that display different content panes
 */
function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tabs
            tabItems.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show selected tab pane
            const targetPaneId = this.getAttribute('data-tab');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });
}

/**
 * Gallery Component
 * Creates an interactive image gallery with thumbnails
 */
function initGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            this.classList.add('active');
            
            // Change main image background color based on data attribute
            const color = this.getAttribute('data-color');
            mainImage.style.backgroundColor = color;
            
            // Add animation to main image
            mainImage.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

/**
 * Accordion Component
 * Creates collapsible content sections
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

/**
 * Form Validation
 * Implements real-time and submit-time form validation
 */
function initFormValidation() {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]');
    const formResult = document.getElementById('form-result');
    
    // Real-time name validation
    nameInput.addEventListener('input', function() {
        validateName();
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    // Real-time password validation with strength meter
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updatePasswordStrength();
    });
    
    // Real-time password confirmation validation
    confirmPasswordInput.addEventListener('input', function() {
        validatePasswordConfirmation();
    });
    
    // Form submission handling
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPasswordConfirmValid = validatePasswordConfirmation();
        const areInterestsValid = validateInterests();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid && areInterestsValid) {
            formResult.innerHTML = `
                <h3>Form Submitted Successfully!</h3>
                <p>Thank you for signing up, ${nameInput.value}!</p>
            `;
            formResult.classList.remove('hide', 'error');
            formResult.classList.add('success');
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                document.getElementById('strength-bar').style.width = '0%';
                document.getElementById('strength-text').textContent = 'Password strength';
                formResult.classList.add('hide');
            }, 3000);
        } else {
            formResult.innerHTML = `
                <h3>Form Submission Failed</h3>
                <p>Please fix the errors highlighted above.</p>
            `;
            formResult.classList.remove('hide', 'success');
            formResult.classList.add('error');
        }
    });
    
    /**
     * Validate the name field
     * @returns {boolean} Whether the name is valid
     */
    function validateName() {
        const nameError = document.getElementById('name-error');
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    }
    
    /**
     * Validate the email field
     * @returns {boolean} Whether the email is valid
     */
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }
    
    /**
     * Validate the password field
     * @returns {boolean} Whether the password is valid
     */
    function validatePassword() {
        const passwordError = document.getElementById('password-error');
        const password = passwordInput.value;
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            passwordInput.classList.add('error');
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('error');
            return true;
        }
    }
    
    /**
     * Update the password strength meter
     */
    function updatePasswordStrength() {
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        const password = passwordInput.value;
        let strength = 0;
        
        // If password is empty, reset the meter
        if (password.length === 0) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '';
            strengthText.textContent = 'Password strength';
            return;
        }
        
        // Add points for length
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 15;
        
        // Add points for complexity
        if (/[A-Z]/.test(password)) strength += 15; // Uppercase letters
        if (/[a-z]/.test(password)) strength += 10; // Lowercase letters
        if (/[0-9]/.test(password)) strength += 15; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special characters
        
        // Update the strength bar
        strengthBar.style.width = strength + '%';
        
        // Update color and text based on strength
        if (strength < 30) {
            strengthBar.style.backgroundColor = '#ef4444'; // var(--danger)
            strengthText.textContent = 'Weak';
        } else if (strength < 60) {
            strengthBar.style.backgroundColor = '#f59e0b'; // var(--warning)
            strengthText.textContent = 'Medium';
        } else if (strength < 80) {
            strengthBar.style.backgroundColor = '#10b981'; // var(--success)
            strengthText.textContent = 'Strong';
        } else {
            strengthBar.style.backgroundColor = '#059669'; // Darker green
            strengthText.textContent = 'Very Strong';
        }
    }
    
    /**
     * Validate the password confirmation field
     * @returns {boolean} Whether the password confirmation matches
     */
    function validatePasswordConfirmation() {
        const confirmPasswordError = document.getElementById('confirm-password-error');
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordInput.classList.add('error');
            return false;
        } else if (confirmPassword !== password) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('error');
            return false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.classList.remove('error');
            return true;
        }
    }
    
    
    /**
     * Validate that at least one interest is selected
     * @returns {boolean} Whether at least one interest is selected
     */
    function validateInterests() {
        const interestsError = document.getElementById('interests-error');
        let isChecked = false;
        
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });
        
        if (!isChecked) {
            interestsError.textContent = 'Please select at least one interest';
            return false;
        } else {
            interestsError.textContent = '';
            return true;
        }
    }
}