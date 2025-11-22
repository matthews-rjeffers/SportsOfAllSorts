/**
 * Sports of All Sorts - Main JavaScript
 * Handles navigation, smooth scrolling, form validation, and UI interactions
 */

(function() {
    'use strict';

    // -----------------
    // DOM Elements
    // -----------------
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const contactForm = document.getElementById('contact-form');

    // -----------------
    // Mobile Navigation
    // -----------------
    function initMobileNav() {
        if (!mobileMenuBtn || !mainNav) return;

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMobileMenu);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
                closeAllDropdowns();
            }
        });
    }

    function toggleMobileMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');

        // Trap focus within menu when open
        if (!isExpanded) {
            mainNav.querySelector('a, button').focus();
        }
    }

    function closeMobileMenu() {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
    }

    // -----------------
    // Dropdown Menus
    // -----------------
    function initDropdowns() {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.nav-dropdown');

            // Toggle on click (for mobile and accessibility)
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDropdown(dropdown);
            });

            // Keyboard navigation
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDropdown(dropdown);
                }
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    openDropdown(dropdown);
                    const firstLink = dropdown.querySelector('.dropdown-menu a');
                    if (firstLink) firstLink.focus();
                }
            });
        });

        // Handle keyboard navigation within dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            const links = menu.querySelectorAll('a');

            links.forEach((link, index) => {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = links[index + 1] || links[0];
                        next.focus();
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = links[index - 1] || links[links.length - 1];
                        prev.focus();
                    }
                    if (e.key === 'Escape') {
                        const dropdown = link.closest('.nav-dropdown');
                        closeDropdown(dropdown);
                        dropdown.querySelector('.dropdown-toggle').focus();
                    }
                });
            });
        });
    }

    function toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        closeAllDropdowns();
        if (!isActive) {
            openDropdown(dropdown);
        }
    }

    function openDropdown(dropdown) {
        dropdown.classList.add('active');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
    }

    function closeDropdown(dropdown) {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
            closeDropdown(dropdown);
        });
    }

    // -----------------
    // Header Scroll Effect
    // -----------------
    function initHeaderScroll() {
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        updateHeader();
    }

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // -----------------
    // Smooth Scrolling
    // -----------------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                // Close mobile menu if open
                closeMobileMenu();

                // Calculate offset (header height + some padding)
                const headerHeight = header ? header.offsetHeight : 0;
                const offset = headerHeight + 20;

                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);

                // Set focus on target for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            });
        });
    }

    // -----------------
    // Active Navigation Link
    // -----------------
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');

        if (sections.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    updateActiveNavLink(id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    // -----------------
    // Contact Form
    // -----------------
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        let isValid = true;

        // Validate all fields
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Focus first invalid field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.querySelector('input, select, textarea').focus();
            }
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormSuccess(form);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Check required
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Check email format
        if (isValid && type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Check phone format (optional, basic validation)
        if (isValid && type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]{7,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Update UI
        const formGroup = field.closest('.form-group');
        if (!isValid) {
            showError(formGroup, errorMessage);
        } else {
            clearError(field);
        }

        return isValid;
    }

    function showError(formGroup, message) {
        formGroup.classList.add('error');

        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Add new error message
        const errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        errorEl.setAttribute('role', 'alert');
        formGroup.appendChild(errorEl);
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        const errorEl = formGroup.querySelector('.error-message');
        if (errorEl) errorEl.remove();
    }

    function showFormSuccess(form) {
        // Create success message
        const successEl = document.createElement('div');
        successEl.className = 'form-success';
        successEl.setAttribute('role', 'status');
        successEl.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        `;

        // Add success styles
        successEl.style.cssText = `
            text-align: center;
            padding: 3rem;
            background: #ecfdf5;
            border-radius: 1rem;
            color: #065f46;
        `;

        const successIcon = successEl.querySelector('.success-icon');
        successIcon.style.cssText = `
            width: 60px;
            height: 60px;
            margin: 0 auto 1rem;
            background: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
        `;

        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successEl);
    }

    // -----------------
    // Intersection Observer for Animations
    // -----------------
    function initScrollAnimations() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const animatedElements = document.querySelectorAll(
            '.service-card, .league-card, .bowling-card, .party-card, .training-card'
        );

        if (animatedElements.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // -----------------
    // Error message styles (add to page)
    // -----------------
    function addFormStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error input,
            .form-group.error select,
            .form-group.error textarea {
                border-color: #ef4444;
            }
            .error-message {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.875rem;
                color: #ef4444;
            }
        `;
        document.head.appendChild(style);
    }

    // -----------------
    // Initialize Everything
    // -----------------
    function init() {
        addFormStyles();
        initMobileNav();
        initDropdowns();
        initHeaderScroll();
        initSmoothScroll();
        initActiveNavLink();
        initContactForm();
        initScrollAnimations();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
