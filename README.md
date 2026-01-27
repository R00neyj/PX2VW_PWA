# PX2VW Converter (PWA)

**PX2VW Converter**는 CSS 코드 내의 `px` 단위를 `vw` 단위로 손쉽게 변환해 주는 프로그레시브 웹 앱(PWA)입니다. 반응형 웹 개발 시, 디자인 시안의 고정된 픽셀 값을 뷰포트 기반의 상대 단위로 빠르게 계산하고 변환할 수 있습니다.

**로컬 터미널환경에서 실행하는 JS파일은 [해당 레포지터리](https://github.com/R00neyj/vw_convertor)에 있습니다.**

![Project Status](https://img.shields.io/badge/Status-Active-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ 주요 기능

- **실시간 변환**: CSS 코드를 입력하는 즉시 설정된 기준 너비(Base Width)에 맞춰 변환됩니다.
- **PWA 지원**: 앱으로 설치하여 오프라인에서도 사용 가능하며, 네이티브 앱과 같은 사용자 경험을 제공합니다.
- **유연한 설정**:
  - **Base Width**: 디자인 기준 해상도 너비 설정 (기본값: 1920px)
  - **소수점 정밀도**: 변환된 vw 값의 소수점 자릿수 조절 가능 (0~10자리)
- **파일 처리**:
  - CSS 파일 드래그 & 드롭 지원
  - 변환 결과 파일 다운로드 (`converted.css`)
- **편의 기능**:
  - 다크 모드/라이트 모드 자동 감지 및 전환
  - 원클릭 결과 복사
  - 모바일 친화적인 UI

## 🚀 사용 방법

1. **Base Width 설정**: 디자인 시안의 기준 가로 너비(예: 1920, 1440, 375 등)를 입력합니다.
2. **코드 입력**: 왼쪽(또는 상단) 입력창에 변환할 CSS 코드를 붙여넣거나 직접 입력합니다. `.css` 파일을 드래그하여 업로드할 수도 있습니다.
3. **결과 확인**: 오른쪽(또는 하단)에서 변환된 코드를 실시간으로 확인합니다.
4. **내보내기**: 결과를 클립보드에 복사하거나 파일로 다운로드하여 사용합니다.

## 🛠 기술 스택

- **Core**: Vanilla JavaScript (ES Modules)
- **Bundler**: [Vite](https://vitejs.dev/)
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Service Worker, Offline Support)
- **Styling**: CSS Variables, Responsive Design

## 📦 설치 및 실행 (개발자용)

프로젝트를 로컬에서 실행하려면 Node.js가 필요합니다.

```bash
# 저장소 복제
git clone https://github.com/사용자명/PX2VW_PWA.git

# 디렉토리 이동
cd PX2VW_PWA

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
