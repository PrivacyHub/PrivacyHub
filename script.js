// Course data from the image
const courses = [
    {
        title: "Thesis & Research Writing",
        icon: "fas fa-file-alt",
        description: "Master academic writing, research methodology, and thesis preparation for higher education and research careers.",
        tags: ["Academic", "Writing", "Research"]
    },
    {
        title: "Statistical Analysis Software",
        icon: "fas fa-chart-bar",
        description: "Learn industry-standard tools: SPSS, R-Studio, Minitab, Excel Data Analysis ToolPak, Tableau, and Python for data analysis.",
        tags: ["SPSS", "R-Studio", "Tableau", "Python"]
    },
    {
        title: "Programming Languages",
        icon: "fas fa-code",
        description: "Comprehensive programming courses in Python, Java, C++, JavaScript, R, MATLAB, and SQL for software development.",
        tags: ["Python", "Java", "C++", "JavaScript", "SQL"]
    },
    {
        title: "Website Development",
        icon: "fas fa-laptop-code",
        description: "Full-stack web development training covering HTML, CSS, JavaScript, React, and WordPress.",
        tags: ["HTML/CSS", "JavaScript", "React", "WordPress"]
    },
    {
        title: "AI and Machine Learning",
        icon: "fas fa-robot",
        description: "Cutting-edge AI and ML courses covering algorithms, neural networks, and real-world applications.",
        tags: ["AI", "Machine Learning", "Deep Learning"]
    },
    {
        title: "Data Sciences and Visualization",
        icon: "fas fa-database",
        description: "Data science fundamentals, analytics, and visualization techniques for turning data into insights.",
        tags: ["Data Science", "Analytics", "Visualization"]
    },
    {
        title: "AutoCAD (Civil & Electrical)",
        icon: "fas fa-drafting-compass",
        description: "Professional AutoCAD training for civil and electrical engineering design and drafting.",
        tags: ["AutoCAD", "Civil", "Electrical", "Engineering"]
    },
    {
        title: "Matlab (Engineering & Simulation)",
        icon: "fas fa-calculator",
        description: "MATLAB programming for engineering simulations, data analysis, and mathematical modeling.",
        tags: ["MATLAB", "Simulation", "Engineering"]
    },
    {
        title: "Video Editing & Graphic Designing",
        icon: "fas fa-film",
        description: "Creative courses in video editing, graphic design, and multimedia production for digital media careers.",
        tags: ["Video Editing", "Graphic Design", "Multimedia"]
    }
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const coursesContainer = document.querySelector('.courses-container');
const infoRequestForm = document.getElementById('infoRequestForm');
const formMessage = document.getElementById('formMessage');

// Function to generate course cards
function generateCourseCards() {
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-icon">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-tags">
                    ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        coursesContainer.appendChild(courseCard);
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    
    // Change icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking outside
function closeMobileMenuOnClickOutside(event) {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        toggleMobileMenu();
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const courseInterest = document.getElementById('courseInterest').value;
    
    // Simple validation
    if (!name || !email || !courseInterest) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    console.log({
        name,
        email,
        phone,
        courseInterest
    });
    
    // Show success message
    showFormMessage(`Thank you ${name}! We have received your request for information about ${courseInterest}. We will contact you at ${email} shortly.`, 'success');
    
    // Reset form
    infoRequestForm.reset();
    
    // Scroll to form message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show form message
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Newsletter subscription handler
function setupNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, you would send this to a server
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

// Initialize the application
function initApp() {
    // Generate course cards
    generateCourseCards();
    
    // Setup mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', closeMobileMenuOnClickOutside);
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup form submission
    if (infoRequestForm) {
        infoRequestForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Setup newsletter subscription
    setupNewsletterSubscription();
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);