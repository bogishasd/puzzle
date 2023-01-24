var redovi = 3;
var kolone = 3;

var currTile;
var otherTile;

var broj_poteza = 0;
window.onload = function(){


    //inicijalizacija 3x3 table
    for(let r = 0;r<redovi;r++){
        for(let k=0;k<kolone;k++){
            let tile = document.createElement("img");
            tile.src="./materijal/prazno.jpg"

            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);
            document.getElementById("delovi").append(tile);
            document.getElementById("tabla").append(tile);
        }
    }




    //delovi
    let delovi = []
    for (let i=0;i<redovi*kolone;i++){
        delovi.push(i.toString());
    }

    delovi.reverse();
    for(let i=0;i<delovi.length;i++){
        let j=Math.floor(Math.random() * delovi.length);

        //zamena
        let tmp=delovi[i];
        delovi[i]=delovi[j];
        delovi[j]=tmp;
    }

    for (let i=0;i<delovi.length;i++){
        let tile=document.createElement("img");
        tile.src="./materijal/" + delovi[i] + ".jpg"

        //Drag funkcija
        tile.addEventListener("dragstart",dragStart);
        tile.addEventListener("dragover",dragOver);
        tile.addEventListener("dragenter",dragEnter);
        tile.addEventListener("dragleave",dragLeave);
        tile.addEventListener("drop",dragDrop);
        tile.addEventListener("dragend",dragEnd);
        document.getElementById("delovi").append(tile);
    }
}



function dragStart(){
    currTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this;
}

function dragEnd(){
    if (currTile.src.includes("prazno")){
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    broj_poteza += 1;
    document.getElementById("brpoteza").innerText=broj_poteza;
}



