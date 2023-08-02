//515 [[[리펙토링 미들웨워 saga 반복되는 코드 함수화 ]]]
import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "./../modules/loading";
//494 참고
export default function createRequestSaga(type, request) {
  //성공 및 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`; // `` 문자열 더하기
  const FAILURE = `${type}_FAILURE`;

  // 미들웨워 saga 제네레이터함수
  // 파라미터로 action을 받아오면 액션의 정보를 조회할수 있다
  return function* (action) {
    yield put(startLoading(type)); //로딩시작
    // call을 사용하면 Promise 반환하는 함수를 호출 기달릴수있다
    // api.getPost(action.payload) 첫번째파라미터는 함수 나머지 함수에 넣을 인수
    // try/catch 를 이용해서 에러도 잡을수 있다.
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩끝
  };
}
