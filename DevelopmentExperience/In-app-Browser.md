## In-app(인앱) 환경 고려하기

---

### 인앱에서 외부 브라우저 띄우기

- 서비스 이벤트 홍보를 위해서 인스타나 페이스북에서 링크를 달아놓고, 그 링크를 타고 들어가 SNS 회원가입을 진행
- 앱내에서 진행되는 인앱브라우저이기 때문에 새 창 띄우기가 안됨 기본적으로 인앱에서는 팝업지원이 되지 않는다.  
  (인앱이 지원해주는 경우도 있음 - 카카오 인앱에서 카카오 로그인)  
   인앱에서 진행되는 앱같은경우에 인앱 브라우저 환경을 고려하지 않는 프로세스기 때문에 SNS 회원가입이 되지 않는다.
- 근본적인 원인해결은 아니지만 일단 급한불을 끄기 위해서 인앱에서 외부 브라우저를 띄우는 방향으로 설정

```Js

  window.onload = function() {
    if (
      navigator.userAgent.match(
        /inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i,
      )
    ) {
      document.body.innerHTML = "";
      if (navigator.userAgent.match(/iPhone|iPad/i)) {
        // IOS
        location.href = "ftp://도메인/bridge.html?_targeturl=" + location.href;
        /*
        FTP - File Transfer Protocol (서버와 클라이언트 사이의 파일 전송을 하기 위한 프로토콜)
        ios에서는 FTP 프로토콜을 호출하여 자동으로 사파리가 열리게 되는 현상 (익명이 접근 가능해야 함)
        FTP 프로토콜을 웹에서 실행함으로써 ios 운영체제에서 강제로 사파리를 실행시키게 되며,
        사파리가 FTP 내 html을 읽어서 강제로 페이지를 이동시킴
        */
      } else {
        // 안드로이드
        location.href = "intent://" + location.href.replace(/https?:\/\//i, "") + "#Intent;scheme=https;package=com.android.chrome;end";
        /*
          페이지를 강제 이동시켜서 크롬으로 URL을 열 수 있게 가능
          안드로이드의 intent 속성
          안드로이드폰에 크롬이 이미 내장되어 있어 브라우저를 크롬 패키지로 설정
        */
      }
    }
  };

```

