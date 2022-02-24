## 클라이언트 리팩토링

---

- 기존 외주받은 것, 전임자에게 인수인계를 받지 못하고 신입이였던 제가 받았을 때 업무 수행 이후 코드들이 짬뽕
- 실제 업무를 진행하면서 리팩토링의 대한 엄두를 못내고 있다가 새로운분이 오시면서 계기가 됨

  1. 안쓰는 코드들 제거 (파일들이 너무 많고 기능 변경에 따른 안쓰는 파일 및 코드 제거)
  2. 불러올 필요없는 데이터 계속 호출 (중복 호출 제거)
  3. 공통 모듈로 뺄 수 있는건 공통 모듈로 빼기
     - 변경사항이 너무 많아지면 공통 모듈도 의미가 없기 때문에 점진적 개발

- Redux-saga 에서 react-query 전환

  - 업무를 하면서 새로운 기능 및 유지보수를 하게 될 때, 반복되는 코드 작성이 마음에 들지 않았다.
    - 가독성, 코드의 라인 수 (불필요한 상태나 로직들)
  - Loading flag, Error flag들이 너무 많다.
    - react-query에 isLoading, error 등
  - 새로운 기능이 추가될수록 Store가 계속해서 커진다.
  - 클라이언트에서 전역 상태를 관리하는애들은 Redux로 관리하되 서버와 관련된 상태를 분리할 순 없을까?
  - 서버와 클라이언트 사이 비동기 로직들을 관리할 수 있게 해주는 react-query를 채택하여 리팩토링 진행

- useQuery

  - isLoading vs isFetching
  - 캐시가 없을 때 (첫 번째 쿼리를 가져올때나 가비지 컬렉터 작동 이후) isLoading이 true에서 false로 전환
  - 이미 캐시 데이터가 있고 다시 가져오는 경우(다른 구성 요소에서 쿼리를 사용하는 경우 등)에 useQuery는 이전에 캐시된 데이터를 반환하고 서버에서 다시 데이터를 가져와야 함
  - 이러한 경우 isLoading은 항상 false지만 true에서 false로 전환되는 isFetching 사용 가능
  - 즉, 처음 로드할 때 아직 데이터가 없을때 isLoading, 데이터를 다시 가져와야 할 때 isFetching

- useMutation

  - Ui update를 위한 쿼리 무효화
  - queryClient.invalidateQueries("myXquares");

- useInfiniteQuery

  - 쿼리키가 바뀌면, 데이터를 다시 불러오고, 객체를 넣었을 경우 deepCopy까지 해준다.
  - 기존 dispatch로 관리해줬던 로직들을 다 제거해주고 useInfiniteQuery 내에서의 모든것이 관리가 가능
  - 데이터를 불러오는 시점, fetching 시점 등 다양한 형태로 관리 가능

- Error
  - Missing queryFn (() => )

```Js

export const useInfiniteProjectSearch = props => {
  const { filter, projectSearch } = props;
  const { data, fetchNextPage, isLoading, isFetching, refetch, hasNextPage } = useInfiniteQuery(
    ["projectSearch", { filter }], // 쿼리키가 바뀌면, 데이터를 다시 불러오고, 객체를 넣었을경우 deepCopy까지 해준다.
    ({ pageParam = 0 }) => apiGetProjectSearch({ pageParam, filter, projectSearch }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: lastPage => {
        // return lastPage.query === lastPage.totalPage ? undefined : lastPage.query + 1;
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
    },
  );

  return {
    projectSearchPage: data?.pages,
    fetchNextSearchProject: fetchNextPage,
    isLoading,
    isFetching,
    refetch,
    hasNextPage,
  };
};


```
