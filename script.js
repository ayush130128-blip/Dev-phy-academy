// =========================================
// 3D BACKGROUND (VANTA.JS) INITIALIZATION
// =========================================
const physicsCanvas = document.getElementById('physics-canvas');
if (physicsCanvas) {
    VANTA.NET({
        el: "#physics-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00d2ff,          
        backgroundColor: 0x050814, 
        points: 14.00,            
        maxDistance: 22.00,
        spacing: 18.00
    });
}

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); 

// =========================================
// UI INTERACTIONS & NAVBAR
// =========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); 
    });
}

// =========================================
// COURSES ACCORDION LOGIC
// =========================================
const accordionHeaders = document.querySelectorAll('.accordion-header');
if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// =========================================
// ADMISSION FORM VALIDATION
// =========================================
const enrollmentForm = document.getElementById('enrollmentForm');
const formStatus = document.getElementById('formStatus');

if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const submitBtn = enrollmentForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending Application...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formStatus.innerHTML = '✅ Application submitted successfully! We will contact you soon.';
            formStatus.className = 'form-status success-message';
            enrollmentForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        }, 2000);
    });
}

// =========================================
// CONTACT FORM LOGIC (Now connected to FormSubmit)
// =========================================
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop standard redirect
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        // Gather the form data
        const formData = new FormData(contactForm);

        // Send the data using AJAX to FormSubmit
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactStatus.innerHTML = '✅ Message sent successfully! We will get back to you shortly.';
                contactStatus.className = 'form-status success-message';
                contactForm.reset();
            } else {
                contactStatus.innerHTML = '❌ Oops! There was a problem submitting your form.';
                contactStatus.style.color = '#ef4444'; // Red error text
            }
        })
        .catch(error => {
            contactStatus.innerHTML = '❌ Oops! Network error. Please try again.';
            contactStatus.style.color = '#ef4444';
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => { 
                contactStatus.innerHTML = ''; 
                contactStatus.style.color = ''; // Reset color
            }, 5000);
        });
    });
}

// =========================================
// ABOUT PAGE: NUMBER COUNTER ANIMATION
// =========================================
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter); 
            }
        });
    }, { threshold: 0.5 }); 

    counters.forEach(counter => {
        observer.observe(counter);
    });
}
