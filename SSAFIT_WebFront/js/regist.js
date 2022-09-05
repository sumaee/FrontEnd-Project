let Btn = document.querySelector("#regist");
Btn.addEventListener("click", function () {
    let Id = document.querySelector("#Id").value;
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let checkpassword = document.querySelector("#checkpassword").value;

    if (!(Id && name && email && password && checkpassword)) {
        alert("내용을 작성해주세요");
        return;
    } else if (password != checkpassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    } else {
        const user = {
            Id: Id,
            password: password,
            name: name,
            email: email,
          };
          
          let jsondata = JSON.parse(localStorage.getItem("users") || "[]");
          for (let u of jsondata) {
            if (u.Id == user.Id) {
              alert('이미 존재하는 아이디입니다.')
              return;
            }
          }
      
          jsondata.push(user);
          localStorage.setItem("users", JSON.stringify(jsondata));
          alert(`${user.name}님, 회원가입을 축하합니다!`);
          window.location.replace("login.html");
    }
});