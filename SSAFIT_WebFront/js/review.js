window.addEventListener("load", function () {

    const review = JSON.parse(localStorage.getItem("reviews"));

    if (review) {
        for (let i = 0; i < review.length; i++) {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            th.innerText = i + 2;
            th.scope = "row";
            th.className = "reviewNum";
            td1.innerText = review[i].title;
            td1.className = "reviewContent";
            td2.innerText = review[i].nickname;
            td2.className = "nickname";

            tr.appendChild(th);
            tr.appendChild(td1);
            tr.appendChild(td2);

            let tbody = document.querySelector(".table-group-divider");
            tbody.appendChild(tr);
        }
    }

})