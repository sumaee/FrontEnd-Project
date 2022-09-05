let Btn = document.querySelector("#login");
Btn.addEventListener("click", function () {
    let Id = document.querySelector("#Id").value;
    let password = document.querySelector("#password").value;

    const jsondata = JSON.parse(localStorage.getItem("users"));

    if (!(Id && password)) {
        alert("아이디와 비밀번호를 입력해주세요");
        return;
    } else if (!jsondata) {
        alert("아이디가 존재하지 않거나 비밀번호가 틀렸습니다.");
        return;
    } else {
        for (let user of jsondata) {
            if (user.Id === Id && user.password === password) {
                let name = document.getElementById("Id").value;
                alert(`${name}님 환영합니다!`);

                window.location.replace("main.html");
                return;
            }
        }



    }
});