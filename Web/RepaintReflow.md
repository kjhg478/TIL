## Reflow or Repaint

#### Reflow 발생

- 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(자신, 자식, 부모, 조상(결국 모든 노드))
  수치를 다시 계산하여, 렌더 트리를 재생성하는 과정이며 Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 Repaint라고 합니다.

#### Repaint 발생

- Reflow 발생 이유와 같이 스타일의 모든 변경이 레이아웃 수치에 영향을 받는것은 아닙니다.
- 즉, background-color, visibillty, outline 등의 스타일 변경 시에는 레이아웃 수치가 변경되지 않으므로 Reflow 과정이 생략된 Repaint 과정만 일어나게 됩니다.

#### Reflow 과정이 일어나는 상황

- 노드의 추가 또는 제거시
- 요소의 위치 변경 시
- 요소의 크기 변경 시 (margin, padding, border, width, height..등)
- 폰트 변경과 이미지 크기 변경 시
- 페이지 초기 렌더링 시 (최초 Layout 과정)
- 윈도우 리사이징 시

#### Reflow 최적화 방법

- 인라인 스타일을 최대한 배제
- 애니메이션이 들어간 노드는 가급적 position: fixed 또는 position: absolute로 지정하여 전체 노드에서 분리 시키도록 합니다.
- JS + CSS를 활용한 애니메이션 효ㅗ과는 해당 프레임에 따라 많은 Reflow 비용이 발생하게 됩니다.
  하지만 position fixed, absloute로 값을 주면 지정된 노드는 전체 노드에서 분리되기 때문에 전체 노드에 걸쳐 Reflow 비용이 들지 않으며, 해당 노드의 Repaint 비용만 들어가게 됩니다.

```Html

<script>

function animation() {
    document.getElementById('container_animation').style.left = '100px';
    document.getElementById('container_animation').style.top = '100px'; return false;
}
</script>

<div id="container_animation" style="background:blue;position:absolute;top:0px;left:0px;width:100px;height:100px;border:red 1px solid;"></div>

```

- 테이블 레이아웃을 피하자

  - 테이블로 구성된 페이지 레이아웃은 점진적 페이지 렌더링이 적용되지 않으며, 모두 로드되고 계산된 후에야 화면에 뿌려지게 됩니다.

- cssText 및 클래스를 활용해 최소화하자

  - DOM과 스타일 변경을 하나로 묶어 리플로우 수행을 최소화 한다.

  ```Javascript
  // 해당 노드의 style 객체를 여러번 호출
  function collect() {
      var elem = document.getElementById('container');

      elem.style.backgroundColor = 'red';
      elem.style.width = '200px';
      elem.style.height = '200px';
      return false;
  }

  // 스타일 객체 속성인 cssText를 통해 한번에 적용된 코드
  function collect() {
      var elem = document.getElementById('container');

      elem.style.cssText = 'background: red; width: 200px; height: 200px';

      return false;
  }

  // css에 정의된 class를 통해 한번에 적용된 코드
  function collect() {
      var elem = document.getElementById('container');

      elem.className = 'collect';

      return false;
  }



  ```

- 캐시를 활용한 Reflow 최소화
  - 브라우저는 레이아웃 변경을 큐에 저장했다가 한번에 실행하는 방법으로 Reflow 수를 줄입니다.
  - 하지만 offset, scrollTop, scrollLeft, 값과 같은 계산된 스타일 정보를 요청할 때마다 정확한 정보를 제공하기 위해 큐를 비우고 모든 변경을 다시 적용합니다.
  - 중복되는 수치에 대한 스타일 정보를 변수에 저장해 요청수를 줄임으로써 Reflow 비용을 최소화 시킵니다.

출처: https://webclub.tistory.com/346 [Web Club]
