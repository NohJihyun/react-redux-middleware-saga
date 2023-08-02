//[[[컨테이너컴포넌트 Redux STORE + 미들웨워 연결]]]
import { connect } from "react-redux";
import Sample from "../components/Sample";
//미들웨어로 비동기 작업해둔 함수 가져오기
import { getPost, getUsers } from "../modules/sample";
import React from "react";

//useEffect를 활용하여 렌더링될때 특정작업을 수행하도록 로직구성 [값] 있는경우 특정값 업데이트시에만 특정작업수행
const { useEffect } = React;
//반환된 객체 파라미터로 받아서 props로 전달
const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  lodingPost,
  lodingUsers,
}) => {
  // 500 리팩토링 작업 try / catch로 실패했을때 케이스를 관리한다
  // useEffect에 파라미터로 넣는 함수는 async로 할수 없기때문에 내부에서 async 함수를 선언하고 호출해 사용한다
  //클래스 형태 컴포넌트였다면 componentDidMount --> 첫렌더링이 될때
  useEffect(() => {
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e); // 에러조회
      }
    };
    // getPost(1);
    // getUsers(1);
    fn();
  }, [getPost, getUsers]); //특정값 업데이트시에만 특정작업수행
  return (
    <Sample
      post={post}
      users={users}
      lodingPost={lodingPost}
      lodingUsers={lodingUsers}
    />
  );
};
// REDUX STORE + 미들웨워 연결
// 리듀서 sample 을 파라미터로 받아서 반환 --> reducert(state / action ) 값으로 새로운 state를 반환한다.
// 500 리팩토링 시킨 로딩관련 로직 연결
export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    // lodingPost: sample.loading.GET_POST,
    // lodingUser: sample.loading.GET_USERS,
    lodingPost: loading["sample/GET_POST"],
    lodingUser: loading["sample/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
