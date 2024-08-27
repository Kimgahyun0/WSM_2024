// 전역변수 데이터
let allData;

const showData = (data) => {
    //  data 하니씩 뽑아서 <article> -> .product-container의 자식으로 넣자 <- html
    const productContainerSection = document.getElementsByClassName("product-container")[0]

    articleString = "";
    data.forEach(element => {
        articleString += `            <article class="product-item">
                <img src="images/${element["image"]}" alt="${element.name}" class="product-image">
                <div class="product-name">${element.name}</div>
            </article>\n`;
    });
    console.log(articleString);

    productContainerSection.innerHTML = articleString;
}

const setData = (data) => {
    allData = data;
    showData(data);
    // showData(data);
    // // 무뚝뚝.webp 출력하자
    // console.log(data[3]["image"]);
    console.log(data[3]["image"])
    console.log(data[3].image);
    // // 허니버터칩 출력하자
    // console.log(data[9]["name"]);
    // console.log(data[9].name);
}
const getData = (() => {
    const url = 'js/data.json';
    fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
});
getData();

const searchData = (query) => {
    // console.log(query)
    // data 하나씩 꺼내어, name이랑 query랑 비교해서 있으면, 모아놓자
    let searchData = allData.filter((oneData) => oneData["name"].includes(query) || oneData["category"].includes(query));
    showData(searchData);
    allData.filter((oneData))

}
