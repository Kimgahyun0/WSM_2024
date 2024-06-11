// 현재 날짜를 저장하는 변수 선언
let currentDate = new Date();

// 날짜, 요일을 화면에 표시하는 함수
// 이걸 바로 실행해도 됨
const displayDate = () => {
    // 요일을 나타내는 문자열을 선언
    let days = "일월화수목금토";
    // 현재 월 가져오기 ( month는 0부터 시작해서 +1을 해줘야 함)
    let month = currentDate.getMonth() + 1;
    // 현재 날짜 가져오기
    let date = currentDate.getDate();
    // 현재 요일 가져오기 ( 0 : 일요일, 1 : 월요일)
    let day = currentDate.getDay();
    // days = days.split(""); // 일월화수목금토 -> ['일', '월', '화', ....]

    // 제목 텍스트를 변경
    const schoolfoodTitleHeader = document.getElementsByClassName("school-food-title")[0];
    const titleText = `🍚 ${days.charAt(day)}요일(${month}/${date})의 메뉴 🍚`
    schoolfoodTitleHeader.innerText = titleText;
}

// 로 해도 됨 파라미터 안넣어도 됨
// displayDate();

// A(pplication) 응용 SW
// p(rogramming) 개발
// I(nterface)

// 학교 급식 API를 이용해서 급식 정보 가져오자
const API_KEY = "cf94f5534f1d47eeb731c91ec78475ab";
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const ATPT_OFCDC_SC_CODE = "B10";
const SD_SCHUL_CODE = "7011569";
const TYPE = "json";

const getSchoolFoodMenu = (dateData) => {
    let api_url = `${URL}?\
KEY=${API_KEY}\
&Type=${TYPE}\
&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}\
&SD_SCHUL_CODE=${SD_SCHUL_CODE}\
&MLSV_YMD=${dateData}`;

    console.log(api_url);
    //동기 요청
    // 이 url을 넣으면 화면이 다바뀜
    // window.location.href = api_url;

    //비동기 요청
    //error 없이 응답오면, 데이터 처리
    //error 있으면, 에러 처리
    // 함수(파라1).then().catch() 원래는 이거

    // api_url에 비동기적으로 요청
    fetch(api_url)
        // 에러 없으면
        // response를 text에만 리턴
        // res, req 등
        .then((response) => response.json())
        // 학교 급식 정보를 HTML에 표시하자
        .then((data) => console.log(setShcoolFoodMenu(data)))
        // 에러 있으면
        .catch((error) => console.error(error))
}

// 학교 급식 정보 표시하자
const setShcoolFoodMenu = (data) => {
    // console.log(data);
    // HTML -> js 변수
    // console.log(data);
    const breakfastMenuUl = document.getElementsByClassName("menu breakfast")[0];
    const lunchMenuUl = document.getElementsByClassName("menu lunch")[0];
    const dinnerMenuUl = document.getElementsByClassName("menu dinner")[0];
    // 초기화 안하면, 기존 값이 남아있음 주의
    breakfastMenuUl.innerHTML = "<li>급식정보가 없습니다.<li/>";
    lunchMenuUl.innerHTML = "<li>급식정보가 없습니다.<li/>";
    dinnerMenuUl.innerHTML = "<li>급식정보가 없습니다.<li/>";

    // 확인용
    // console.log(breakfastMenuUl, lunchMenuUl, dinnerMenuUl);
    // 식사들 가져오자
    // data 적절히 처리 : 조식음식들, 중식음식들, 석식음식들
    // console.log(data);
    // console.log(data["mealServiceDietInfo"]);
    // console.log(data["mealServiceDietInfo"][1]["row"]);
    // 급식 정보가 없을 때, data["mealServiceDietInfo"]가 undefined로 나온다 그럼 나가자
    if (data["mealServiceDietInfo"] === undefined) return;
    const menuData = ("식사들 : ", data["mealServiceDietInfo"][1]["row"]);


    // 하니씩 꺼내자( 하니씩 꺼낸 걸 menuRow로 부르기)
    menuData.forEach((menuRow) => {
        // 음식 하나씩 <li>태그로 감싼 덩어리
        let menuFood = "";
        // console.log(menuRow);

        // 음식들 가져오자
        let menu = menuRow["DDISH_NM"];
        // menu : 음식 (1.2.3.)<br/>음식2.(s)<br/>음식3 (J)

        // 정규표현식 : 문자열의 규칙을 식으로 나타낸것
        // 정규표현식 : (...)찾아서 ""로 대체
        menu = menu.replace(/\([^()]*\)/g, "");
        // 정규표현식 :  .찾아서 ""로 대체
        menu = menu.replace(/\./g, "");
        menu = menu.replace(/\*/g, "");
        // 음식들 <br/> 태그로 나누자
        menu = menu.split("<br/>");
        // 하니씩 꺼내어 <li class="menu-food">하나의 꺼낸 음식</li> 
        menu.forEach((food) => {
            menuFood += `<li class="menu-food">${food}</li>\n`;

        });

        // js 변수 -> HTML 표시

        if (menuRow["MMEAL_SC_NM"] === "조식") {
            breakfastMenuUl.innerHTML = menuFood;
        }
        else if (menuRow["MMEAL_SC_NM"] === "중식") {
            lunchMenuUl.innerHTML = menuFood;
        }
        else if (menuRow["MMEAL_SC_NM"] === "석식") {
            dinnerMenuUl.innerHTML = menuFood;
        }
    });
    //console.log("식사들 : ", data["mealServiceDietInfo"][1]["row"]);
    // let breakfastMenu = "<li>밥</li><li>국</li>";
    // data 적절히 처리 : 조식 음식, 중식음식들, 석식음식들
};

// let 변우석 = {
//     'name': '변우석',
//     'age': 34,
//     'height': 189,
//     'filmography': ['선재업고튀어', '20세기 소녀'],
// }
// console.log(변우석.age);
// console.log(변우석["age"]);
// // 변수명으로 안되는 게 오면 안될 수 있음
// console.log(변우석.filmography);
// console.log(변우석["filmography"]);
// // error
// console.log(변우석.filmography[0]);
// console.log(변우석["filmography"][0]);

// 날짜 변경하고 화면에 표시하는 함수 작성
const changeDate = (diff) => { // -1,1
    // 현재 날짜에 diff만큼 더하거나 빼기
    currentDate.setDate(currentDate.getDate() + diff); // 현재 날짜에 -1, 1을 더하거나 빼고 
    // 변경된 날짜를 화면에 표시
    displayDate();

    // YYYYMMDD로 변환하고
    const dateData = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
    getSchoolFoodMenu(dateData);
}
// 페이지 열자마자 오늘날짜 구해서 표시하자
changeDate(0);