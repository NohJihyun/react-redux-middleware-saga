// [[[모듈설명]]]
// 442 스토어를 만들어낼때 리듀서는 하나여야 하기때문에 유틸함수를 이용해서 리듀서를 합친다 combineReducers
import { combineReducers } from "redux";
// import sample from "./sample";
import { all } from "redux-saga/effects";
//리듀서가져오기
import counter, { counterSaga } from "./counter";
//saga
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
//루트리듀서 만들기
const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

//506 redux-미들웨워-sage 루트 saga
export function* rootSaga() {
  //all 함수는 여러 사가를 합쳐 주는 역할을 한다
  //sample saga 추가등록
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
