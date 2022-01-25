# 감귤S2팀 코드 리뷰 요청

## 1번 리뷰 : 계정ID 유효성 검사

- 범위 : initPage.js파일 169 ~ 187 line

- 전체 개요
  계정ID 유효성 검사 코드
  (유사한 로직으로 이메일 검증도 합니다)

- 기능 내용 (함수나 변수 등은 주석으로 넣어주세요.) 1. 사용자가 입력한 userId를 const 변수로 저장한다.
  `const userId = joinUserIdInput.value;` 2. 정규식 검사를 위한 변수를 선언한다.
  `const regExp = new RegExp("^[a-zA-Z0-9_.]+$");` 3. 계정 아이디가 중복되지 않았는지 확인하기 위해 validUserId 변수를 선언해 T/F 값을 확인한다.
  `const validUserId = await checkUserIdValid(userId);` 4. 사용 가능한 아이디인지 판단하기 위해 validUserId가 false이고, null이 아니며, 정규식을 통과한 userId인지를 먼저 검사한다.
  `if (!validUserId && userId != "" && regExp.test(userId) == true)` 5. 그 다음으로 정규식을 통과하지 못했다면 적절한 경고 문구를 표시한다.
  `else if (!regExp.test(userId))` 6. 나머지 경우에 대해서는 이미 사용 중인 아이디라고 표시된다.

### 리뷰 요청 내용

1.  올바른 아이디인지, 정규식을 통과 못한 아이디인지 순서로 검사하는데 이게 맞는 방법인가요?
2.  remove, add, innerText 코드가 반복되는데 어떻게 줄일 수 있을까요?

---

## 2번 리뷰 : 이미지 삭제 관련 함수

- 범위

  - 11.uploadPage.js 115-128줄.

- 전체 개요

  - 게시물 작성 페이지에서 미리보기 이미지를 등록할 경우 각 이미지에 이미지 삭제

- 기능 내용
  - 11.uploadPage.js 97번째줄 html 코드가 이미지엘리먼트html
    ```
    <li class="imgItem">
      <button type="button" class="btn-close">
        <img src="../images/x.png" alt="" class="x">
      </button>
      <img src="${e.target.result}" alt="" / >
    </li>
    ```
  - 11.uploadPage.html 의 코드
    ```
    <input type="file" accept="image/*" id="feedImgI
    ```

---

## 3번 리뷰 : createElement - 요소 동적 생성

- 범위 : script.js의 line 61-96 참조

- 개요 : 각 페이지별로 API로 데이터를 받아 그려내는 부분 모두

### 리뷰 요청 내용

1. API로 동적으로 불러온 데이터를 innerHTML에 직접 넣어 사용하는 것이 편해서 이 방법을 선택했는데, 일반적인 방법이 맞는지 그리고 더 좋은 방법이 있는지 궁금합니다. 이런 식으로 전부 다 innerHTML에 넣어 사용해도 될까요?

2. 또한 이 부분에 있어서 css를 저희 팀에서는 생성되지 않은 클래스에 대해 .css파일에 미리 스타일을 정의해 두었는데 이렇게 하는 것이 일반적인지, 아니면 js에서 정의하는 것인지 궁금합니다.

3. 개별 이벤트(게시물 더보기 버튼 등)를 실행해야하는 요소들에 대해서 각각 증가하는 인덱스를 id값으로 부여하고 queryselectorAll을 사용하였는데 증가하는 인덱스를 id 값으로 사용하는 것이 적절한 방법이었는지 궁금합니다.

4. 개별 이벤트(게시물 더보기 버튼 등)를 실행해야하는 요소들에 대해서 각각 post.id, productId값(ex 61ef815086565c48677865e5) 을 class로 부여하고 getElementsByClassName을 사용하였는데 적절한 방법이었는지 궁금합니다.

---

## 4번 리뷰 : 파일 구조(분리), 응집도, 리팩토링 관련 질문

- 범위 : scripts 폴더 내 js 파일

- 전체 개요(scripts 폴더 구조)

(1) constants.js

- constant 파일
- API URL, origin URL, localStorage 정보

(2) initPage.js

- constants.js, api.js를 import
- 모든 html에 연결된 단일한 js 파일
- 각 html이 로드될 때 line 4-47에서 현재 로드된 페이지 정보를 확인하여 최초로 실행될 함수를 호출(5번 리뷰와 연결)

### 함수 정보

