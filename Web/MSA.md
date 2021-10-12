## MicroServicesArchitectures (MSA)

#### MSA VS Monolithic?

- MSA : 서비스를 쪼개는 아키텍쳐
  - MSA는 A, B, C 서비스 중 A가 죽어도 B, C 서비스는 정상 이용이 가능하다.
  - 관심사 분리 가능 (레이어 분리)
  - 서비스가 각각 움직이기 때문에 서비스 전체의 영향을 주지 않음
  - 조직 구조의 대한 이점도 갖을 수 있음 (팀 분리하여 효율적 업무 가능)
- Monolithic
  - Monolithic은 A, B, C 서비스 중 A가 죽으면 모든 서비스가 같이 죽음

#### MFA (Micro FrontEnd Architectures)

- MSA가 나오는 만큼 프론트엔드도 각각의 서비스가 나와야 함
- Iframes?
  - 프레임이라고 하는 이러한 HTML 태그 장치를 사용하면 2개 이상의 웹사이트를 동일한 페이지에 동시에 표시가 가능
- 우리나라의 대표적인 Iframes을 이용한 MFA 사례 (네이버 지도)
  - 좌측에 플레이스서비스
  - 우측에 지도서비스

#### BFF (Backend For Frontend)

[BFF관련](https://metleeha.tistory.com/category/Tech%20Note/Web)

출처: https://metleeha.tistory.com/
