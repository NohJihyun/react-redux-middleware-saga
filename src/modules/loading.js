// [[모듈설명]]
// 기존 리듀서 내부에서 각요청 관련된 액션이 디스패치될 때마다 로딩 상태를 변경해주었는데,
// 로딩 상태만 관리하는 리덕스 모듈을 따로 생성해서 처리함
// redux 편하게 사용하기 위해서 createAction , handleActions 사용
import { createAction, handleActions } from "redux-actions";

// 액션정의
const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";
// 496 중요
// 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
// 액션생성함수
export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);
// 초기상태/값
const initialState = {};

// 리듀서
// 요청이 시작될때 로딩이 걸리기 때문에 sample/GET_POST 값을 true 설정해줌
// sample/GET_POST 필드가 존재하지 않으면 새로 값을 설정해주면 된다.
// 요청이 시작될때 디스패치할 액션 497 참고
// 요청을 위한 액션 타입을 payload 추가되는 데이터로 설정한다
// 요청이 끝나면 다음 액션을 디스패치한다
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