- checkToken() : 페이지가 로드될 때 로그인 여부 확인
- splashPage() : 메인 페이지에서 로그인 여부를 확인하여 페이지 이동
- loginPage() : 로그인 페이지에서 input이 적절한지 확인하여 로그인 실행
- joinPage() : 회원가입 페이지에서 유효성 검사, 프로필 설정 및 회원가입 실행
- searchPage() : 검색 페이지에서 input이 감지되면 getAccount()를 호출해 계정 정보 로드
- profilePage() : 프로필 페이지에서 내 프로필, 다른 사람의 프로필을 확인하여 프로필 정보와 팔로잉/팔로워 수 로드. 게시글 목록형/앨범형 기능 구현
- followPage() : 팔로잉/팔로워 페이지에서 계정 정보에 따른 getFollower() getFollowing() 호출
- profileModifyPage() : 프로필 수정 페이지에서 유효성 검사 후 수정 실행

(3) api.js

- constants.js, script.js를 import
- api 연동 관련 함수

### 함수 정보

- login() : 로그인
- checkEmailValid() : 이메일 검증
- checkUserIdValid() : ID 검증
- join() : 회원가입
- imageUpload() : 프로필 이미지 업로드
- loadUserData() : 프로필 정보 불러오기
- profileImage() : 프로필 이미지 함수
- updateProfile() : 프로필 업데이트
- getFeed() : 홈 피드 불러오기
- getAccount() : 검색된 계정 가져오기
- getProfile() : 프로필 피드 로드
- getProductList() : 판매중인 상품 리스트 로드
- getPost() : 프로필 피드 게시물 로드
- reportPost() : 게시글 신고
- deletePost() : 게시글 삭제
- editPost() : 게시글 수정
- getFollowing(): 팔로잉 목록 가져오기
- getFollower() : 팔로워 목록 가져오기
- getFollowProfile() : 팔로잉/팔로워 미니 프로필 가져오기
- followingCheck() : 팔로우 버튼 체크
- follow() : 팔로우
- unfollow() : 언팔로우
- deleteProduct() : 상품 삭제
- editProduct() : 상품 수정
- cancellikePost() : 좋아요 취소
- likePost() : 좋아요
- GetComment() : 댓글 로드
- editComment() : 댓글 수정
- deleteComment() : 댓글 삭제
- reportComment() : 댓글 신고

(4) script.js

- api.js를 import
- 범용적으로 사용되는 함수 (작은 프로필 불러오기, 게시물 로드, 이미지 스크롤, 좋아요/댓글, 모달)

### 함수 정보

- getMiniProfile() : 작은 프로필 정보 로드
- loadPost() : 개별 게시물 로드
- handleImageScroll() : 이미지 스크롤러 기능
- BtnLike() : 좋아요 버튼 이벤트
- BtnComment() : 댓글 버튼 이벤트
- 모달 관련 함수 (6번 리뷰)

### 리뷰 요청 내용

현재 저희 프로젝트의 JS 파일 구성은 위와 같습니다.  
목적에 따라 파일을 크게 분리하여 initPage.js 단일 파일만을 html에 연결하고 있습니다.  
위의 구조에서 파일을 어떻게 분리하여 결합도는 낮고 응집도는 높은 리팩토링을 진행할 수 있을지 팀내에서 결론이 나오지 않아 리뷰를 요청 드립니다.

---

## 5번 리뷰. SPA로 가고 싶으면 어떻게 알지 가이드라인

- 4번 리뷰의 (2)번(initPage.js line 4-47)은 추후 SPA로 프로젝트를 개선해나가고자 설계했습니다. 이 부분을 라우터로 발전시켜서 SPA로 개발하는 방향이 맞을까요? 그리고 그러기 위해서 node를 활용해야하는지도 궁금합니다. vanillaJS로 SPA를 구현하는 가이드라인에 대해 조언을 받아 저희의 프로젝트를 SPA로 완성시키고 싶습니다.

---

## 6번 리뷰 : 모달 로직

- 범위 :
  모달창(Modal), 모달확인창(ModalAlert)(4.home.html 26 ~ 40 line, 6.profile.html 121~141 line, modal.css)  
  화면 상단 nav바 더보기버튼(scrpit.js파일 197 ~ 227 line)
  close_alert(scrpit.js파일 228 ~ 239 line),  
  alert_message(scrpit.js파일 240 ~ 273 line),  
  close_modal(scrpit.js파일 275 ~ 284 line),  
  그 외 더보기버튼 getBtn(scrpit.js파일 286 ~ 369 line)

