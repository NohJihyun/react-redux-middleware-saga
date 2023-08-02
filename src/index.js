// [[[컴포넌트설명]]]
// 스토어를 생성한후, Provider로 리액트 프로젝트에서 리덕스를 적용시킨다 | 미들웨워 적용
//476 미들웨워란: 액션을 디스패치했을때 리듀서에서 이를 처리하기전에 사전에 지정된 작업을 처리하는 중간자
//476 액션 -> 미들웨워 -> 넥스트 -> 미들웨워2 -> 넥스트 -> 리듀서 -> 스토어
//476 redux-thunk 미들웨워를 사용해서 비동기 작업 처리 [특정작업] 나중에 할수있도록 함수형태로 감쌈을 의미 콘솔로 출력하면 함수형태의 결과가 도출
//476 thunk 함수를 만들어서 디스패치 할수 있다 그러면 리덕스 미들웨워가 그 함수를 전달받아 store의 dispatch getState를 파라미터로 넣어서 호출
//476 호출하면 1.현재 상태를 참조할수 있고 2.새 액션을 디스패치할 수도 있다.
//[핵심] 컨테이너 컴포넌트에서 dispatch 액션생성함수 전달 미들웨어서 비동기작업 1초후 리듀서 업데이트로직실행 함수를 다시 dispatch로 전달 컨테이너 컴포넌트에서 props로 프레젠테이셔널 컴포넌트에 전달후 UI출력
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
//스토어생성 + 미들웨워 적용 applyMiddleware
import { createStore, applyMiddleware } from "redux";
//루트리듀서 받아서 스토어생성
import rootReducer, { rootSaga } from "./modules";
//provider로 리액트 프로젝트에 리덕스 적용
import { Provider } from "react-redux";
//내가 만든 미들웨워 가져다 사용
//import loggerMiddleware from "./lib/loggerMiddleware";
//오픈소스 미들웨워 redux-logger 라이브러리 적용
import { createLogger } from "redux-logger";
//리덕스프로젝트에서 [미들웨워로 비동기작업]을 처리할때 사용하는 라이브러리
import thunk from "redux-thunk";
//507리덕스프로젝트에서 [미들웨워로 비동기작업 saga]로 처리함
import createSagaMiddleware from "redux-saga";
//509 개발자 도구를 적용하여 어떤 액션이 디스패치되고 있는지 더 편하게 확인 가능
import { composeWithDevTools } from "redux-devtools-extension";

//스토어생성 + 미들웨워 적용
//const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
//미들웨워 적용  redux-logger 라이브러리 적용
const logger = createLogger();
//스토어생성 + 미들웨워 적용  redux-logger 라이브러리 적용 + 미들웨워 비동기작업 thunk 적용
//const store = createStore(rootReducer, applyMiddleware(logger, thunk));
//507스토어생성 + saga 미들웨워 적용
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  //composeWithDevTools() 개발자도구를 적용
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk, sagaMiddleware))
);
sagaMiddleware.run(rootSaga); //설정후 만들어둔 미들웨워 사가함수를 실행

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
