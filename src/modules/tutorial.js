export function initTutorial() {
    const tutorialKey = 'hasVisited_v1'; // Change version if tutorial updates
    if (localStorage.getItem(tutorialKey)) return;

    const steps = [
        {
            element: '#baseWidth',
            title: '기준 너비 설정',
            desc: '디자인 시안의 전체 가로 폭(px)을 입력하세요. 이 값이 vw 계산의 기준이 됩니다. (예: 1920, 375)',
            position: 'bottom'
        },
        {
            element: '#dropZone',
            title: 'CSS 입력 및 파일 업로드',
            desc: '변환할 CSS 코드를 직접 붙여넣거나, .css 파일을 이 영역으로 드래그하여 업로드하세요.',
            position: 'right'
        },
        {
            element: '#resultZone',
            title: '실시간 변환 결과',
            desc: '입력 즉시 vw 단위로 변환된 코드가 나타납니다. 클릭하여 복사하거나 파일로 다운로드할 수 있습니다.',
            position: 'left'
        }
    ];

    let currentStep = 0;
    let tooltip;

    function createTutorialUI() {
        tooltip = document.createElement('div');
        tooltip.className = 'tutorial-tooltip';
        tooltip.innerHTML = `
            <div class="tutorial-content">
                <div class="tutorial-title"></div>
                <div class="tutorial-desc"></div>
            </div>
            <div class="tutorial-controls">
                <button class="tutorial-btn skip">건너뛰기</button>
                <button class="tutorial-btn next">다음</button>
            </div>
        `;
        document.body.appendChild(tooltip);

        tooltip.querySelector('.skip').addEventListener('click', endTutorial);
        tooltip.querySelector('.next').addEventListener('click', nextStep);
    }

    function showStep(index) {
        if (index >= steps.length) {
            endTutorial();
            return;
        }

        const step = steps[index];
        const el = document.querySelector(step.element);
        
        // Remove previous highlight
        document.querySelectorAll('.tutorial-highlight').forEach(e => {
            e.classList.remove('tutorial-highlight');
            // Restore original styles if needed
            if(e.style.pointerEvents === 'none') e.style.pointerEvents = '';
        });

        if (el) {
            // Add highlight
            // For inputs inside wrappers, highlight the wrapper if possible
            const target = el.closest('.input-wrapper') || el.closest('.setting-item') || el;
            target.classList.add('tutorial-highlight');
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Update Tooltip Content
            tooltip.querySelector('.tutorial-title').textContent = step.title;
            tooltip.querySelector('.tutorial-desc').textContent = step.desc;
            tooltip.querySelector('.next').textContent = index === steps.length - 1 ? '완료' : '다음';

            // Position Tooltip
            const rect = target.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Simple positioning logic (Desktop)
            if (window.innerWidth > 768) {
                let top = rect.bottom + 10;
                let left = rect.left;

                if (step.position === 'right') {
                    top = rect.top;
                    left = rect.right + 15;
                } else if (step.position === 'left') {
                    top = rect.top;
                    left = rect.left - tooltipRect.width - 15;
                }

                // Boundary checks
                if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 20;
                if (left < 0) left = 20;

                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;
            }

            tooltip.classList.add('active');
        }
    }

    function nextStep() {
        currentStep++;
        showStep(currentStep);
    }

    function endTutorial() {
        tooltip.classList.remove('active');
        document.querySelectorAll('.tutorial-highlight').forEach(e => e.classList.remove('tutorial-highlight'));
        
        setTimeout(() => {
            tooltip.remove();
        }, 300);

        localStorage.setItem(tutorialKey, 'true');
    }

    // Start
    if (confirm('처음 오셨군요! 간단한 사용법 가이드를 보시겠습니까?')) {
        createTutorialUI();
        showStep(0);
    } else {
        localStorage.setItem(tutorialKey, 'true');
    }
}
