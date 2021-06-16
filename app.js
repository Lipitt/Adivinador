//OBJETIVOS
//el usuario debe ingresar un numero entre un minimo y un maximo
//el usuario tiene un numero fijo de intentos
//avisar de los intentos restantes y del resultado.
//permitir jugar nuevamente

//declaro variables del juego
let min = 1,
  max = 10,
  //obtengo un numero aleatorio entre los dos valores ingresados usando getRandomNum
  numGanador = numAleatorio(min, max),
  intentos = 3;

//elementos de la interfaz
const mainForm = document.querySelector("#mainForm"),
  juego = document.querySelector(".juego"),
  btnIngresar = document.querySelector("#btnIngresar"),
  numMin = document.querySelector("#numMin"),
  numMax = document.querySelector("#numMax"),
  valorIngresado = document.querySelector("#valorIngresado"),
  mensajeResultado = document.querySelector(".mensaje");

//asigno el numero minimo y maximo de la interfaz
numMin.textContent = min;
numMax.textContent = max;

//event listener para jugar de nuevo. simplemente recarga la pagina si el juego ya termino
mainForm.addEventListener("submit", function (e) {
  if (e.target.className === "jugar-de-nuevo") {
    window.location.reload();
  }
});

//event listener para cuando se ingresa un valor
mainForm.addEventListener("submit", adivinar);

//esta funcion toma el numero generado aleatoriamente y lo compara con el ingresado.
function adivinar() {
  event.preventDefault();
  //paso el valor ingresado a integer
  let numIngresado = parseInt(valorIngresado.value);
  //muestro el valor en consola, en caso de que quiera saber de antemano cual es el valor
  console.log(numGanador);

  //si el valor ingresado es validado, continuo
  if (validar(numIngresado) === true) {
    //si el valor ingresado coincide con el numero aleatorio, se gana el juego y termina.
    if (numIngresado === numGanador) {
      juegoTerminado(
        true,
        `Adivinaste! ${numGanador} era la respuesta correcta`
      );
    } else {
      //si la adivinanza es incorrecta, se resta un intento
      intentos -= 1;
      if (intentos === 0) {
        //si los intentos llegan a 0, se pierde el juego y termina.
        juegoTerminado(
          false,
          `Perdiste! La respuesta correcta era ${numGanador}`
        );
      } else {
        ponerMensaje(
          `${numIngresado} No es correcto. Quedan ${intentos} intentos`,
          "black"
        );
      }
    }
  } else {
    //en caso de que la validacion sea incorrecta, se pide ingresar un valor aceptable
    ponerMensaje(`Ingrese un numero del ${min} al ${max}`, "red");
  }
}

//esta funcion valida solamente numeros entre 1 y 10
function validar(numIngresado) {
  const regex = /^(10|[1-9]{1})$/;
  return regex.test(numIngresado);
}
//esta funcion setea los mensajes de resultado de la funcion adivinar, tambien cambiando el color del texto
function ponerMensaje(texto, color) {
  mensajeResultado.textContent = texto;
  mensajeResultado.style.color = color;
}

//esta funcion se llama cuando termina el juego. los parametros son un booleano y un string
function juegoTerminado(gano, mensaje) {
  //dependiendo de si es verdadero o falso, cambiamos el color del texto
  gano === true ? (color = "green") : (color = "red");
  valorIngresado.disabled = true;
  valorIngresado.style.borderColor = color;
  //cambiamos el texto y clase del boton para que se dispare el evento de recargar la pagina la proxima vez que se le haga click
  btnIngresar.textContent = "Jugar de nuevo!";
  mainForm.className = "jugar-de-nuevo";
  ponerMensaje(mensaje, color);
}

//genero un numero aleatorio entre los valores asignados previamente
function numAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
