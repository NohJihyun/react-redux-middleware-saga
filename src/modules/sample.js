//[[[모듈설명]]]
//duks패턴
//api를 사용하여 데이터를 받아와서 상태를 관리하는 리듀서 생성
import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
//496 반복되는 소스를 따로 분리해서 작성한뒤 가져와 사용 |요청시작|성공|실패 로직
//import createRequestThunk from "../lib/createRequestThunk";
//512 미들웨워-saga를 활용하여 비동기 작업 api 요청
import { call, takeLatest, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "./loading";
//516 미들웨워-saga를 짧은코드로 리팩토링
import createRequestSaga from "../lib/createRequestSaga";

//1
//액션타입선언 한 요청당 세개를 만든다 |시작할때|성공할때|실패했을때
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
//496/500 const GET_POST_FAILURE = "sample/GET_POST_FAILURE"; | 리팩토링 작업으로 불피요한 코드 제거
//511 saga api요청을 위해서 액션 타입을 선언한다
//516 saga 짧은 코드로 리팩토링 주석처리
// const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
//496/500const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE"; | 리팩토링 작업으로 불피요한 코드 제거
//511 saga api요청을 위해서 액션 타입을 선언한다
//516 saga 짧은 코드로 리팩토링 주석처리
// const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//2
// 액션생성함수
// [[!!핵심: 미들웨워 thunk 특정작업을 미뤄서 처리하는데 액션이 발생되면 미들웨워에서 리덕스 스토어의 리듀서를 호출해 추가된 데이터를 dispatch 전달및 실행 업데이트된 리듀서 함수를 갖고있는 미들웨워를 반환한다]]]
// 미들웨워 비동기작업 redux-thunk 라아브러리 적용
// thunk 함수를 생성한다 | thunk 함수 내부에서는 시작할때 | 성공했을때 | 실패했을때 다른 액션을 디스패치한다
// 360 API호출 할때 Promis 기반으로 axios를 사용 Promis 쉽게 사용하기 위해서 async/await 사용
// 483 미들웨워 thunk 함수 getPost 만들어서 디스패치할수 있다. 리덕스 미들웨워가 그 함수를 전달받아 redux store의 디스패치와getState를 파라미터로 넣어서 호출해준다.
// redux store 디스패치와getState 파라미터로 넣어서 호출하면 현재상태를 참조할수있고, 새 액션을 디스패치할 수도 있다.

//2 기존소스는 sample2.js로 옮겨서 저장해두었음 요청시작|성공|실패 비동기작업 미들웨워 로직을 옮겨두었고 하단에 간결화 해서 로직을 작성함
//2 [주석처리 요청시작|성공|실패 비동기작업 로직을 따로 분리하였다 lib폴더에 createRequestThunk.js 코드리팩토링 import해서 가져다 사용하는 형식으로 하단에 변경]
//2 요청시작|성공|실패 비동기작업 로직 가져와 사용하는 방법 간결화 시킴 책 496에서 변경import { getPost } from './../lib/api';

//496 요청시작|성공|실패 미들웨어 로직을 따로 분리해서 createRequestThunk.js
//496 API 요청을 해주는 thunk 함수를 한줄로 생성하게 만듬
//496 thunk 함수를 생성하고 thunk 함수 내부에서는 시작할때, 성공했을때, 실패했을때 다른 액션을 디스패치한다.
//export const getPost = createRequestThunk(GET_POST, api.getPost);
//export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

//512 액션생성함수
//512 미들웨워SAGA를 활용한 API 데이터 요청(요청 상태 관리)
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

//516 액션생성함수
//리팩토링
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

//3
//제네레이터함수추가
//파라미터로 action을 받아오면 액션의 정보를 조회할수 있다.
//제네레이터 함수 추가한것 리팩토링 작업으로 소스를 단축화 해서 아래에 적용

//POST
// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); // 로딩 시작
//   // 파라미터로 action 을 받아오면 액션의 정보를 조회 할 수 있습니다.
//   try {
//     // call 을 사용하면 Promise 를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
//     // 첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수입니다.
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 를 의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data,
//     });
//   } catch (e) {
//     // try/catch 문을 사용하여 에러도 잡을 수 있습니다.
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_POST)); // 로딩 완료
// }
// //USERS
// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS));
//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }
// export function* sampleSaga() {
//   yield takeLatest(GET_POST, getPostSaga);
//   yield takeLatest(GET_USERS, getUsersSaga);
// }

//516 제네레이터 함수 생성 리팩토링
export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 3-1 -> 미들웨워 SAGA로 위에 로직이 추가되 3-1로 표기, 제네레이터함수추가
// 초기 상태를 선언한다
// 요청의 로딩 중 상태는 loading 객체에서 관리함
// 초기 상태는 자유 |객체|문자열|숫자
const initialState = {
  // | 500 리팩토링 작업으로 불피요한 코드 제거
  // loading: {
  //   GET_POST: false,
  //   GET_USER: false,
  // },
  post: null,
  users: null,
};

//4 리듀서
//456 redux-action 라이브러리 사용해서 리듀서를 만들때 switch/case 문이 아닌 handleActions() 사용해 각액션마다 업데이트함수를 설정하는 형식으로 작성한다
//456 handleActions() 첫번째 파라미터는 업데이트함수 두번째파라미터는 초기값을 넣어준다
const sample = handleActions(
  {
    //[[순차적 위아래서 아래로 적용된 내용]]
    //500 리팩토링 작업으로 불피요한 코드 제거
    //POST
    // [GET_POST]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true, //요청시작
    //   },
    // }),
    //513 미들웨워 saga 적용으로 코드주석처리
    // [GET_POST_SUCCESS]: (state, action) => ({
    //   ...state,
    //   loding: {
    //     ...state.loading,
    //     GET_POST: false, // 요청완료
    //   },
    //   post: action.payload,
    // }),
    //513 미들웨워 saga 적용 post
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    // | 500 리팩토링 작업으로 불피요한 코드 제거
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loding: {
    //     ...state.loding,
    //     GET_POST: false, //요청완료
    //   },
    // }),
    //USER
    // [GET_USERS]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USER: true, //요청시작
    //   },
    // }),
    //513 미들웨워 saga 적용으로 코드주석처리
    // [GET_USERS_SUCCESS]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USER: false,
    //   },
    //   users: action.payload,
    // }),
    //513 미들웨워 saga 적용 USERS
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    // | 500 리팩토링 작업으로 불피요한 코드 제거
    // [GET_USERS_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USER: false,
    //   },
    // }),
  },
  initialState
);

export default sample;
