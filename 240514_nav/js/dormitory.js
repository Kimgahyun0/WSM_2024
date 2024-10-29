//초기 설정에 필요한 모든 데이터: 세탁기, 시간, 호실
let allData;
//미리 정해진 요일별 예약 데이터
let weeklyReservation;

// selection-item 요소들 가져오자
const selectionItemDivs = document.getElementsByClassName("selection-item");

// 네 개의 페이지 요소 가져오자.
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");


// console.log(calendarDiv);
// console.log(selectionWashingmachineTimeDiv);
// console.log(selectionRoomNameDiv);
// console.log(boardDiv);

const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];
// console.log(pageDivs);


// 초기 데이터 가져오자. allData.json, weekly-reservation.json
const initData = () => {
    const getAllData = () => {
        // 원래는 백엔드 url이 들어가야함
        const url = 'js/allData.json';
        fetch(url)
            .then(response => response.json())
            .then(data => allData = data)
            .catch(error => console.log(error.message));
    }

    const getWeeklyReservation = async () => {
        const url = 'js/weekly-reservation.json';
        try {
            const response = await fetch(url);
            const data = await response.json();
            weeklyReservation = data;
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    getAllData();
    getWeeklyReservation();

    // getWeeklyReservation();
}


// 무조건 1페이지가 아님.
const setPage = (page) => {
    // clear selelction
    for (const selectionItemDiv of selectionItemDivs) {
        selectionItemDiv.classList.remove("select-menu");
    }

    // 세탁기 예약 현황표는 selection이 없음
    if (page != 4) {
        // selection 칠하자
        selectionItemDivs[page - 1].classList.add("select-menu");
    }

    // clear pageDiv
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    });

    // show pageDiv 1
    pageDivs[page - 1].style.display = "block";
}

initData();
setPage(1)

