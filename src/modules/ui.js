export function initUI() {
    const toastEl = document.getElementById('toast');
    const headerEl = document.getElementById('mainHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    let toastTimeout;
    function showToast(msg) {
        if (!toastEl) return;
        
        clearTimeout(toastTimeout);
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2000);
    }

    if (mobileMenuBtn && headerEl) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            headerEl.classList.toggle('expanded');
        });

        document.addEventListener('click', (e) => {
            if (headerEl.classList.contains('expanded') && !headerEl.contains(e.target)) {
                headerEl.classList.remove('expanded');
            }
        });

        headerEl.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    return { showToast };
}

export function setupFileHandlers(onFileRead) {
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => onFileRead(event.target.result);
                reader.readAsText(file);
            }
        });
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        ['dragleave', 'dragend'].forEach(type => {
            dropZone.addEventListener(type, () => dropZone.classList.remove('drag-over'));
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith('.css')) {
                const reader = new FileReader();
                reader.onload = (event) => onFileRead(event.target.result);
                reader.readAsText(file);
            }
        });
    }
}
