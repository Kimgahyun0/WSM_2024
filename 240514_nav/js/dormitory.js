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
console.log(pageDivs);

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
setPage(1)

