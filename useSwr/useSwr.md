## useSwr

- 원격 데이터 fetch를 위한 커스텀 훅 npm 모듈
- 원격서버의 상태를 가져와서 리액트 컴포넌트에 꽂아주는 기능
- 여기서 fetch는 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 해주는 메서드
- fetch는 Promise 기반으로 구성되어 있어 비동기 방식으로 요청 가능

- useSWR의 장점

  - SWR은 원격상태와 로컬상태를 하나로 통합한다.
  - 컴포넌트간 전역 상태를 공유할 수 있는 특성
    1. 로컬의 상태 정의
    2. 컴포넌트에서 스토어 상태에 따른 렌더링을 정의
    3. 적절한 시점에 데이터를 fetch하여 로컬 스토어를 초기화
       - 자연스럽게 해당 데이터들이 컴포넌트에서 정의한대로 화면에 뿌려짐
  - 위 3가지 과정을 하나로 통합할 수 있다.

- 정리하면 여러 컴포넌트들에서 필요한 상태를 가져다 사용할 수 있다.
  - 사용자가 사용자 정보를 수정할 시, SWR 내부 스케줄링에 의해 수정 즉시 화면에 변경된 데이터가 보여져야 할 때, mutate 함수를 이용할 수 있다.
    (mutate 함수가 호출되면 해당 상태를 즉시 fetch하고 데이터를 갱신함)

```Typescript
//ex1)
import useSWR from 'swr';

function Point() {
    const {data, error} = useSWR('api/points', url => {
        return fetch(url).then(res => res.json())
    })

    if(error) {
        return <div>실패</div>
    }
    if(!data) {
        return <div>로딩중..</div>
    }
    return <div>{data}</div>
}


import useSWR from "swr";
import { projectService } from "global/service";
import { Project } from "global/model";

export function useProject(projectId: string) {
  const { data, error, mutate } = useSWR<Project, Error>(projectId, projectService.getProject);

  return {
    project: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

```
