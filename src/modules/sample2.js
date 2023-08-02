//2
// [[!!핵심: 미들웨워 thunk 특정작업을 미뤄서 처리하는데 액션이 발생되면 미들웨워에서 리덕스 스토어의 리듀서를 호출해 추가된 데이터를 dispatch 전달및 실행 업데이트된 리듀서 함수를 갖고있는 미들웨워를 반환한다]]]
// 미들웨워 비동기작업 redux-thunk 라아브러리 적용
// thunk 함수를 생성한다 | thunk 함수 내부에서는 시작할때 | 성공했을때 | 실패했을때 다른 액션을 디스패치한다
// 360 API호출 할때 Promis 기반으로 axios를 사용 Promis 쉽게 사용하기 위해서 async/await 사용
// 483 미들웨워 thunk 함수 getPost 만들어서 디스패치할수 있다. 리덕스 미들웨워가 그 함수를 전달받아 redux store의 디스패치와getState를 파라미터로 넣어서 호출해준다.
// redux store 디스패치와getState 파라미터로 넣어서 호출하면 현재상태를 참조할수있고, 새 액션을 디스패치할 수도 있다.
export const getPost = (id) => async (dispatch) => {
  //437 액션생성함수만들기 415 액션객체는 type필드를 반드시 가지고 있어야 한다 { type: GET_POST }
  //요청을 시작한것을 알림
  dispatch({ type: GET_POST });
  //360 promise가 끝날때까지 기달리고 결과값을 변수에 담는다.
  try {
    const response = await api.getPost(id);
    //새 액션을 dispatch | payload: 액션을 만들면 액션에 필요한 추가데이터를 의미한다.
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    }); //요청성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    }); //에러발생
    throw e; // 컴포넌트단에서 에러를 조회할 수 있게 해준다.
  }
};

export const getUsers = () => async (dispatch) => {
  //437 액션생성함수만들기 415 액션객체는 type필드를 반드시 가지고 있어야 한다 { type: GET_USER }
  // 요청을 시작한 것을 알림
  dispatch({ type: GET_USERS });
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    }); //요청성공
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    }); //에러발생
    throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해줌
  }
};
