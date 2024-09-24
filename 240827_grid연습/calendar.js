// 달력
const calendarContainerDiv = document.querySelector("#calendar-container");
// 현재 날짜 구하자
let currentDate = new Date();

const setCalendarHeader = (date) => {
    // 연도 구하자
    const year = currentDate.getFullYear();
    // 달 구하자
    console.log(year)
    const month = currentDate.getMonth()

    titleString = `${year}년 ${month + 1}월`;
    const calendarHeaderH1 = document.querySelector("#calendar-header h1");
    calendarHeaderH1.innerHTML = titleString;
    setCalendar(currentDate);

}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    setCalendarHeader(currentDate);
    // return 값 없음
}

// Id로 가져오는 방법 querySelector로 가져오는 방법 시험에 나옴....필수
// 이전 달 버튼 이벤트 처리하자
const prevMonthButton = document.getElementById('prev-month');
// ()는 익명함수
// .addEventLister("click", console.log('이전 달')) 하면 안돼ㅐㅐㅐㅐㅐconsole.log()함수 실행한 결과를 클릭해쓸 때 실행하는 거야. 즉 아무일도 안해
// 뒤에 있는 파라미터의 함수 이름을 실행 함수 ㅣㅇ름에 괄호를 붙여서 실행을 함
// 이렇게 하면 return 값이 없기 때문에 undefined
// prevMonthButton.addEventListener("click", changeMonth(-1));

prevMonthButton.addEventListener("click", () => changeMonth(-1));


function say() {
    console.log('이전 달');
}
// 다음 달 버튼 이벤트 처리하자
const nextMonthButton = document.querySelector("#next-month");
nextMonthButton.onclick = () => changeMonth(1);
// console.log('다음 달')

// 일 구하자
const setCalendar = (date) => {
    // ctrl + shift + K : 한 줄 지우기
    const year = date.getFullYear();
    const month = date.getMonth();

    // 첫날에 요일 구하자 : 이전달 뒷 날짜 쓰기 위하여
    const firstDay = new Date(year, month, 1).getDay(); // 0 : 일,  6 : 토

    // 마지막 날짜 구하자 : 요일 구하기 위하여
    // 실제 마지막 날짜는 lastDate.getDate()해야한다. 
    const lastDate = new Date(year, month + 1, 0);
    // console.log(lastDate.getDate());

    // 마지막 날의 요일 구하자 : 다음달 앞 날짜 쓰기 위하여
    const lastDay = lastDate.getDay();
    // console.log(lastDate);

    // 일월화수목금토
    // const weekNameString = `<div class="item week-name">일</div>
    //         <div class="item week-name">월</div>
    //         <div class="item week-name">화</div>
    //         <div class="item week-name">수</div>
    //         <div class="item week-name">목</div>
    //         <div class="item week-name">금</div>
    //         <div class="item week-name">토</div>`;

    let weekNameString = "";
    const weekNames = "일월화수목금토";
    // ["일", "월", "화", "수", "목", "금", "토"]
    const weekNamesArray = weekNames.split("");
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`
    });


    calendarContainerDiv.innerHTML = weekNameString;
    // 이전 달 뒷날짜 구하자
    // 0 ~ 이번달 1일의 요일-1까지 이전달 마지막 날짜 - 이번달 1일의 요일 + 1(시작날짜)부터 +1해서 쓰자

    // 문자열로 넣느냐 객체로 넣는지의 차이
    // 이번달 날짜들 쓰자 : 1 ~ 30 : 1 ~ lastDate.getDate()
    // let dateString = "";
    // for (let date = 1; date <= lastDate.getDate(); date++) {
    //     dateString += `<div class="item">${date}</div>`;
    // }
    // calendarContainerDiv.innerHTML += dateString;
    // div 요소 만들자, class에 item 넣자, text에 날짜 넣자, calendarContainerDiv에 자식으로 붙이자
    for (let date = 1; date <= lastDate.getDate(); date++) {
        //                              <div></div>가 생겼다
        let currentMonthDateDiv = document.createElement("div");
        //                              <div class="item"></div>
        currentMonthDateDiv.className = "item";
        //                              <div class="item">1</div>
        currentMonthDateDiv.textContent = date;
        //                              <div id="calendar-container"><div class="item">1</div></div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);
    }
    // 다음 날 앞날짜 구하자
    // 이번달 마지막 날의 요일+1 ~ 6까지 1부터 차례대로 날짜 쓰자

    // 1 ~ 30(이번달 날짜들)
    // 1 ~ 5(다음달 날짜들)
}

setCalendarHeader(currentDate);
setCalendar(currentDate);