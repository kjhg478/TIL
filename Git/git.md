## Git 명령어

> Git 협업전략
>   > - upstream : main repository, 원격 repository
>   > - origin : 내 계정으로 작업할 repository, fork repository
>   > - 작업 완료 후, 커밋할 때 커밋이 2개 이상이면 rebase작업 해줘야 함
>   > - 작업을 할 땐, 새로운 브런치를 따고 커밋, 병합까지 완료 후, 삭제하는 것을 반복 작업
>   > - 항상 커밋 전에 새로운 브런치를 만들어서 커밋을 해야한다.
-----------------------------------------------------------
> Git 명령어 (직접 써본 것)
>   > - git clone 깃랩주소 
>   > - git remote -v : 
>   > - git remote remove origin : 리모트 제거
>   > - git remote add upstream 깃 클론 주소 : upstream remote 추가
>   > - git pull upstream 풀 받을 브런치명 : pull 받은 후, 작업
>   > - git pull origin 브런치명
>   > - git branch -a 
>   > - git branch
>   > - git status
>   > - git rebase -i @~2 : 저 숫자는 커밋 갯수
>   > - git log
>   > - git checkout -b 새로운 브런치명 : 브런치 만들고 이동 
>   > - git checkout -b <브랜치 이름> upstream/dev
>   > - git push --set -upstream origin : origin으로 바로 push를 하면 안된다.
>   > - git config --list
>   > - git config --global user.email "내 이메일 주소"


