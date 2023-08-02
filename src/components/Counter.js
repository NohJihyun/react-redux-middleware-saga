//[[[컴포넌트설명]]]
//프레젠테이셔널 컴포넌트 UI 담당
//카운터컴포넌트에서 props로 전달받아서 UI를 담당한다.
const Counter = ({ onIncrease, onDecrease, number }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
