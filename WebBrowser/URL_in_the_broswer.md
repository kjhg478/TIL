# What happens when you type an URL in the Browser and press enter?

## 1. www.google.com을 브라우저 주소창에 친다.

## 2. Browser는 캐싱된 DNS 기록들을 통해 www.google.com에 대응되는 IP 주소가 있는지 확인한다.

- DNS는 URL들의 이름과 IP 주소를 저장하고 있는 데이터베이스다. \\ 띄어쓰기
  인터넷에 있는 모든 URL들에는 고유의 IP 주소가 지정되어 있다. 이 IP 주소를 통해서 해당 웹사이트를 호스팅하고 있는 서버 컴퓨터에 접근할 수 있다. \\
  예를 들어, www.google.com의 IP 주소를 알아보기 위해서는 **nslookup www.google.com**을 터미널에 작성하면 해당 사이트의 IP 주소를 알려준다. \\
  구글을 사용하는 사용자가 매우 많기 때문에 구글의 서버 IP 주소는 여러개가 있고, nslookup으로는 그 중 내가 접근이 가능한 IP 주소를 보여준다. \\
  이처럼 DNS는 전화번호부와 비슷한 역할을 한다. 웹사이트의 이름들과 웹사이트를 접근하기 위해 필요한 IP 주소를 저장하고 있다.

- DNS의 가장 큰 목적은 사람들에게 편리함을 주기 위해서이다. 숫자로 된 IP 주소를 작성해도 원하는 웹사이트에 접속할 수 있지만 \\
  매번 랜덤해보이는 숫자들을 검색하는 것은 매우 복잡한 일이다. 사람은 네이버, 다음, 구글처럼 이름을 외우는 것에 더 친숙하기 때문이다. \\
  DNS는 이처럼 사람들이 웹사이트 주소에 쉽게 접속할 수 있게 매핑을 해주는 역할을 한다.

- 웹사이트 이름을 브라우저에 검색하면 브라우저는 DNS 기록을 4가지의 캐시에서 확인을 한다.
  1.  가장 먼저 브라우저 캐시를 확인한다. 브라우저는 일정기간 동안(유저가 이전의 설정한) DNS 기록들을 저장하고 있다. DNS query가 이 곳에서 가장 먼저 실행이 된다.
  2.  그 다음 브라우저는 OS 캐시를 확인한다. 브라우저 캐시에 웹사이트 이름의 IP 주소가 발견되지 않았다면 \\
      브라우저는 systemCall을 통해서 OS가 저장하고 있는 DNS 기록들의 캐시에 접근한다.
  3.  그 다음 router 캐시를 확인한다. 컴퓨터에 DNS 기록을 찾지 못하면 브라우저는 DNS 기록을 캐싱하고 있는 router와 통신을 해서 찾으려고 한다.
  4.  그래도 못 찾는다면 마지막으로, ISP 캐시를 확인한다. ISP는 DNS 서버를 구축하고 있고 브라우저가 마지막으로 DNS 기록이 있기를 바라며 접근하게 된다.

#### 캐시는 네트워크 트래픽을 조절하고 데이터 전송 시간을 줄이기 위해 매우 중요하다.

## 3. 요청한 URL이 캐시에 없으면, ISP의 DNS 서버가 www.google.com을 호스팅하고 있는 서버의 IP 주소를 찾기 위해 DNS query를 날린다.

- www.google.com에 접속하고 싶으면 IP 주소를 반드시 알아야 한다. \\
  DNS query의 목적은 여러 다른 DNS 서버들을 검색해서 해당 사이트의 IP 주소를 찾는 것이다. \\
  이러한 검색을 **recursive search**라고 부른다. \\
  IP 주소를 찾을 때 까지 DNS 서버에서 다른 DNS 서버를 오가면서 반복적으로 검색하던지 못 찾아서 에러가 발생할 때까지 검색을 진행한다. \\

