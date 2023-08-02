//[[[리펙토링]]]
import { startLoading, finishLoading } from "./../modules/loading";
//반복되는 로직을 따로 분리하여 코드의 양을 줄이는 로직

// 모듈 미들웨워 Thunk 함수
// 사용법: createRequestThunk('GET_USERS',API.getUsers)
export default function createRequestThunk(type, request) {
  // 요청| 성공 | 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  //498 loading 리덕스 모듈에서 만든 액션 생성 함수는 미들웨워 적용시켜준다
  return (params) => async (dispatch) => {
    dispatch({ type }); // 시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 에러 발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}

// 사용법: createRequestThunk('GET_USERS',api.getUsers);
