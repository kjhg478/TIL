## Package Version Error 
-----------------------------------------
- package.json에 기입된 패키지 버전과 CRA의 같은 패키지 버전이 충돌할 때 발생하는 오류
- 해결방법
    - root(새파일)에 .env를 만들어 SKIP_PREFLIGHT_CHECK=true 를 추가하여 해결 가능 !
-----------------------------------------
- npm, yarn 설치 시, not fount:python2 오류 (윈도우 환경에서만 나타나는 듯 함)
- 해결방법
    - 윈도우용 빌드 툴을 설치하여 해결 (npm install --global --production windows-build-tools)
    - 이렇게 해서 해결이 안된다면 기존 파이썬 설치와 연관이 있어 해당 파이썬 버전을 설치하고 경로 설정을 해줘야 함 !