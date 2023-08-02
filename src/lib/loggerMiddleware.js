//[[[리덕스미들웨워]]]
//477 액션 -> 미들웨워(중간자) -> 리듀서 -> 스토어
//477 사전 지정된 작업수행 1.콘솔기록2.전달받은 액션정보 기반으로 액션을 취소 3.다른 종류의 액션을 추가로 디스패치할수도 있다.
//477 미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수이다
//477 store 리덕스 스토어 인스턴스 = 객체
//477 action 디스패치된 액션을 가르킨다
//477 next store.dispatch 비슷한 역할을 한다
//477 액션 -> 미들웨워(중간자) store.dispatch(첫번째 미들웨워부터 다시처리한다)-->next(넥스트를 사용하지 않으면 액션은 리듀서로 전달되지 않는다) -> 리듀서 -> 스토어
//478 정보를 순차적으로 콘솔에 보여주는 미들웨워 1. 이전상태 2. 액션정보 3.새로워진 상태

//[[바로 하위 로직을]] 일반 function 키워드로 풀어쓴 로직
//미들웨워 기본 구조
// const loggerMiddleware = function loggerMiddleware(store) {
//   return function (next) {
//     return function (action) {};
//   };
// };
//화살표함수
//미들웨워 기본구조
//함수를 반환하는 함수를 반환하는 함수이다.
// const loggerMiddleware = (store) => (next) => (action) => {
// };
// export default loggerMiddleware;

//478 정보를 순차적으로 콘솔에 보여주는 미들웨워 1. 이전상태 2. 액션정보 3.새로워진 상태
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type); // 액션 타입으로 log 를 그룹화함
  console.log("이전 상태", store.getState());
  console.log("액션", action);
  next(action); // 다음 미들웨어 혹은 리듀서에게 전달
  console.log("다음 상태", store.getState()); // 업데이트 된 상태
  console.groupEnd(); // 그룹 끝
};

export default loggerMiddleware;
