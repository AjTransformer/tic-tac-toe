let btn = document.querySelectorAll(".btns");
let msg = document.querySelector("#msg");
let container = document.querySelector("#container");
let newBtn = document.querySelector("#newGame");
let turn0 = true;
let reset = document.querySelector("#reset");
let result = document.querySelector(".result");
let data = document.querySelector("#data");
let dataButton = document.querySelector("#btn");
let displayResult = document.querySelector("#displayResult");
let refresh = document.querySelector("#refresh");
let clickCount = 0;
let tableStatus = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startANewGame = () => {
    console.log("new game");
    turn0 = true;
    enableBoxes();
    result.classList.add("hide");
    clickCount = 0;
    tableStatus = false;
    showTable();
};

const enableBoxes = () => {
    for (let button of btn) {
        button.innerText = "";
        button.disabled = false;
    }
};

const disableBoxes = () => {
    for (let button of btn) {
        button.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    result.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = "Game Draw";
    result.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let buttonPattern of winPatterns) {
        const pos1 = btn[buttonPattern[0]].innerText;
        const pos2 = btn[buttonPattern[1]].innerText;
        const pos3 = btn[buttonPattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                let winner;
                if (pos1 === "0") {
                    winner = "A";
                    if(dataFromStorage!=null){
                        dataFromStorage.playerA += 1;
                    }else{
                        dataFromStorage.playerA = 1;
                    }
                    
                } else {
                    winner = "B";
                    if(dataFromStorage!=null){
                        dataFromStorage.playerB += 1;
                    }else{
                        dataFromStorage.playerB = 1;
                    }
                }
                showWinner(winner);
                if(dataFromStorage!=null){
                    dataFromStorage.matchesPlayed += 1;
                }else{
                    dataFromStorage.matchesPlayed = 1;
                }
                // dataFromStorage.matchesPlayed += 1;
                localStorage.setItem("statatics", JSON.stringify(dataFromStorage));
                loadTableData();
                return true;
            }
        }
    }
    return false;
};

btn.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("button clicked");
        if (turn0) {
            button.innerText = "0";
            button.style.color = "green";
            turn0 = false;
        } else {
            button.innerText = "X";
            button.style.color = "red";
            turn0 = true;
        }
        clickCount++;
        button.disabled = true;
        let status = checkWinner();
        if (clickCount === 9 && !status) {
            dataFromStorage.matchesPlayed += 1;
            dataFromStorage.draw += 1;
            localStorage.setItem("statatics", JSON.stringify(dataFromStorage));
            gameDraw();
            loadTableData();
        }
    });
});

const showTable = () => {
    if (tableStatus) {
        data.classList.remove("hide");
        refresh.classList.remove("hide");
        tableStatus = false;
    } else {
        data.classList.add("hide");
        refresh.classList.add("hide");
        tableStatus = true;
    }
};

const refreshStorage = ()=>{
    localStorage.clear();
    loadingStorage();
    loadTableData();
}

dataButton.addEventListener("click", showTable);
newBtn.addEventListener("click", startANewGame);
reset.addEventListener("click", startANewGame);
refresh.addEventListener("click",refreshStorage);