function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// System theme detection and theme management
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('darkmode-desktop').src = "./assets/sun.png";
        document.getElementById('darkmode-mobile').src = "./assets/sun.png";
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('darkmode-desktop').src = "./assets/moon.png";
        document.getElementById('darkmode-mobile').src = "./assets/moon.png";
    }
    // Save theme preference
    localStorage.setItem('theme', theme);
}

// Initialize theme
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no saved preference, use system theme
        setTheme(detectSystemTheme());
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if there's no saved preference
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Update toggle function
function toggleDarkMode() {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme);

// Add click event listeners to both icons
document.getElementById("darkmode-desktop").addEventListener("click", toggleDarkMode);
document.getElementById("darkmode-mobile").addEventListener("click", toggleDarkMode);

window.addEventListener("beforeunload", function () {
    localStorage.setItem("scrollPosition", window.scrollY);
});

window.addEventListener("load", function () {
    if (localStorage.getItem("scrollPosition") !== null) {
        window.scrollTo(0, localStorage.getItem("scrollPosition"));
    }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section detection
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add this CSS for active link styling
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .nav-links a.active {
        color: #666;
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        width: 70%;
        height: 2px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: var(--secondary-color);
    }
`;
document.head.appendChild(styleSheet);


