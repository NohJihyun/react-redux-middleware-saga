//[[[api 호출 함수를 따로 분리]]]
//api를 모두 함수화
//api를 호출할 때는 주로 Promise 기반 웹 클라이언트인 axios를 사용한다
import axios from "axios";

//다른 파일에서 불러와 사용할수 있도록 export를 사용해서 내보낸다
//포스트읽기
export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
//모든 사용자정보 불러오기
export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);
