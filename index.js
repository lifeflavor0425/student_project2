const computer = [];
let strikeCount;
let ballCount;
let nothing;
let count = 0;
// 컴퓨터의 랜덤한 숫자 3개
function computerNumbers() {
  while (computer.length < 3) {
    let number = Math.floor(Math.random() * 9) + 1;
    if (!computer.includes(number)) {
      computer.push(number);
    }
  }
}

// 숫자 입력
function numbersInput() {
  let input = document.querySelector("#inputNumber").value;
  error(input);
  strikeCount = 0;
  ballCount = 0;
  nothing = 0;
  // 스트라이크, 볼, 낫싱 체크
  computer.map((e, i) => {
    if (input.includes(e)) {
      return input.indexOf(e) === i ? strikeCount++ : ballCount++;
    } else nothing++;
  });
  gamePlay(input);
}

// 게임 실행
function gamePlay(input) {
  award();
  count += 1;
  let div = document.createElement("div");
  let result = document.querySelector("#result");
  // 3스트라이크일 경우
  if (strikeCount === 3) {
    div.innerHTML = `<h1>축하합니다!</h1>아웃 : ${count} </br>
    ${input} : 3스트라이크
    <hr>`;
    result.appendChild(div);
    return;
  }
  // 아무것도 해당이 안될 경우
  else if (nothing === 3) {
    div.innerHTML = `아웃 : ${count}  </br>
    ${input} : <span class="nothing">낫싱</span> <hr>`;
    result.appendChild(div);
    return;
  } else if (ballCount > 0 || strikeCount > 0) {
    div.innerHTML = `아웃 : ${count} </br>
    ${input} : <span class="ball">${ballCount}</span>볼 <span class="strike">${strikeCount}</span>스트라이크 <hr>`;
    result.appendChild(div);
    return;
  }
  return gamePlay();
}
function award() {
  if (count < 6 && strikeCount === 3) {
    document.write(
      `<h1>축하합니다! 운이 좋으시군요!</h1> 아웃 : ${count} </br> <span class="strike">${strikeCount}</span>스트라이크 <hr>
      <img src="./image/starbucks.png"> <h1>쿠폰 받아가세요!</h1>`
    );
  }
}
function error(input) {
  let set = new Set(input);
  let duplication = [...set];
  if (isNaN(Number(input))) {
    alert("문자가 아닌 숫자를 입력해 주세요!");
    window.location.href = "/";
  } else if (input.length < 3) {
    alert("3개의 숫자를 입력해주세요!");
    window.location.href = "/";
  } else if (duplication.length < 3) {
    alert("중복된 숫자는 안됩니다!");
    window.location.href = "/";
  }
}
computerNumbers();
