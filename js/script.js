/**
 * Ahmed Sayed Amroon - Professional Portfolio Script
 * Pure Vanilla JavaScript (ES6) with zero external library dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CUSTOM PRELOADER & HERO INTRUDERS
       ========================================== */
    const preloader = document.getElementById('preloader');

    // Hide preloader overlay when all assets and documents are ready
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('fade-out');
        }

        // Trigger entrance animations for hero elements with a slight delay
        setTimeout(() => {
            const heroElements = document.querySelectorAll('#hero .animate-reveal');
            heroElements.forEach(element => {
                element.classList.add('ready');
            });
        }, 150);
    });

    // Fallback: make sure page is accessible if the load event takes too long
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');

            const heroElements = document.querySelectorAll('#hero .animate-reveal');
            heroElements.forEach(element => {
                element.classList.add('ready');
            });
        }
    }, 3000);


    /* ==========================================
       2. LIGHT / DARK THEME PREFERENCE MANAGER
       ========================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    // Default to dark theme unless user has explicitly saved 'light'
    const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    // Apply the saved preference immediately
    if (storedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }

    // Toggle listener for Sun/Moon interaction button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }


    /* ==========================================
       3. TYPEWRITING EFFECT (HERO HEADLINE)
       ========================================== */
    const typingTarget = document.getElementById('typingTarget');
    const wordsToType = ['Software Engineer', 'Flutter Developer', 'Mobile Architect'];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeletingMode = false;
    let speedTimer = 100;

    function handleTypingLoop() {
        if (!typingTarget) return;

        const currentWord = wordsToType[currentWordIndex];

        if (isDeletingMode) {
            // Remove letters
            typingTarget.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            speedTimer = 50; // Deletes faster
        } else {
            // Print letters
            typingTarget.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            speedTimer = 120; // Natural typing speed
        }

        // State validation switches
        if (!isDeletingMode && currentCharIndex === currentWord.length) {
            // Word fully typed, pause before deleting
            isDeletingMode = true;
            speedTimer = 2200;
        } else if (isDeletingMode && currentCharIndex === 0) {
            // Word fully deleted, move to the next word
            isDeletingMode = false;
            currentWordIndex = (currentWordIndex + 1) % wordsToType.length;
            speedTimer = 400; // Pause before typing starts
        }

        setTimeout(handleTypingLoop, speedTimer);
    }

    // Start typing loop with a small introductory delay
    if (typingTarget) {
        setTimeout(handleTypingLoop, 1200);
    }


    /* ==========================================
       4. SCROLL PROGRESS, NAV BLUR & BACK TO TOP
       ========================================== */
    const mainHeader = document.getElementById('mainHeader');
    const scrollProgressBar = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Compute and update top linear progress bar width
        if (totalScrollableHeight > 0) {
            const progressPercentage = (scrollTop / totalScrollableHeight) * 100;
            if (scrollProgressBar) {
                scrollProgressBar.style.width = `${progressPercentage}%`;
            }
        }

        // Apply sticky glass navbar class on scroll offset
        if (mainHeader) {
            if (scrollTop > 30) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }

        // Display/hide Back to Top button
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // Hook Back to Top scroll transition click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ==========================================
       5. MOBILE NAVIGATION MENU (HAMBURGER)
       ========================================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isMenuExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle ARIA validation state
            mobileMenuToggle.setAttribute('aria-expanded', !isMenuExpanded);
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu once a drawer link is chosen
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ==========================================
       6. INTERSECTION OBSERVERS (REVEALS / SCROLLS)
       ========================================== */

    // Observer options for revealing sections and tracking active navigation item
    const generalObserverOptions = {
        root: null,
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0.05
    };

    const generalSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal section container elements via CSS transition
                entry.target.classList.add('visible');

                // Update active link classes based on section ID in view
                const activeSectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeSectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, generalObserverOptions);

    // Track sections marked with fade reveal triggers
    const revealSections = document.querySelectorAll('.scroll-reveal-trigger');
    revealSections.forEach(section => {
        generalSectionObserver.observe(section);
    });

    // Also observe the Hero section to properly reset active highlights when scrolling to the top
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        generalSectionObserver.observe(heroSection);
    }


    /* ==========================================
       7. INTERSECTION OBSERVER FOR SKILLS BARS
       ========================================== */
    const skillCards = document.querySelectorAll('.skill-card');

    const skillsObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const skillsSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Select internal progress elements and apply their final width
                const progressFillBars = entry.target.querySelectorAll('.skill-bar-fill');
                progressFillBars.forEach(fillBar => {
                    const finalPercentage = fillBar.getAttribute('data-percentage');
                    fillBar.style.width = finalPercentage;
                });

                // Stop observing this card since progress is now animated
                skillsSectionObserver.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);

    skillCards.forEach(card => {
        skillsSectionObserver.observe(card);
    });


    /* ==========================================
       8. EMAILJS CONFIGURATION & CONTACT FORM HANDLER
       ==========================================
       Replace the placeholders below with your EmailJS credentials:
       - PUBLIC_KEY: EmailJS Account -> Account Settings -> Public Key
       - SERVICE_ID: EmailJS Email Services -> Service ID
       - TEMPLATE_ID: EmailJS Email Templates -> Template ID
       ========================================== */
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'wgXW2U-W-KpxNyTfw',   // e.g. "user_xxxxxxxxxxxx"
        SERVICE_ID: 'service_c8fp4s8',   // e.g. "service_xxxxxxxx"
        TEMPLATE_ID: 'template_u3ucr9v'  // e.g. "template_xxxxxxx"
    };

    // Initialize EmailJS if public key is configured
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    }

    // Email Contact Card: Open user's default email client when card is clicked
    const emailContactCard = document.getElementById('emailContactCard');
    if (emailContactCard) {
        emailContactCard.addEventListener('click', (e) => {
            // Prevent duplicate trigger if user clicked directly on the <a> link
            if (!e.target.closest('a')) {
                window.location.href = 'mailto:ahmedlsayed45@gmail.com';
            }
        });
    }

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status-message ${type}`;
    }

    function clearFormStatus() {
        if (!formStatus) return;
        formStatus.textContent = '';
        formStatus.className = 'form-status-message';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearFormStatus();

            const formName = document.getElementById('formName');
            const formEmail = document.getElementById('formEmail');
            const formMessage = document.getElementById('formMessage');
            const submitBtn = contactForm.querySelector('.submit-btn');

            if (!submitBtn) return;

            const nameVal = formName ? formName.value.trim() : '';
            const emailVal = formEmail ? formEmail.value.trim() : '';
            const messageVal = formMessage ? formMessage.value.trim() : '';

            // 1. Basic Form Validation
            if (!nameVal) {
                showFormStatus('Please enter your full name.', 'error');
                if (formName) formName.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                showFormStatus('Please enter a valid email address.', 'error');
                if (formEmail) formEmail.focus();
                return;
            }

            if (!messageVal) {
                showFormStatus('Please enter your message.', 'error');
                if (formMessage) formMessage.focus();
                return;
            }

            const originalBtnHtml = submitBtn.innerHTML;

            // 2. Loading State: Prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.style.pointerEvents = 'none';
            submitBtn.innerHTML = `
                <span>Sending Message...</span>
                <svg class="spinner-inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style="animation: spin 1s infinite linear;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                </svg>
            `;

            const resetSubmitButton = () => {
                submitBtn.disabled = false;
                submitBtn.style.pointerEvents = '';
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
                submitBtn.innerHTML = originalBtnHtml;
            };

            // 3. Verify EmailJS SDK
            if (typeof emailjs === 'undefined') {
                showFormStatus('EmailJS SDK is not loaded. Please check script integration.', 'error');
                resetSubmitButton();
                return;
            }

            // Check if placeholders are configured
            if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
                EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
                EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {

                showFormStatus('EmailJS credentials are not configured. Please set your PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID in js/script.js.', 'error');

                submitBtn.style.backgroundColor = '#EF4444';
                submitBtn.style.borderColor = '#EF4444';
                submitBtn.innerHTML = `<span>Config Required ✕</span>`;

                setTimeout(resetSubmitButton, 4000);
                return;
            }

            // 4. EmailJS Template Parameters
            const titleVal = `Portfolio Inquiry from ${nameVal}`;

            const templateParams = {
                name: nameVal,
                email: emailVal,
                title: titleVal,
                message: messageVal,
                reply_to: emailVal,
                to_email: 'ahmedlsayed45@gmail.com'
            };

            // 5. Send Email via EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            )
                .then(() => {
                    submitBtn.style.backgroundColor = '#10B981';
                    submitBtn.style.borderColor = '#10B981';
                    submitBtn.innerHTML = `<span>Message Sent! ✓</span>`;
                    showFormStatus('Thank you! Your message has been sent successfully.', 'success');

                    // Clear form fields only on successful sending
                    contactForm.reset();

                    setTimeout(resetSubmitButton, 3000);
                })
                .catch((error) => {
                    console.error('EmailJS Submission Error:', error);
                    submitBtn.style.backgroundColor = '#EF4444';
                    submitBtn.style.borderColor = '#EF4444';
                    submitBtn.innerHTML = `<span>Failed to Send ✕</span>`;
                    showFormStatus('Failed to send message. Please try again or email directly to ahmedlsayed45@gmail.com.', 'error');

                    setTimeout(resetSubmitButton, 3000);
                });
        });
    }


    /* ==========================================
       9. DYNAMIC DATES SETUP
       ========================================== */
    const currentYearField = document.getElementById('currentYear');
    if (currentYearField) {
        currentYearField.textContent = new Date().getFullYear();
    }

});
