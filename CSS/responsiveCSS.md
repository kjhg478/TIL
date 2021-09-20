# CSS Units (responsive)

- size를 결정하는 Unit

  - 절대적인 값과 상대적인 값

    1. Absolute
       - px
         - px (모니터 위에서 화면에 나타낼 수 있는 가장 작은 단위)
         - container 사이즈가 변경되어도 컨텐츠가 고정되어 있음
    2. Relative

       - em, rem, vw, vh, %
         1. em == 16px(표준)
            - 타이포그래피에서 현재 지정된 font-size를 나타내는 단위
            - 같은 font-size일지라도 font-family에 따라서 text size가 달라질 수 있는데, em은 영향을 받지 않음
            - em은 부모의 font-size에 상대적으로 계산되어 진다.
         2. rem (root)
            - root에 지정된 font-size에 따라서 크기가 결정됨
            - root 요소 (16px(표준) 기준의 따라서)
       - HTML에서 따로 font-size를 지정하지 않으면 브라우저에서 지정된 font-size를 따라간다.

         3. vw - viewport 브라우저의 너비에 따라서
         4. vh - viewport 브라우저의 높이에 따라서
         5. % - 부모 요소에 의해 상대적으로 사이즈 지정 가능

- 언제 어떤걸 사용해야 하는지?
  1. 부모 요소에 의해 사이즈가 변경되어야 하는 것
     - em, %
  2. 브라우저 사이즈에 대해서 반응해야 한다면
     - viewport, rem
  3. 요소의 너비와 높이에 따라서 사이즈가 변경되야 된다면
     - %, viewport
  4. font-size에 따라서 사이즈가 변경되야 된다면
     - em, rem
