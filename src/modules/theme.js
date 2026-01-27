// Unsplash 3D Rendering & Abstract Images
const bgImages = [
    { id: 'clean', url: null, thumb: '', name: 'Clean' },
    { id: 'chrome-wave', url: 'https://images.unsplash.com/photo-1638361634616-10ae6b8d8af4?q=80&w=1172&auto=format&fit=crop', name: 'Chrome Wave' },
    { id: 'pure-glass', url: 'https://images.unsplash.com/photo-1743657166982-9e3ff272122b?q=80&w=1528&auto=format&fit=crop', name: 'Pure Glass' },
    { id: 'dreamy-flow', url: 'https://images.unsplash.com/photo-1653372512929-5ac36eb22a73?q=80&w=1074&auto=format&fit=crop', name: 'Dreamy Flow' },
    { id: 'pastel-mesh', url: 'https://images.unsplash.com/photo-1652953373910-4a166631a3a6?q=80&w=1074&auto=format&fit=crop', name: 'Pastel Mesh' },
    { id: 'dark-crystal', url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop', name: 'Dark Crystal' },
    { id: 'blue-round', url: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1932&auto=format&fit=crop', name: 'Blue Round' },
    { id: 'soft-mesh', url: 'https://images.unsplash.com/photo-1641322126277-b5e8a8a83557?q=80&w=764&auto=format&fit=crop', name: 'Soft Mesh' }
];

export function initTheme() {
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeTextMobile = document.getElementById('themeTextMobile');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            document.querySelectorAll('.sun').forEach(s => s.style.display = 'block');
            document.querySelectorAll('.moon').forEach(m => m.style.display = 'none');
            if(themeTextMobile) themeTextMobile.textContent = 'Light Mode';
        } else {
            document.querySelectorAll('.sun').forEach(s => s.style.display = 'none');
            document.querySelectorAll('.moon').forEach(m => m.style.display = 'block');
            if(themeTextMobile) themeTextMobile.textContent = 'Dark Mode';
        }
    }

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    [themeToggleDesktop, themeToggleMobile].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                setTheme(current === 'dark' ? 'light' : 'dark');
            });
        }
    });

    initBackgrounds();
}

function initBackgrounds() {
    // Check if background container exists, if not, create it
    let bgMenu = document.getElementById('bgMenu');
    const bgToggle = document.getElementById('bgToggle');
    
    if (!bgMenu || !bgToggle) {
        console.warn('Background menu or toggle button not found');
        return; 
    }

    const savedBgId = localStorage.getItem('bgId') || 'clean';
    setBackground(savedBgId);

    // Toggle Menu Visibility
    bgToggle.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        bgMenu.classList.toggle('hidden');
        console.log('BG Menu Toggled', bgMenu.classList.contains('hidden'));
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (bgMenu && !bgMenu.classList.contains('hidden') && !bgMenu.contains(e.target) && !bgToggle.contains(e.target)) {
            bgMenu.classList.add('hidden');
        }
    });

    // Populate Menu
    bgMenu.innerHTML = '';
    bgImages.forEach(bg => {
        const btn = document.createElement('div');
        btn.className = `bg-option ${bg.id === savedBgId ? 'active' : ''}`;
        btn.dataset.id = bg.id;
        btn.title = bg.name;
        
        if (bg.url) {
            // Optimize: Load small thumbnail for the menu (w=200) instead of full image
            const thumbUrl = bg.url.replace(/w=\d+/, 'w=200'); 
            btn.style.backgroundImage = `url(${thumbUrl})`;
        } else {
            btn.classList.add('clean-option'); // CSS for clean gradient preview
        }

        btn.addEventListener('click', () => {
            setBackground(bg.id);
            // UI Update
            document.querySelectorAll('.bg-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });

        bgMenu.appendChild(btn);
    });
}

function setBackground(id) {
    const bgData = bgImages.find(bg => bg.id === id) || bgImages[0];
    localStorage.setItem('bgId', id);

    if (bgData.url) {
        document.body.style.backgroundImage = `url('${bgData.url}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
        // Reset to CSS defined gradients
        document.body.style.backgroundImage = ''; 
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
    }
}
