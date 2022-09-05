const wishBtn = document.querySelector(".wish-button");

let wishList;

wishBtn.addEventListener("click",()=>{
    let curBtn = document.querySelector(".active");

    //버튼 액티브 상태 변경해주기
    if(curBtn.classList.contains("bi-heart")>0){
        document.querySelector(".bi-heart-fill").classList.add("active");
        curBtn.classList.remove("active");
    } else{
        document.querySelector(".bi-heart").classList.add("active");
        curBtn.classList.remove("active");
    }


})