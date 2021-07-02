## Next.js Dynamic Routes

- Page Path

  - Next.js는 외부 데이터에 의존하는 path를 가지고 정적 페이지를 생성하는데 이를 dynamic URL이라고 한다.

- 동적 라우트로 정적 페이지를 생성하기
  - 각 포스트가 /post/<id> 형태의 path를 갖게 한다. <id>는 posts 디렉토리 아래에 있는 파일의 이름
  - ssg-ssr.md와 pre-rendering.md 파일이 있으니, 각 path는 /posts/ssg-ssr과 /posts/pre-rendering이 된다.
  - pages/posts 디렉토리 아래에 [id].js라는 파일을 만듭니다. [] 형태로 이루어진 페이지가 Next.js에서 동적 라우팅이 됨 (pages/posts/[id].js)에는 포스트 페이지를 렌더할 코드를 적는다
  - getStaticPath라고 불리는 async function을 export 한다. (id로 유효한 값들을 리스트 형태로 리턴)
  - getStaticProps를 다시 추가 (id의 필요한 데이터를 fetch 해오기 위해서 getStaticProps에는 id가 포함된 params를 넘겨준다 - 파일 이름이 [id].js이기 때문)

```Javascript
// pages/post/[id].js
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}

// lib/post.js 이 함수는 posts 디렉토리 파일 이름에서 .md를 제외한 부분을 리스트로 반환한다.
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
/* 반환되는 리스트는 string 배열이 아니라, 객체로 이루어진 배열이여야 한다.
각 객체는 반드시 params 이름의 키를 갖고, id 키를 가진 오브젝트를 포함해야 한다. (파일 이름이 [id]이기 때문이다.)
이 조건을 충족하지 않으면 getStaticPaths를 사용할 수 없다. */

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
// 포스트를 렌더하기 위해서 주어진 id를 가지고 필요한 데이터를 fetch 해야 한다. 이 함수는 id를 가지고 포스트 데이터를 리턴하게 된다.

// 다시 pages/post/[id].js
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false // 일단 넘어가자
  }
}
// paths는 getAllPostsIds()로부터 리턴된 paths로 이루어진 배열을 포함 이는 pages/posts/[id].js로 정의된 params를 포함

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
// post pages는 getStaticProps 함수 안에서 getPostData를 사용하여 필요한 데이터를 가져오고 props로 리턴하게 된다.
```
