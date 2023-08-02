// [[[REDUX모듈설명]]]
// redux를 위한 코드
// ducks 패턴
// 카운터 컴포넌트 redux-store와 연결
// redux-actions 라이브러리-redux편하게 사용하기| createAction | handleActions
// 미들웨워적용
//476 미들웨워란: 액션을 디스패치했을때 리듀서에서 이를 처리하기전에 사전에 지정된 작업을 처리하는 중간자
//476 액션 -> 미들웨워 -> 넥스트 -> 미들웨워2 -> 넥스트 -> 리듀서 -> 스토어
//476 redux-thunk 미들웨워를 사용해서 비동기 작업 처리 [특정작업] 나중에 할수있도록 함수형태로 감쌈을 의미 콘솔로 출력하면 함수형태의 결과가 도출
//476 thunk 함수를 만들어서 디스패치 할수 있다 그러면 리덕스 미들웨워가 그 함수를 전달받아 store의 dispatch getState를 파라미터로 넣어서 호출
//476 호출하면 1.현재 상태를 참조할수 있고 2.새 액션을 디스패치할 수도 있다.
//477미들웨워 기본구조 store(리덕스스토어객체) NEXT()전달 action(디스패치된액션) 가르킨다
//[핵심] 컨테이너 컴포넌트에서 dispatch 액션생성함수 전달 미들웨어서 비동기작업 1초후 리듀서 업데이트로직실행 함수를 다시 dispatch로 전달 컨테이너 컴포넌트에서 props로 프레젠테이셔널 컴포넌트에 전달후 UI출력
import { createAction, handleActions } from "redux-actions";
//517 미들웨워 saga STORE 현재 상태 조회하는 기능 SELECT
//518 사가가 실행되는 주기를 제한하는 방법 Throttle 이라는 함수를 사용하면 사가가 N초에 단 한번만 호출되도록 설정할수 있다
import {
  delay,
  put,
  takeLatest,
  takeEvery,
  select,
  throttle,
} from "redux-saga/effects";

//1액션이름정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

//2
//비동기 미들웨워 thunk
//액션생성함수=객체생성
export const increase = createAction(INCREASE); //액션생성함수선언 객체를 직접만들필요 없는 로직
export const decrease = createAction(DECREASE);

//2
//502 비동기 미들웨워 redux-saga es6 제네레이터 함수 문법사용
//액션생성함수=객체생성
//506마우스 클릭 이벤트가 payload 안에 들어가지 않도록 () => undefined를 두 번째 파라미터로 넣어준다
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

//3
//502 비동기 미들웨워 redux-saga es6 제네레이터 함수 문법사용
//제네레이터 함수 만들기
function* increaseSaga() {
  yield delay(1000); // 1초를 기달립니다
  yield put(increase()); // 특정 액션을 디스패치 합니다.
  //518 미들웨워 saga STORE 상태 조회 기능
  const number = yield select((state) => state.counter); // state는 스토어 상태를 의미한다
  console.log(`현재 값은 ${number}입니다`);
}
function* decreaseSaga() {
  yield delay(1000); // 1초를 기달립니다
  yield put(decrease()); // 특정 액션을 디스패치 합니다.
}
export function* counterSaga() {
  // takeEvery 는 들어오는 모든 액션에 대하여 특정 작업을 처리해줍니다.
  // increaseSaga 를 등록함
  // throttle 함수를 takeEvery 대신에 적용 제한설정
  // 첫 번째 파라미터 : n초 * 1000
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  // takeLatest 는 만약 기존에 진행중이던 작업이 있다면 취소처리 하고
  // 가장 마지막으로 실행된 작업만을 수행합니다.
  // decreaseSaga 를 등록함
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}
//3
//[핵심] 컨테이너 컴포넌트에서 dispatch 액션생성함수 전달 미들웨어서 비동기작업 1초후 리듀서 업데이트로직실행 함수를 다시 dispatch로 전달 컨테이너 컴포넌트에서 props로 프레젠테이셔널 컴포넌트에 전달후 UI출력
//476 미들웨워 비동기작업 Thunk생성 함수 만들기
//484 1초 뒤에 increase 혹은 decrease() 함수를 dispatch함 --> thunk는 객체를 반환하는 대신에 함수를 반환한다. --> 리듀서의 업데이트 함수를 반환
//483 thunk 함수를 만들어서 디스패치 할수 있다 그러면 리덕스 미들웨워가 그 함수를 전달받아 store의 dispatch getState를 파라미터로 넣어서 호출
//486 1.현재 상태를 참조할수 있고 2.새 액션을 디스패치할수도 있다.
//506 redux-미들웨워-제너레이터처리로 주석처리함
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

//4
//초기값 | 초기상태는 꼭 객체가 아니여도 된다 숫자도 작동
const initialState = 0;

//5
//리듀서 | 초기state와 action를 받아서 새로운 상태로 반환한다
//redux-actions 라이브러리의 handleActions
const counter = handleActions(
  //첫번째 파라미터 액션에 대한 업데이트 함수
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState // 두번째 파라미터 초기값 | 초기상태
);

export default counter;
