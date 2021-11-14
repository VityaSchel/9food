let selects = document.querySelectorAll("select");
let getRes = document.getElementById("get-results");
for (var i = 0; i < selects.length; i++) {
  selects[i].addEventListener("change", function(){
    if(this.selectedOptions[0].value.includes("other")){
      this.setAttribute("val", prompt("Название блюда"));
    } else if(this.selectedOptions[0].value.includes("nothing")) {
      this.removeAttribute("val");
    } else {
      this.setAttribute("val", this.selectedOptions[0].innerText);
    }
  });
}

getRes.addEventListener("click", function() {
  let password = window.localStorage["password"];
  if(password == undefined){
    password = prompt("Введите пароль");
    window.localStorage["password"] = password;
  }
  // password protected on server by sha512 encryption
  if(data != ""){
    displayResults();
    return;
  }
  fetch('/results.php?password='+password)
    .then(response => response.json())
    .then(data_ => {
      try {
        switch(data_.response){
          case "incorrect":
            getRes.open = false;
            alert("Пароль неправильный");
            password = prompt("Введите пароль");
            window.localStorage["password"] = password;
            getRes.click();
            break;

          case "success":
            data = data_;
            displayResults();
            break;

          default:
            getRes.open = false;
            alert("Ошибка");
            break;
        }
      } catch {
        alert("Ошибка");
      }
    });
});

let data = "";
function displayResults() {
  let res_b1 = data.b1;
  let res_b2 = data.b2;
  let res_b3 = data.b3;
  let res_voted = data.voted;
  let res_perc = data.perc.substr(0,4);
  document.getElementById("results-class").
   innerText = `Первое блюдо: ${res_b1}
                Второе блюдо: ${res_b2}
                Напиток: ${res_b3}
                Всего проголосовало: ${res_voted}, ${res_perc}% от класса
                `;
}

document.getElementById("button-done").addEventListener("click", function(){
  let password = window.localStorage["password"];
  if(password == undefined){
    password = prompt("Введите пароль");
    window.localStorage["password"] = password;
  }
  // password protected on server by sha512 encryption
  let b1 = encodeURI(document.getElementById("record1").getAttribute("val"));
  let b2 = encodeURI(document.getElementById("record2").getAttribute("val"));
  let b3 = encodeURI(document.getElementById("record3").getAttribute("val"));
  fetch('/submit.php?b1='+b1+'&b2='+b2+'&b3='+b3+'&password='+password)
  .then(response => response.json())
  .then(data => {
    try {
      switch(data.response){
        case "incorrect":
          alert("Пароль неправильный");
          password = prompt("Введите пароль");
          window.localStorage["password"] = password;
          document.getElementById("button-done").click();
          break;

        case "success":
          alert("Успешно отправлено");
          updateLastDay();
          break;

        default:
          alert("Ошибка");
          break;
      }
    } catch {
      alert("Ошибка");
    }
  });
});

function sha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  });
}

updateLastDay();
function updateLastDay() {
  let lastDay = [];
  document.getElementById("last-day-table").innerHTML = "";
  fetch('/ds.data?ts='+String(Date.now()))
    .then(response => response.text())
    .then(data => {
      let resp = data.split(";");
      for (var i = 0; i < 3; i++) {
        lastDay.push(resp[i].split("\n")[0]);
      }
      for (var i = 0; i < 3; i++) {
        let r = document.createElement("tr");
        let d1 = document.createElement("td");
        let d2 = document.createElement("td");
        d1.innerText = i==0?"Первое блюдо":i==1?"Второе блюдо":"Напиток";
        d2.innerText = lastDay[i];
        r.appendChild(d1);
        r.appendChild(d2);
        document.getElementById("last-day-table").appendChild(r);
      }
    });

  fetch('/timestamp?ts='+String(Date.now()))
    .then(response => response.text())
    .then(data => {
      document.getElementById("last-timestamp").innerText = timest(data);
    });

}

function timest(t) {
  let tt = new Date(t*1000);
  let tS = "";
  switch(tt.getDay()-1){
            case 0: tS+="Пн. "; break;
            case 1: tS+="Вт. "; break;
            case 2: tS+="Ср. "; break;
            case 3: tS+="Чт. "; break;
            case 4: tS+="Пт. "; break;
            case 5: tS+="Сб. "; break;
            case -1: tS+="Вс. "; break;
  }
  tS+=tt.getHours()+":"+tt.getMinutes();
  return tS;
}
