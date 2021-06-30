## Next Navigate Pages

- Next.js에서 route는 pages 디렉토리 아래 파일의 이름과 연관됨
  - pages/index.js는 / 루트와 연결되고, pages/posts/first-post.js는 /posts/first-post 루트와 연결된다.
  - 디렉토리의 path가 URL path가 된다.
  - 컴포넌트의 이름은 상관없지만 반드시 default export를 해야 한다.

```Javascript
export default function FirstPost() {
    return <h1>First Post</h1>
}

```

- Link Component
  - Next.js에서 Link 컴포넌트를 next/link 에서 import 해서 <a> 태그를 감싸면 된다. <Link>가 웹앱의 다른 페이지 간 client-side 네비게이션을 할 수 있도록 해준다.
  - Link 컴포넌트는 같은 Next.js 앱에서 두 페이지간 client-side-navigation을 가능하게 한다.
  - Client-side-navigation 이라는 것은 페이지 변화가 자바스크립트를 사용하여 일어난다는 것을 의미하며, 브라우저로 작동하는 기본 navigation보다 빠르다.
  - Link 컴포넌트가 브라우저의 뷰포트(웹 페이지가 사용자에게 보여지는 영역)에 존재한다면 Next.js는 자동으로 연결된 페이지들의 코드를 미리 가져온다. (링크를 클릭할 때마다 연결된 페이지의 코드는 백그라운드에 로드 되어 있음)

```Javascript
// index.js
import Link from 'next/link'

<h1 className="title">
  Read{' '}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>

import Link from 'next/link'

// first-post.js
export default function FirstPost() {
  return (
  <>
    <h1>First Post</h1>
    <h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </h2>
  </>
)}

```