- 이 상황에서 ISP의 DNS 서버를 DNS recursor라고 부르고 인터넷을 통해 다른 DNS 서버들에게 물어 도메인 이름의 올바른 IP 주소를 찾는데 책임을 갖고 있다. \\
  다른 DNS 서버들은 name server라고 불린다. 이들은 웹사이트 도메인 이름의 구조에 기반해서 검색을 하기 때문이다. \\
  도메인 이름 구조에 기반해서 검색한다고 하면 이해하기 어려워 보이지만 원리는 매우 간단한다. 도메인 이름들의 구조를 보자.

  ![image](https://user-images.githubusercontent.com/31474272/133935238-b3cdbc31-09e6-4392-bf8b-b7fe7933f515.png)

- 우리가 마주하는 웹사이트 URL들은 third-level domain, second-level domain, top-level domain을 가지고 있다. \\
  각 레벨별로 자신들만의 name 서버가 있고 여기서 DNS look up 프로세스 중에 쿼리가 진행된다. \\

  1.  www.google.com에 대해서, 처음에 DNS recursor가 root name server에 연락을 한다.
  2.  root name 서버는 .com 도메인 name server로 리다이렉트 한다.
  3.  .com name server는 google.com name server로 리다이렉트 한다.
  4.  google.com name server는 DNS 기록에서 www.google.com에 매칭되는 IP 주소를 찾고 DNS recursor로 보내게 된다.

- 위의 모든 요청들은 작은 데이터 패킷들을 통해서 보내진다. \\
  패킷 안에는 보내는 요청의 내용과 DNS recursor의 IP 주소가 포함되어 있다. \\
  이 패킷들은 DNS 기록을 가진 DNS 서버에 도달할 때까지 클라이언트와 서버를 여러번 오간다. 만약 패킷이 도중에 loss되면 request fail error가 발생하게 된다.₩

## 4. Browser가 서버와 TCP connection을 한다.

- 브라우저가 올바른 IP 주소를 받게 되면 서버와 connection을 빌드하게 된다. \\
  브라우저는 인터넷 프로토콜을 사용해서 서버와 연결이 된다. 인터넷 프로토콜의 종류는 여러가지가 있지만, 웹 사이트의 HTTP 요청의 경우에는 일반적으로 TCP를 사용한다. \\
  (TCP(Transmission Control Protocol) - 인터넷상에서 데이터를 메세지의 형태로 보내기 위해 IP와 함께 사용하는 프로토콜) \\

- 클라이언트와 서버간 데이터 패킷들이 오가려면 TCP connection이 되어야 한다. **TCP/IP three-way handshake**라는 프로세스를 통해 클라이언트와 서버간 커넥션이 이뤄짐 \\
  단어 그대로 클라이언트와 서버가 SYN과 ACK메세지들을 가지고 3번의 프로세스를 거친 후에 연결이 된다. \\

  1.  클라이언트 머신이 SYN 패킷을 서버에 보내고 connection을 열어달라고 물어본다.
  2.  서버가 새로운 connection을 시작할 수 있는 포트가 있다면 SYN/ACK 패킷으로 대답을 한다.
  3.  클라이언트는 SYN/ACK 패킷을 서버로부터 받으면 서버에게 ACK 패킷을 보낸다.
      (SYN: sunchronize sequence numbers - TCP연결을 시작하며 회선을 개설하는 용도)
      (ACK: acknowledgment - 확인 Acknowledgement number 값이 설정되어 유효하다는 것 전송을 제대로 받았다는 증거)

  이 과정이 끝나면 TCP connection이 완성되는 것.

## 5. 브라우저가 웹 서버에 HTTP 요청을 한다.

    - TCP로 연결이 되었다면, 데이터를 전송하면 된다.

    - 클라이언트의 브라우저는 GET 요청을 통해 서버에게 www.google.com 웹페이지를 요구한다.   \\
      요청을 할 때 비밀 자료들을 포함하던지, form을 제출하는 상황에서는 POST 요청을 사용할수도 있다.   \\
        1. browser identification
        2. 받아들일 요청의 종류
        3. 추가적인 요청을 위해 TCP connection의 유지를 요청하는 connection 헤더
        4. 브라우저에서 얻은 쿠키 정보 등

## 6. 서버가 요청을 처리하고 response를 생성한다.

    - 서버는 웹서버를 가지고 있다. 이들은 브라우저로부터 요청을 받고 request handler한테 요청을 전달해서 요청을 읽고 response를 생성하게 된다.   \\
      Request handler란 ASP.NET, PHP, Ruby 등으로 작성된 프로그램을 의미한다.   \\
      이 request handler는 요청과 요청의 헤더, 쿠키를 읽어서 요청이 무엇인지 파악하고 필요하다면 서버에 정보를 업데이트 한다.   \\
      그 다음에 response를 특정한 포맷으로(JSON, XML, HTML) 작성한다.

## 7. 서버가 HTTP response를 보낸다.

    - 서버의 response에는 요청한 웹페이지, status code, compression type(Content-Encoding)   \\
      어떻게 인코딩 되어 있는지, 어떻게 페이지를 캐싱할지, 설정할 쿠키가 있다면 쿠키, 개인정보 등이 포함된다.

## 8. Broswer가 HTML content를 보여준다.

    - 브라우저는 HTML content를 단계적으로 보여준다.   \\
      처음에는 HTML의 스켈레톤(기본 틀이라고 보면 될 듯하다.)을 렌더링한다.   \\
      그 다음에는 HTML 태그들을 체크하고 나서 추가적으로 필요한 웹 페이지들의 요소들을(이미지, css, js) GET으로 요청한다.   \\
      이 정적인 파일들은 브라우저에 의해 캐싱이 되서 나중에 해당 페이지를 방문할 때 다시 서버로부터 불러와지지 않도록 한다.   \\
      그 다음에는 비로소 www.google.com의 모습이 보이게 된다.

    - www.google.com을 검색하고 웹 페이지가 뜰 때까지 엄청나게 많은 일들이 일어나지만 이 모든 일들이 1초도 되지 않아서 완료가 된다.

#### 정리하기

    1. www.google.com을 브라우저 주소창에 친다.
    2. Browser는 캐싱된 DNS 기록들을 통해 www.google.com에 대응되는 IP 주소가 있는지 확인한다.
    3. 요청한 URL이 캐시에 없으면, ISP의 DNS 서버가 www.google.com을 호스팅하고 있는 서버의 IP 주소를 찾기 위해 DNS query를 날린다.
        (ISP(Internet Service Provider) - 인터넷 접속 서비스를 제공하는 업체)
    4. Browser가 서버와 TCP connection을 한다.
    5. 브라우저가 웹 서버에 HTTP 요청을 한다.
    6. 서버가 요청을 처리하고 response를 생성한다.
    7. 서버가 HTTP response를 보낸다.
    8. Broswer가 HTML content를 보여준다.
