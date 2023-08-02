//[[[프레젠테이셔널 컴포넌트 UI만 담당]]]
// POST : TTILE / BODY만 보여준다 | USER: username과 email만 보여준다
// props로 전달받음
const Sample = ({ loadingPost, lodingUsers, post, users }) => {
  //492 &&post&& 객체가 유효할때만 post.title | post.body의 값을 표현식으로 보여준다
  //492 데이터가 없는 상태라면 post.title을 조회하려고 할시에 자바스크립트 에러가 발생된다 유효성 검사를 해줘야한다
  //492 user도 마찬가지로 데이터가 배열 형태로 들어오것을 기대하고 map 함수를 사용, 유효성 검사를 하지 않으면 null값에 대해 map함수를 호출하고, 결국 map 함수가 존재하지 않아 오류가 발생한다.
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && "로딩 중...."}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {lodingUsers && "로딩 중..."}
        {!lodingUsers && users && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Sample;
