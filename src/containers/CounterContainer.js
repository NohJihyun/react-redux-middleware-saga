//[[[컴포넌트설명]]]
//컨테이너컴포넌트
//Redux store 와 연결
//485 Redux store 작업된것을 호출해 사용하던 액션생성함수도 미들웨워 적용하기위해서 변경함
//485 dispatch로 액션생성함수 전달 --> 미들웨워 비동기작업이 받은후 1초후 리듀서 업데이트함수 될수있게 작업 --> 다시 dispatch로 함수 전달
import { connect } from "react-redux";
//import { increase, decrease } from "../modules/counter";
//485 Redux store 작업된것을 호출해 사용하던 액션생성함수도 미들웨워 적용하기위해서 변경함
import { increaseAsync, decreaseAsync } from "../modules/counter";
//프레젠테이셔널컴포넌트 UI담당(이벤트핸들링설정onClick)--> 유저의 클릭--> 액션이 발생--> 이벤트핸들러로 보내짐 dispatch
import Counter from "../components/Counter";

//해당컨테이너컴포넌트는 Redux store와 연결 Redux store에서 새로운 상태를 리듀서가 처리하면 프레젠테이셔널 컴포넌트에 전달.
//447,475 객체 내부의 값들은 props로 전달 핵심! {number,increase,decrease} 받아와서 비구조분해 할당으로 props로 프레젠테이셔널컴포넌트에 전달
const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    //props로 프레젠테이셔널 컴포넌트에 전달
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};
//connect()() --> Redux store 와 연결
//447mapStateToProps | mapDispatchToProps 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달된다
//447,475 객체 내부의 값들은 props로 전달 핵심!
export default connect(
  //mapStateToProps --> 리덕스스토어에 현재상태를 가르킨다. 받아온다
  (state) => ({
    number: state.counter,
  }),
  //mapDispatchToProps --> 리덕스스토어 액션생성함수 전달
  // {
  //   increase,
  //   decrease,
  // }
  //485 Redux store 작업된것을 호출해 사용하던 액션생성함수도 미들웨워 적용하기위해서 변경함
  {
    increaseAsync,
    decreaseAsync,
  }
)(CounterContainer);
