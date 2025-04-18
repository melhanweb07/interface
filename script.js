// Smooth scrolling for navigation links
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.content-1, .content-2, .content-3').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Add typing effect to welcome message
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Gallery functionality
class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [
            {
                url: 'img1.jpg',
                caption: 'State-of-the-art AI Laboratory'
            },
            {
                url: 'https://placehold.co/800x600/3498db/FFFFFF/png?text=Student+Projects',
                caption: 'Students Working on AI Projects'
            },
            {
                url: 'https://placehold.co/800x600/2980b9/FFFFFF/png?text=Workshop',
                caption: 'AI Workshop Session'
            },
            {
                url: 'https://placehold.co/800x600/34495e/FFFFFF/png?text=Research',
                caption: 'Research Presentation'
            },
            {
                url: 'https://placehold.co/800x600/16a085/FFFFFF/png?text=Seminar',
                caption: 'Department Seminar'
            }
        ];
        
        this.initializeGallery();
        this.setupEventListeners();
    }

    initializeGallery() {
        const slidesContainer = document.querySelector('.gallery-slides');
        const thumbnailsContainer = document.querySelector('.gallery-thumbnails');

        // Add slides
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${image.url}" alt="${image.caption}">`;
            slidesContainer.appendChild(slide);

            // Add thumbnails
            const thumbnail = document.createElement('img');
            thumbnail.src = image.url;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'gallery-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnailsContainer.appendChild(thumbnail);
        });

        this.updateCaption();
        this.updateSlidePosition();
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelector('.gallery-nav.prev').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.gallery-nav.next').addEventListener('click', () => this.navigate(1));

        // Thumbnail clicks
        document.querySelectorAll('.gallery-thumbnail').forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });

        // Touch events for swipe
        let touchStartX = 0;
        const galleryView = document.querySelector('.gallery-view');

        galleryView.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        galleryView.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) this.navigate(1); // Swipe left
                else this.navigate(-1); // Swipe right
            }
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.updateSlidePosition();
        this.updateThumbnails();
        this.updateCaption();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
        this.updateThumbnails();
        this.updateCaption();
    }

    updateSlidePosition() {
        const slidesContainer = document.querySelector('.gallery-slides');
        slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    updateThumbnails() {
        document.querySelectorAll('.gallery-thumbnail').forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateCaption() {
        const caption = document.querySelector('.gallery-caption');
        caption.textContent = this.images[this.currentIndex].caption;
    }
}

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', () => {
    // Add typing effect to welcome message
    const welcomeTitle = document.querySelector('.content-1 h2');
    typeWriter(welcomeTitle, 'Welcome to the Department of Artificial Intelligence and Data Science');

    // Initialize gallery
    new Gallery();
});

// Add mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    document.querySelector('.header').insertBefore(menuButton, nav);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        menuButton.innerHTML = nav.classList.contains('nav-open') ? '✕' : '☰';
    });
};

createMobileMenu(); 