- [참조 블로그](https://www.burndogfather.com/201)
- 아이폰 15버전 이후로 업데이트 하는 경우는 보안패치로 인해서 막힘 (꼼수를 부리지 말자 언젠가 막힌다.)
- In-app 브라우저 환경을 고려해서 프로세스를 변경하는 것이 근본적인 해결책
  - 기존 팝업으로 열던 것을 가이드 문서를 확인해보니 팝업이 아니라 페이지를 이동해서 Redirect로 처리를 해야한다.
  - SNS 로그인을 했을 때 서버에 code로 전달을 하고, 서버에서는 code로 토큰을 발급받은 후 그 토큰으로 사용자 정보를 조회해서 클라이언트에 넘겨주는 방식

---

### 임시페이지 작업 완료

<p align="center">
  <img src="https://user-images.githubusercontent.com/31474272/148851495-1a8a03d4-2b25-43b9-b868-3ba66a1be606.png">
</p>

- In-app 브라우저 환경에서 ios 기기일 때 띄어주는 임시페이지
- innerHtml에서 onclick이 먹지 않아 createElement로 button을 만들어서 작업을 해줌
- execCommand메서드가 웹 표준이 아니여서 권장하지 않는다는 mdn페이지를 보고 navigator.clipboard API로 해결
- innerHTML로서 innerText와 HTML tag들과의 차이
- CustomHook으로 빼서 처리

```Js

const useOnLoad = () => {
  // useEffect
  useEffect(() => {
    window.onload = function() {
      if (
        navigator.userAgent.match(
          /inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i,
        )
      ) {
        if (navigator.userAgent.match(/iPhone|iPad/i)) {
          document.body.setAttribute("style", "overflow-y: hidden");
          const btn = document.createElement("button");

          btn.innerHTML = "홈페이지 주소 복사하기";
          btn.setAttribute("class", "copy_btn");

          btn.onclick = () => {
            var dummy = document.createElement("input");
            var url = window.location.href;
            if (!navigator.clipboard) {
              // use old commandExec() way
              document.body.appendChild(dummy);
              dummy.value = url;
              dummy.select();
              document.execCommand("copy");
              document.body.removeChild(dummy);
              btn.removeAttribute(null);
              alert("URL이 복사되었습니다.");
            } else {
              navigator.clipboard
                .writeText(url)
                .then(function() {
                  alert("URL이 복사되었습니다."); // success
                })
                .catch(function() {
                  alert("Error"); // error
                });
            }
          };
          document.body.innerHTML = `
            <div style="margin:20px;">
              <img src="/images/xquare_small_logo.png" width="101px" height="27px">
              <br />  <br />  <h2 style="font-size:20px;">이용안내 <br /></h2>
              <p style="color:#535352; margin-top: 10px;">ios(아이폰, 아이패드 등) 기기에서는 다음과 같이 접속해주세요. <br /> </p>
              <p style="font-weight: 700; margin-top: 10px;">아래의 버튼을 눌러 클립보드에 주소를 복사 후 <br /> 브라우저(Safari, Chrome 등)에서 주소를 붙여넣고 접속해주세요. <br /></p>
              <p style="font-weight: 700; margin-top: 10px;">불편을 드려 죄송합니다.</p>
            </div>
            <div style="margin-left: 20px; text-align:left; position: absolute; left: 0px; bottom: 0px; width: 100%"><img src="/images/xquare_box.png" width="343px" height="190px"></div>
            `;
          document.body.appendChild(btn);
          return;
        } else {
          location.href = "intent://" + location.href.replace(/https?:\/\//i, "") + "#Intent;scheme=https;package=com.android.chrome;end";
        }
      }
    };
  }, []);
  return <></>;
};

```

- API 관련 문제
- csrf, sso, social 로그인은 보안이 되게 중요함

  - 소셜 보안은 state라는 개인키값이 그대로 넘어옴 (인식키)
  - 원래 이러한 state 개인키값은 csrf 변조를 막기 위해서 사용하는데 redirect 용도로만 버퍼성으로 사용하는것은 원론적으로 용도에 맞지 않다. 그래서 클라이언트에서 처리를 하려고 했으나, 클라이언트에서 처리를 하려고 하니 처리 방식이 너무 복잡했음
  - 타사사례를 참고하니 버퍼성으로 사용하여 서버에서 던져주는 url로 처리를 많이 하기 때문에 클라이언트에서 처리하는 이 방식은 너무 복잡하다.
  - 실제 임시로 빠르게 처리하기 위해서 클라이언트에서 state값을 유니크아이도로 랜덤한 값을 보내는데, 클라이언트에서 보내는 값은 변조가 될 수 있다.

- 소셜 로그인 (OAuth 2.0)
  - 권한부여 토큰은 AccessToken, RefreshToken 발급 전에 권한부여 토큰을 먼저 수행
  - auth 창 (로그인 창, redirect uri를 가지고 있는 url)에서 로그인을 클릭
  - 클라이언트에서 redirect uri로 이동하면서 권한부여 토큰(code값, auth창에 있는 값 쿼리스트링으로 저희가 빼서 요청)으로 저희서버에 요청
  - 그럼 서버에서는 그 토큰으로 SNS 서버에 요청하여 정보를 받아 클라이언트에 전달해줌
  - 여기서 문제는 클라인트에선 Authorize를 수행하고 서버에서는 토큰으로 정보를 받아 전달해주는 작업을 나눠서 비효율적으로 작업하고 있음
    - 이렇게 되면 문제는 auth창에서 redirect uri를 위한 path값이 sns 개수만큼 많아질 수 밖에 없음
    - state값을 클라이언트에서 만드는 문제 (클라이언트는 변조가 가능하기 때문)
  - 차라리 프론트에서는 로그인창에서 로그인 클릭했을 때 서버에서 작업을 다 처리후 state(최종적으로 도달해야하는 주소에 access_token)값을 전달받아 이동만 처리해주는 방식으로 했으면 조금 더 깔끔했을 것 같다.
