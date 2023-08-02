// import CounterContainer from "./containers/CounterContainer";

// function App() {
//   return (
//     <div>
//       <CounterContainer />
//     </div>
//   );
// }
// export default App;

//494
//import SampleContainers from "./containers/SampleContainers";
//508 미들웨어saga를 적용한후 렌더링테스트 counter
//import CounterContainer from "./containers/CounterContainer";
//514 미들웨워saga를 적용한후 렌더링 테스트 sample
//import SampleContainers from "./containers/SampleContainers";
import CounterContainer from "./containers/CounterContainer";
const App = () => {
  return (
    <div>
      {/* <SampleContainers /> */}
      <CounterContainer />
    </div>
  );
};

export default App;
