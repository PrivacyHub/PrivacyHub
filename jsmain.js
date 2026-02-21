// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Blog category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.textContent.toLowerCase();

                blogCards.forEach(card => {
                    const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
                    
                    if (category === 'all posts' || cardCategory.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing! In a production environment, this would be securely stored.`);
                newsletterForm.reset();
            }
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.icon-card, .blog-card, .guide-card, .stat-item').forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Sticky navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Update copyright year
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }

    // Survey link tracking
    document.querySelectorAll('.survey-link').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Survey link clicked:', link.href);
            // You could add analytics tracking here
        });
    });

    // Read time calculator (for blog posts)
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const text = postContent.textContent;
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
        
        const readTimeElement = document.querySelector('.read-time');
        if (readTimeElement) {
            readTimeElement.textContent = `${readTime} min read`;
        }
    }
});

// Blog post navigation (previous/next)
function setupBlogNavigation() {
    const currentBlog = window.location.pathname.split('/').pop();
    const blogOrder = [
        'blog-smart-tv.html',
        'blog-smart-speaker.html',
        'blog-smart-watch.html',
        'blog-smart-thermostat.html',
        'blog-doorbell.html',
        'blog-security-camera.html',
        'blog-smart-plug.html',
        'blog-smart-lock.html',
        'blog-fitness-tracker.html',
        'blog-air-purifier.html',
        'blog-smart-oven.html'
    ];

    const currentIndex = blogOrder.indexOf(currentBlog);
    
    if (currentIndex !== -1) {
        const prevBlog = blogOrder[currentIndex - 1];
        const nextBlog = blogOrder[currentIndex + 1];
        
        const prevLink = document.querySelector('.prev-post');
        const nextLink = document.querySelector('.next-post');
        
        if (prevLink && prevBlog) {
            prevLink.href = prevBlog;
            prevLink.style.display = 'inline-block';
        }
        
        if (nextLink && nextBlog) {
            nextLink.href = nextBlog;
            nextLink.style.display = 'inline-block';
        }
    }
}

// Call this on blog post pages
if (document.querySelector('.post-navigation')) {
    setupBlogNavigation();
}

// Print functionality for blog posts
function printBlog() {
    window.print();
}

// Add print button to blog posts
const blogPost = document.querySelector('.blog-post');
if (blogPost) {
    const printButton = document.createElement('button');
    printButton.className = 'btn btn-outline';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Article';
    printButton.onclick = printBlog;
    printButton.style.marginTop = '2rem';
    blogPost.appendChild(printButton);
}

// Share functionality
function shareBlog(platform) {
    const url = window.location.href;
    const title = document.querySelector('.blog-post-header h1')?.textContent || 'SmartPrivacyHub Article';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add share buttons to blog posts
if (blogPost) {
    const shareDiv = document.createElement('div');
    shareDiv.className = 'share-buttons';
    shareDiv.style.marginTop = '2rem';
    shareDiv.style.paddingTop = '2rem';
    shareDiv.style.borderTop = '1px solid #ddd';
    
    shareDiv.innerHTML = `
        <h4>Share this article:</h4>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button onclick="shareBlog('twitter')" class="btn btn-outline" style="padding: 0.5rem 1rem;">
                <i class="fab fa-twitter"></i> Twitter
            </button>
            <button onclick="shareBlog('linkedin')" class="btn btn-outline" style="padding: 0.5rem 1rem;">
                <i class="fab fa-linkedin"></i> LinkedIn
            </button>
            <button onclick="shareBlog('facebook')" class="btn btn-outline" style="padding: 0.5rem 1rem;">
                <i class="fab fa-facebook"></i> Facebook
            </button>
        </div>
    `;
    
    blogPost.appendChild(shareDiv);
}