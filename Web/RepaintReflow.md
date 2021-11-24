## Reflow or Repaint

### Reflow 발생

- 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(자신, 자식, 부모, 조상(결국 모든 노드))
  수치를 다시 계산하여, 렌더 트리를 재생성하는 과정이며 Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 Repaint라고 합니다.

### Repaint 발생

- Reflow 발생 이유와 같이 스타일의 모든 변경이 레이아웃 수치에 영향을 받는것은 아닙니다.
- 즉, background-color, visibillty, outline 등의 스타일 변경 시에는 레이아웃 수치가 변경되지 않으므로 Reflow 과정이 생략된 Repaint 과정만 일어나게 됩니다.
- Reflow만 수행되면 실제 화면에 반영되지 않습니다. 위에서 언급된 렌더링 과정과 같이 RenderTree를 다시 화면에 그려주는 과정이 필요한데, 이를 Repaint라고 합니다.
- 무조건 Reflow가 일어나야 Repaint가 일어나는 것은 아니고, 레이아웃에는 영향을 주지 않는 스타일 속성이 변경되었을 때 Reflow를 수행할 필요가 없기 때문에 Repaint만 수행하게 됩니다.

### Reflow 과정이 일어나는 상황

- 노드의 추가 또는 제거시
- 요소의 위치 변경 시
- 요소의 크기 변경 시 (margin, padding, border, width, height..등)
- 폰트 변경과 이미지 크기 변경 시
- 페이지 초기 렌더링 시 (최초 Layout 과정)
- 윈도우 리사이징 시 (Viewport 크기 변경 시)

### Reflow 최적화 방법

- 인라인 스타일을 최대한 배제
- 애니메이션이 들어간 노드는 가급적 position: fixed 또는 position: absolute로 지정하여 전체 노드에서 분리 시키도록 합니다.
- 사용하지 않는 노드에는 visibility: invisible 보다는 display: none을 사용하기
  - visibility는 레이아웃 공간을 차지하기 때문에 reflow의 대상이 되지만, display: none은 레이아웃 공간을 차지하지 않음
- JS + CSS를 활용한 애니메이션 효ㅗ과는 해당 프레임에 따라 많은 Reflow 비용이 발생하게 됩니다.
  하지만 position fixed, absloute로 값을 주면 지정된 노드는 전체 노드에서 분리되기 때문에 전체 노드에 걸쳐 Reflow 비용이 들지 않으며, 해당 노드의 Repaint 비용만 들어가게 됩니다.

- Reflow가 일어나는 대표적인 속성

  - position, width, height, left, top
  - right, bottom, margin, padding, border
  - border-width, clear, display, float, font-family
  - font-size, font-weight, line-height, min-height, overflow
  - text-align, vertical-align, white-space

- Repaint가 일어나는 대표적인 속성

  - background, background-image, background-position, background-repeat, background-size
  - border-radius, border-style, box-shadow, color, line-style
  - outline, outline-color, outline-width, text-decoration, visibility

- Reflow, Repaint가 일어나지 않는 transform, opacity와 같은 속성도 있습니다.
  left, right, width, height보다 transform을, visibility, display보다 opacity를 사용하는 것이 성능 개선에 도움이 됨

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

### React Virtual DOM ?

- 일반적으로 DOM에 접근하여 여러번의 속성 변화, 여러번의 스타일 변화를 수행하면 그에 따라 여러번의 Reflow, Repaint가 발생하게 됩니다.
  하지만 Virtual DOM은 이렇게 변화가 일어나 Reflow, Repaint가 필요한 것들을 한번에 묶어서 DOM에 전달하게 됩니다.
  따라서 처리되는 Reflow, Repaint의 규모가 커질 수는 있지만 한번만 연산을 수행하기 떄문에 연산이 반복적으로 일어나는 부분이 줄어들어 성능이 개선됩니다.

- 프레임워크나 라이브러리 없이 순수 JS로도 구현이 가능하지만 실제로 구현하기에는 어렵기 때문에 React, Angular가 인기를 얻게 됐습니다.

출처: https://webclub.tistory.com/346 [Web Club]
출처: https://velopert.com/3236
