let Btn = document.querySelector("#registReview");
Btn.addEventListener("click", function () {
    let title=document.querySelector("#title").value;
    let content=document.querySelector("#content").value;
    let nickname=document.querySelector("#nickname").value;

    if(!(title && content&&nickname)){
        alert("내용 입력 바랍니다.");
        return;
    }else {
        const review={
            title:title,
            nickname:nickname,
            content:content
        };

        let reviewdata=JSON.parse(localStorage.getItem("reviews")||"[]");
        
        reviewdata.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviewdata));
        alert("댓글이 작성되었습니다.");
        window.location.replace("review.html");
    }
});

