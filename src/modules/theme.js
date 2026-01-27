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
}
