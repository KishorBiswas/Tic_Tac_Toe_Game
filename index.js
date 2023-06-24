let boxs = Array.from(document.getElementsByClassName("box"));
let header = document.querySelector(".header_text");
let resetBtn = document.querySelector("#reset");
let nextPlayer = document.getElementById("nextPlayer");


let areas = [null, null, null, null, null, null, null, null, null];
let o_tex = "O";
let x_text = "X";
let currentPlayer = o_tex;
let winBoxId = [];
let nextPlayerName = o_tex;



function bindBoxClick(){
    boxs.forEach((box) => {
        box.addEventListener("click", handelBoxClick);
    })
}

bindBoxClick();

function handelBoxClick(event){
    let id = event.target.id;
   

    // if the game is own one person then the all box are not clicked
    if(winBoxId.length > 0){
        return;
    }


    // if the box value is empty then the player value is pass in box
    if(!areas[id]){
        areas[id] = currentPlayer;
        event.target.innerHTML = currentPlayer;

        if(hasWonPlayer(currentPlayer)){
            header.innerHTML = `${currentPlayer} is Won the Game.`;
            header.style.backgroundColor = "#EA047E";
            changeWinBoxBG();
            return;
        }

       
        currentPlayer = currentPlayer === o_tex ? x_text : o_tex;
        nextPlayerName = nextPlayerName === o_tex ? x_text : o_tex;
        nextPlayer.innerHTML = nextPlayerName;
    }
}


function hasWonPlayer(player){
    if(areas[0] === player){
        if(areas[1] === player && areas[2] === player){
            winBoxId = [0,1,2];
            return true;
        }
        if(areas[3] === player && areas[6] === player){
            winBoxId = [0,3,6];
            return true;
        }
        if(areas[4] === player && areas[8] === player){
            winBoxId = [0, 4, 8];
            return true;
        }
    }

    if(areas[4] === player){
        if(areas[1] === player && areas[7] === player){
            winBoxId = [4,1,7];
            return true;
        }
        if(areas[3] === player && areas[5] === player){
            winBoxId = [4,3,5];
            return true;
        }
        if(areas[2] === player && areas[6] === player){
            winBoxId = [4, 2, 6];
            return true;
        }

    }

    if(areas[8] === player){
        if(areas[2] === player && areas[5] === player){
            winBoxId = [8,2,5];
            return true;
        }
        if(areas[6] === player && areas[7] === player){
            winBoxId = [8,6,7];
            return true;
        }
    }
}


function changeWinBoxBG(){
    winBoxId.forEach((id) => {
        boxs[id].style.backgroundColor = "lightgreen";
    })

    boxs.forEach((box) => {
        // box.removeEventListener(handelBoxClick);
        box.style.cursor = "not-allowed";
        
    })
}


resetBtn.addEventListener("click", reset);

function reset(){
    winBoxId = [];
    areas.forEach((value, index) => {
        areas[index] = null;
    })

    boxs.forEach((box) => {
        box.style.backgroundColor = "";
        box.innerHTML = "";
        box.style.cursor = "pointer";
    })

    header.innerHTML = "Lets play now....";
    header.style.backgroundColor = "";
}
