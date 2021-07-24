## Linux 리눅스

- 리눅스 운영체제 (리눅스 커널에 기반을 둔 오픈소스 유닉스 계열 운영 체제 계열)

  - Shell Scripts는 리눅스 운영체제를 조작하기 위한 언어
  - 서버의 명령어 (컴퓨터 자체를 조작한다)
  - 서버에서 많이 씀 Why : 100퍼센트의 권한을 다 준다.
    ex) 서버 컴퓨터용으로 샀는데 권한이 다 없으면 제대로 활용하지 못함
  - 리눅스 운영체제 반대가 윈도우 (윈도우는 사용자에게 권한을 다 주지 않음)

- Shell Script 명령어
  - cmd -option pipeline : 기본적인 명령 옵션
  - whoami : 내가 누구
  - pwd
  - clear : 터미널 초기화
  - ls : 리스트
  - ls -a (.으로 시작하는건 숨긴파일) : 숨긴파일까지 전체 리스트를 다 보여줌
  - ls -la (세부사항 표시)
  - man ls (ls 헬프) man은 리눅스에서 백과사전 (커맨드에 적용되는) : man은 백과사전 역할
  - ps -efc : ps는 process kill은 종료시키는 옵션
  - ps -efc | grep a : gref은 a의 해당하는 애들이 누군지 다 보여줌, -efc옵션은 상세정보까지 보여줌
  - which python (설치 경로를 알고싶을 때)
  - touch : 파일을 만드는 것
  - vi 편집툴
  - find .
  - find downloads/. -name "test.js" or "test\*"
  - find downloads/. -name "test\*"
  - cat Dowonloads/test.js | grep asd
  - echo "123" > test2.js : >는 touch 기능을 빠르게 수행 >>는 중복된 파일이면 덮어쓰지 않게 해줌 추가로 더 써짐
  - cat test2.js
  - cat test3.js | grep asdfasdads :
  - cat test3.js ; grep asdasdads : ;명령어는 앞에 있는게 실행되고 성공하면 실행
  - bashrc : 쉘스크립트는 bash 언어, 터미널 콘솔창이 실행되기전에 실행된다.
    bashrc에 무언가 적어두면 이미 실행된 상태에서 terminal이 열림, 리눅스에 있는 프로그램
  - zshrc : zsh를 깔아서 생김 이 녀석이 bash (맥에서만)
  - .bash_aliases : 내가 만든 파일안에 편하게 할 명령어를 단축으로 만듦, source .bash_aliases 내가 쓴 녀석들은 그냥 텍스트 파일인데 source .bash_aliases를 통해 source로 읽히게 만들게 함
  - /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" : brew 설치
  - brew install git bash-clmpletion
  - export BASH_COMPLETION_COMPAT_DIR="/usr/local/etc/bash_completion.d"[[-r "/usr/local/etc/profile.d/bash_completion.sh"]] && . "/usr/local/etc/profile.d/bash_completion.sh"
