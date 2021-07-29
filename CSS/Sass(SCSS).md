## Sass (SCSS)

- Sass(Syntactically Awesome Style Sheets)

  - 전처리기 3대장으로 불리는 Less, Sass(SCSS), Stylus
  - Sass는 Less와 Stylus의 장점을 모두 가지고 있다.

- Sass와 SCSS
  - Sass의 3버전에서 새롭게 등장한 SCSS는 CSS구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합
  - 쉽고 간단한 차이는 {}, ;의 유무이다.

```Javascript

// Sass
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px

=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

.box
  +border-radius(10px)

// SCSS
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }

```