### 전체 개요 : 더보기버튼을 클릭하면 모달창이 열립니다.

### 기능 내용

1. 4.home.html

- 모달창과 모달알림창은 화면 하단에 숨겨져있다 open클래스가 생기면 상단으로 이동합니다. (ex) Modal.style.bottom = "-240px" => Modal.style.bottom = "-40px")

2. 6.profile.html

- 모달창과 모달알림창, 상단모달창은 화면 하단에 숨겨져있다 open클래스가 생기면 상단으로 이동합니다.
  화면 상단 nav바를 위한 모달창(topModal)이 추가되었습니다.

3. getBtn

- 모든 더보기버튼(btnMoreModal)을 클릭했을 때 모달창(Modal)에 open 클래스를 toggle합니다. open클래스가 없으면 Modal을 닫습니다.

4. close_modal

- Modal에 open클래스가 있을때 Modal 외의 부분을 클릭한다면 Modal을 닫습니다.

- btnMoreModal이 가진 클래스명(modal-my-edit: 내 게시글, modal-other-edit: 다른사람 게시글, modal-product: 내 상품, modal-my-comment: 내 댓글, modal-other-comment: 다른사람 댓글)에 따라 Modal을 엽니다. 클래스명에 따라 Modal이 오픈되는 정도가 다릅니다.(Modal.style.bottom = "-40px" or "-90px" or "-140px")
- btnMoreModal이 가진 클래스명에 따라 Modal의 버튼(btnOne,btnTwo) 텍스트를 변경합니다.(ex) btnOne: 삭제하기 => 신고하기)
- btnOne을 클릭한다면 alert_message 함수를 실행합니다.

5. alert_message

- 모달확인창(ModalAlert)을 열고, Modal을 닫습니다.
- 인자값에 따라 ModalAlert의 버튼(Alert_btnOne, Alert_btnTwo) 텍스트를 변경합니다.

6. close_alert
   - ModalAlert의 Alert_btnOne(취소 버튼)을 클릭하면 ModalAlert를 닫습니다. 모든 open클래스를 제거합니다.

- Alert_btnTwo(삭제, 신고)를 클릭하면 삭제(deletePost), 신고(reportPost)API함수를 실행한 뒤 ModalAlert를 닫고 Modal의 open클래스를 제거합니다. 화면을 새로고침합니다.
- btnTwo(수정하기)를 클릭한다면 수정페이지로 이동하고 수정API(editPost, editProduct)함수를 실행합니다.

- 화면상단 nav바를 위한 모달창(topModal)도 같은 방식으로 동작합니다.(198 ~ 227 line)

- 기타 :
  close_alert 함수가 324 line 케이스에선 적용이 안되어 직접 입력했습니다.
  댓글 관련 더보기버튼은(modal-my-comment, modal-other-comment) 구현중입니다.

### 리뷰 요청 내용

로직에 대해 리뷰 요청 드립니다.

---

## 7번 리뷰 : 모달 이외 클릭했을 때 모달 창 닫히게 하는 부분

- 범위 : close_modal(script.js파일 275 ~ 284 line, 303 line)

### 전체 개요 : 모달창 이외의 부분을 클릭하면 모달창을 닫습니다.

### 기능 내용

1. close_modal

- window를 두번째 클릭한 부분이 Modal이 아니라면, Modal을 아래로 숨기고 open 클래스를 제거합니다.
- 이벤트 버블링을 막기위해 true값을 추가

### 리뷰 요청 내용

313 line에 close_modal 함수가 없다면 더보기버튼을 처음 눌렀을 때 Modal에 open 클래스가 생성되고 모달창이 열리며, 더보기버튼을 두번째 눌렀을 때 open클래스가 제거되고 모달창이 닫힙니다. 하지만 더보기버튼 이외의 부분을 클릭한다면 모달창은 닫히지 않습니다.

반면 close_modal 함수가 있다면 window를 두번째 클릭한 부분이 모달창 이외의 부분이라면 open클래스가 제거되고 모달창이 닫힙니다. 이 때 window를 두번째 클릭한 부분이 더보기버튼이어도 open클래스가 제거되고 모달창이 닫혀야하는데, open클래스가 제거되지 않는 상황이 발생합니다. 이 문제를 어떻게 해결해야할지 모르겠어서 질문드립니다.

---

## 8번 리뷰 : 이와 같은 어플리케이션을 실제 서비스로 배포한다고 할 때, 코드 암호화 어떤 식으로 진행할 수 있을까요?
