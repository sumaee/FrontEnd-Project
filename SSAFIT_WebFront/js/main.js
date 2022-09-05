
let videoList;

//최근 가장 많이 본 영상 관련 변수
const multieSlideTag = document.querySelector(".multie-slide-area");
let slide, slideCount,
    currentIdx = 0,
    slideWidth = 300,
    slideMargin = 30,
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next');

//부위별 운동 영상 관련 변수
const partVideoContainer = document.querySelector('.part-video-container');
let curActive = document.querySelector(".filter-total.filter-active");

const createCard = (videoItem) => {
    //우선 card tag 만든다.
    let cardTag = document.createElement("div");
    cardTag.className = "card";

    //thumbnail 가져와서 자르고 카드 헤드 이미지로 넣어준다.
    let cropDiv = document.createElement("div");
    cropDiv.className = "card-img-crop";
    let imgTag = document.createElement("img");
    imgTag.src = videoItem.thumbnail;
    imgTag.className = "card-img-top";
    cropDiv.appendChild(imgTag);
    cardTag.appendChild(cropDiv);

    //카드 바디를 생성한다.
    let cardBodyTag = document.createElement("div");
    cardBodyTag.className = "card-body";

    //카드 바디에 들어갈 타이틀을 생성한다. 만약 22자가 넘어갈 경우 뒷부분을 ... 처리해준다.
    let cardTitleTag = document.createElement("div");
    if (videoItem.title.length < 22) {
        cardTitleTag.innerText = videoItem.title;
    } else {
        cardTitleTag.innerText = videoItem.title.substring(0, 22) + "...";
    }
    cardTitleTag.className = "card-title";
    cardBodyTag.appendChild(cardTitleTag);

    //카드 바디에 들어갈 채널명을 생성한다.
    let cardChannelTag = document.createElement("div");
    cardChannelTag.innerText = videoItem.channelName;

    //카드 바디에 들어갈 운동 파트 태그를 생성한다. 파트에 따라 다른 클래스를 적용한다.
    let cardPartTag = document.createElement("div");
    cardPartTag.classList.add("card-part");
    if (videoItem.part == "전신") {
        cardPartTag.classList.add("part-total");
    } else if (videoItem.part == "상체") {
        cardPartTag.classList.add("part-upper");
    } else if (videoItem.part == "하체") {
        cardPartTag.classList.add("part-bottom");
    } else {
        cardPartTag.classList.add("part-belly");
    }
    cardPartTag.innerText = videoItem.part;

    cardBodyTag.appendChild(cardTitleTag);
    cardBodyTag.appendChild(cardChannelTag);
    cardBodyTag.appendChild(cardPartTag);

    cardTag.appendChild(cardBodyTag);

    return cardTag;
}

const loadData = () => {
    axios.get("data/video.json")
        .then((response) => {
            //json을 가져와서 videos 배열에 집어넣는다.
            return videoList = response.data;
        })
        .then((response) => {
            //각 유튜브 썸네일 가져와서 넣어준다.
            videoList.forEach(element => {
                let idx = element.id;
                element.thumbnail = "https://img.youtube.com/vi/" + idx + "/0.jpg";
            });
        })
        .then((response) => {
            //videoItem들에 대해 card 태그를 만들어 multie slide 내부에 붙인다.
            videoList.forEach(element => {
                let liTag = document.createElement("li");
                liTag.append(createCard(element));
                multieSlideTag.appendChild(liTag);
            })
            //multie slide를 위한 변수를 세팅해준다.
            slide = document.querySelectorAll('.multie-slide-area li'),
                slideCount = slide.length
            multieSlideTag.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';
        })
        .then((response) => {
            if (partVideoContainer) {
                //일단 무조건 액티브인 전신 운동 리스트 가져다놓기
                sortVideo("전신");
              }
        })
}

function moveSlide(num) {
    multieSlideTag.style.left = -num * 330 + 'px';
    currentIdx = num;
}

window.addEventListener("load", loadData);

nextBtn.addEventListener('click', function () {
    if (currentIdx < slideCount - 3) {
        moveSlide(currentIdx + 1);
    } else {
        moveSlide(0);
    }
});

prevBtn.addEventListener('click', function () {
    if (currentIdx > 0) {
        moveSlide(currentIdx - 1);
    } else {
        moveSlide(slideCount - 3);
    }
});

let partTotalBtn = document.querySelector(".filter-total"),
partUpperBtn = document.querySelector(".filter-upper"),
partLowerBtn = document.querySelector(".filter-lower"),
partBellyBtn = document.querySelector(".filter-belly");

const sortVideo = (filter) => {
    partVideoContainer.innerHTML = "";
    videoList.forEach(element => {
        if(element.part==filter){
            let elementCard = createCard(element);
            partVideoContainer.appendChild(elementCard);
        }
    });
}

const changeActive = (targetBtn) => {
    curActive.classList.remove("filter-active");
    targetBtn.classList.add("filter-active");
    curActive = targetBtn;
};

partTotalBtn.addEventListener("click",function (){
    //액티브 상태로 바꾸고
    changeActive(partTotalBtn);

    //소팅해서 보여준다.
    sortVideo("전신");
});

partUpperBtn.addEventListener("click",function (){
    //액티브 상태로 바꾸고
    changeActive(partUpperBtn);

    //소팅해서 보여준다.
    sortVideo("상체");
});

partLowerBtn.addEventListener("click", function (){
    //액티브 상태로 바꾸고
    changeActive(partLowerBtn);

    //소팅해서 보여준다.
    sortVideo("하체");
});

partBellyBtn.addEventListener("click",function (){
    //액티브 상태로 바꾸고
    changeActive(partBellyBtn);

    //소팅해서 보여준다.
    sortVideo("복부");
});
