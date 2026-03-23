# 30기 정숙 스타일 적합도 퀴즈

React + Vite로 만든 단일 페이지 웹앱입니다.

## 로컬 실행

```bash
npm.cmd install
npm.cmd run dev
```

## GitHub Pages 배포

이 프로젝트는 GitHub Pages용 GitHub Actions workflow가 이미 포함되어 있습니다.

필수 절차:

1. 이 폴더를 GitHub 저장소에 올립니다.
2. 기본 브랜치를 `main`으로 둡니다.
3. GitHub 저장소에서 `Settings -> Pages`로 이동합니다.
4. `Build and deployment`의 `Source`를 `GitHub Actions`로 설정합니다.
5. `main` 브랜치에 푸시하면 자동 배포됩니다.

배포 URL:

- 프로젝트 저장소: `https://<USERNAME>.github.io/<REPO>/`
- 사용자 저장소(`<USERNAME>.github.io`): `https://<USERNAME>.github.io/`

참고:

- `vite.config.js`는 GitHub Actions 환경에서 저장소 이름을 읽어 `base` 경로를 자동으로 맞춥니다.
- 커스텀 도메인을 쓰는 경우에는 `vite.config.js`의 `base`를 `'/'`로 고정하는 편이 더 단순합니다.
