// 달력

// 현재 날짜 구하자
let currentDate = new Date();

const setCalendarHeader = (date) => {
    // 연도 구하자
    const year = currentDate.getFullYear()
    // 달 구하자
    console.log(year)
    const month = currentDate.getMonth()

    titleString = `${year}년 ${month + 1}월`;
    const calendarHeaderH1 = document.querySelector("#calendar-header h1");
    calendarHeaderH1.innerHTML = titleString;

}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    setCalendarHeader(currentDate);
}

// 이전 달 버튼 이벤트 처리하자
const prevMonthButton = document.getElementById('prev-month');
// ()는 익명함수
// .addEventLister("click", console.log('이전 달')) 하면 안돼ㅐㅐㅐㅐㅐconsole.log()함수 실행한 결과를 클릭해쓸 때 실행하는 거야. 즉 아무일도 안해
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

}
// 첫날에 요일 구하자
// 마지막 날짜 구하자
// 마지막 날의 요일 구하자

// 이전 달 뒷날짜 구하자

// 다음 날 앞날짜 구하자


setCalendarHeader(currentDate);