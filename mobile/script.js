let timestamp = 0;

let bD = document.getElementById("done-button");
let goBtn = document.getElementById("button-go");
let codeLS = window.localStorage['code'];
let codeField = document.getElementById("_6digitcode");

if(codeLS != undefined){
  codeField.value = codeLS;
  goBtnClicked();
}

goBtn.addEventListener("click", function(){
  window.localStorage['code'] = codeField.value;
  goBtnClicked();
});

document.getElementById("btn-clear").addEventListener("click", () => {
  window.localStorage['code'] = "";
  document.getElementById("login-screen").style.display = "block";
  document.getElementById("vote-screen").style.display = "";
  window.location.reload();
});

document.getElementById("btn-support").addEventListener("click", () => {
  window.location.href = "https://t.me/vityaschel";
});

document.getElementById("btn-refresh").addEventListener("click", () => {
  if(window.localStorage['code'] != "" && window.localStorage['code'] != undefined){
    renew(window.localStorage['code']);
  } else {
    alert("Сначала авторизуйтесь");
  }
});
function renew(code){
  fetch('../renew.php?code='+code)
    .then(response => response.json())
    .then(data => {
      serverdata = data;
      switch(data.response){
        case "success":
            fetch('../ds.data?ts='+String(Date.now()))
              .then(response => response.text())
              .then(dataDS => {

                let bs_ = dataDS.split(";");
                document.getElementById("b1-t").innerText = bs_[0];
                document.getElementById("b2-t").innerText = bs_[1];
                document.getElementById("b3-t").innerText = bs_[2];

            fetch('../timestamp?ts='+String(Date.now()))
              .then(response => response.text())
              .then(dataTime => { timestamp = dataTime;

            document.getElementById("loading-screen").style.display = "";
            document.getElementById("vote-screen").style.display = "block";

            document.getElementById("timestamp").innerText = timest(timestamp);
            if(serverdata.voted){
              document.getElementById("warning").style.display = "block";

              let b;
              b = document.getElementById("b1");
              b.setAttribute("disabled", "disabled");
              if(serverdata.b1 == 0){
                b.removeAttribute("checked");
              }
              b = document.getElementById("b2");
              b.setAttribute("disabled", "disabled");
              if(serverdata.b2 == 0){
                b.removeAttribute("checked");
              }
              b = document.getElementById("b3");
              b.setAttribute("disabled", "disabled");
              if(serverdata.b3 == 0){
                b.removeAttribute("checked");
              }
              bD.setAttribute("disabled", "disabled");
            }});});
          break;

        case "fail":
          alert("Неправильный код");
          document.getElementById("loading-screen").style.display = "";
          document.getElementById("login-screen").style.display = "block";
          break;

        default:
          alert("Ошибка");
          document.getElementById("loading-screen").style.display = "";
          document.getElementById("login-screen").style.display = "block";
          break;
      }
    });
}

let serverdata;

function goBtnClicked() {
  let code = codeField.value;
  if(code.length != 6){ return; }

  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("login-screen").style.display = "";

  renew(code);
}

bD.addEventListener("click", function(){
  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("vote-screen").style.display = "";

  let code = codeField.value;
  let b1 = Number(document.getElementById("b1").checked);//биван)))))))))
  let b2 = Number(document.getElementById("b2").checked);
  let b3 = Number(document.getElementById("b3").checked);

  fetch('../vote.php?code='+code+'&b1='+b1+'&b2='+b2+'&b3='+b3)
    .then(response => response.json())
    .then(data => {
      if(data.response != "success"){alert("Ошибка");}
      else {
        document.getElementById("b1").setAttribute("disabled", "disabled");
        document.getElementById("b2").setAttribute("disabled", "disabled");
        document.getElementById("b3").setAttribute("disabled", "disabled");
        bD.setAttribute("disabled", "disabled");
      }
      document.getElementById("loading-screen").style.display = "";
      document.getElementById("vote-screen").style.display = "block";
    });
});

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
            case -1: tS+="Вс. "; break; // традиция
  }
  tS+=tt.getHours()+":"+tt.getMinutes();
  return tS;
}
