import './style.css';
import { initTheme } from './modules/theme.js';
import { convert } from './modules/converter.js';
import { initUI, setupFileHandlers } from './modules/ui.js';
import { initTutorial } from './modules/tutorial.js';
import { registerSW } from 'virtual:pwa-register';

// PWA Service Worker Registration
registerSW({
    onNeedRefresh() {
        if (confirm('새로운 버전이 사용 가능합니다. 업데이트하시겠습니까?')) {
            location.reload();
        }
    },
    onOfflineReady() {
        console.log('앱이 오프라인에서 사용할 준비가 되었습니다.');
    },
});

// DOM Elements
const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const baseWidthEl = document.getElementById('baseWidth');
const baseWidthMobileEl = document.getElementById('baseWidthMobile');
const precisionEl = document.getElementById('precision');
const precisionMobileEl = document.getElementById('precisionMobile');

// Initialize Modules
initTheme();
const { showToast } = initUI();

// Core Conversion Logic
function performConversion() {
    const precision = parseInt(precisionEl.value);
    outputEl.value = convert(inputEl.value, baseWidthEl.value, precision);
}

// Global Actions (Exposed to window for inline HTML onclick attributes)
window.resetAll = () => {
    if (confirm('초기화하시겠습니까?')) {
        inputEl.value = outputEl.value = "";
        showToast('초기화되었습니다');
    }
};

window.copyResult = () => {
    navigator.clipboard.writeText(outputEl.value).then(() => showToast('복사되었습니다!'));
};

window.downloadResult = () => {
    if (!outputEl.value) return;
    const blob = new Blob([outputEl.value], { type: 'text/css' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'converted.css';
    a.click();
};

// Event Listeners
inputEl?.addEventListener('input', performConversion);

// Sync Logic
const syncPrecision = (e) => {
    const val = e.target.value;
    precisionEl.value = val;
    precisionMobileEl.value = val;
    performConversion();
};

const syncBaseWidth = (e) => {
    const val = e.target.value;
    baseWidthEl.value = val;
    if (baseWidthMobileEl) baseWidthMobileEl.value = val;
    performConversion();
};

baseWidthEl?.addEventListener('input', syncBaseWidth);
baseWidthMobileEl?.addEventListener('input', syncBaseWidth);

precisionEl?.addEventListener('input', syncPrecision);
precisionMobileEl?.addEventListener('input', syncPrecision);

// File Upload Handler
setupFileHandlers((content) => {
    inputEl.value = content;
    performConversion();
    showToast('파일을 불러왔습니다');
});

// Initial Content
inputEl.value = ".hero { width: 1920px; padding: 40px; }";
performConversion();

// Start Tutorial
initTutorial();