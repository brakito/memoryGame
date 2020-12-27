// genera los niveles para el juego
function vectorFun(){
	let vector = [];
	let largeVector = [];
	let lengthActualVector = 3;
	let value;
	for(j = 0; j<20; j++){
		for(i = 0; i<Math.floor(lengthActualVector); i++){
			value = Math.ceil(Math.random() * 4);
			vector.push(value);
		}
		lengthActualVector += 0.5;
		largeVector.push(vector);
		vector = [];
	}
	return largeVector;
}
const levelsData = vectorFun()

// genera todas las instancias y variables globales
const celda1 = document.querySelector('#c1');
celda1.addEventListener("click", on);
const celda2 = document.querySelector('#c2');
celda2.addEventListener("click", on);
const celda3 = document.querySelector('#c3');
celda3.addEventListener("click", on);
const celda4 = document.querySelector('#c4');
celda4.addEventListener("click", on);
const button = document.querySelector(".button");
var level = 0;
var clickable = false;
var buttonActive = true;

//enciende una celda al tocarla y genera una variable con su id
function on(){
	if(clickable){
		let celdaActual = this;
		let numeroCelda = (parseInt(this.getAttribute("id")[1]));
		celdaActual.classList.add("active");
		// buttonActive = false;
		setTimeout(function(){
			celdaActual.classList.remove("active");
		}, 300); 
		compared("numeroClick", numeroCelda);
	}
}

//muestra el nivel que hay que repetir
let contador = 0;
function show(contenidoPuzzle){
	if (contador < contenidoPuzzle.length){
		clickable = false;
		buttonActive = false;
		setTimeout(function(){
			celda = contenidoPuzzle[contador];
			if (celda == 1) {
				celda1.classList.add("active")
			} else if (celda == 2) {
				celda2.classList.add("active")
			} else if (celda == 3) {
				celda3.classList.add("active")
			} else if (celda == 4) {
				celda4.classList.add("active")
			}
			ofDelay()
			contador++;
			show(contenidoPuzzle);
		}, 950);
	} else {
		contador = 0;
		clickable = true;
		buttonActive = false;
		control("nextLevel")
	}	
}

//retarda el apagado de la celda para que se entienda mejor la secuencia
function ofDelay(){
	setTimeout(function(){
		celda1.classList.remove("active");
		celda2.classList.remove("active");
		celda3.classList.remove("active");
		celda4.classList.remove("active");
	}, 600); 
}

//cada vez que se llama la funcion muestra el siguiente nivel
var actualLevel = [];
function levels(){
	const levelInfo = document.querySelector(".numero-nivel");
	level++;
	actualLevel = levelsData[level - 1];
	show(actualLevel);
	compared("level", actualLevel);
	levelInfo.innerHTML = `${level}`;
}

//controla el juego con un boton segun la etapa en que se encuentre
function control(event){
	if (event == "startGame") {
		button.innerHTML = "play";
		button.addEventListener("click", function(){
			if (level == 0) {
				levels();
				uiScreen("hidden");
			}
		});
	} else if (event == "nextLevel") {
		button.innerHTML = "next level";
		button.addEventListener("click",function(){
			if(buttonActive){
				levels();
				uiScreen("hidden");
			}
		});
	} else if (event == "gameOver"){
		button.innerHTML = "restart game";
		button.addEventListener("click",function(){
			location.reload();
		});
	}
}

// compara cada celda al tocarla con el index del nivel correspondiente
let celdaIndex = 0;
function compared(protocol, date){
	if (protocol == "level"){
		celdaIndex = 0;	
	} else if (protocol == "numeroClick"){ 
		if (date == actualLevel[celdaIndex]){
			if(actualLevel.length == (celdaIndex + 1)){
				buttonActive = true;
				clickable = false;
				uiScreen("nextLevel");
			}
			celdaIndex++;
		} else {
			celda1.style.backgroundColor = "#f00";
			celda2.style.backgroundColor = "#f00";
			celda3.style.backgroundColor = "#f00";
			celda4.style.backgroundColor = "#f00";
			setTimeout(function(){
				uiScreen("gameOver");
				control("gameOver")
			}, 1000);
		}
	}
}

function uiScreen(protocol){
	const uiScreenMessage = document.querySelector(".ui-screen");
	celda1.style.display = "none";
	celda2.style.display = "none";
	celda3.style.display = "none";
	celda4.style.display = "none";
	uiScreenMessage.style.display = "inline";

	if (protocol == "nextLevel") {
		uiScreenMessage.innerHTML = "Level complete";
		if(level == levelsData.length){
			uiScreenMessage.innerHTML = "Game over" + "<br>" + "you win";
			control("gameOver")
		}
	}
	else if (protocol == "startGame") {
		uiScreenMessage.innerHTML = "Memory game";
		control("startGame");
	}
	else if (protocol == "gameOver") {
		uiScreenMessage.innerHTML = "game over";
	}
	else if (protocol == "hidden") {
		celda1.style.display = "inline";
		celda2.style.display = "inline";
		celda3.style.display = "inline";
		celda4.style.display = "inline";
		uiScreenMessage.style.display = "none";
	}
}

uiScreen("startGame");