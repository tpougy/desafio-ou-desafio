// use this link for production https://rawcdn.githack.com/thomazpougy/desafio-ou-desafio/94379cc6486f9c8a322fc5cffd11fa3caef5714e/index.js
//use this link for development https://raw.githack.com/thomazpougy/desafio-ou-desafio/main/index.js

// função que faz o shuffle de um array
Array.prototype.shuffle = function () {

  let indice = this.length;

  while (indice) {

    const indiceAleatorio = Math.floor(Math.random() * indice--);
    [this[indice], this[indiceAleatorio]] =
      [this[indiceAleatorio], this[indice]];
  }

  return this;
}

// função que gera um numero inteiro aleatorio inclusivo entre dois números
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// função que gera a sequencia de numeros aleatórios
function gera_ranNums(desafios_recebidos) {
  let total = desafios_recebidos.length;
  let nums = []
  for (i = 0; i < total; i++) {
    nums.push(i)
  }

  return nums.shuffle();
}

// função que implementa o texto do desafio no html


function definir_desafio(modo) {

  if (modo == "voltar") {
    x -= 1;
  } else {
    x += 1;
  }

  let y = ranNums[x];

  let desafio_texto = desafios[y];
  let prenda_texto = prendas[y];

  if (desafio_texto.indexOf("@") != -1) {
    let z = getRandomIntInclusive(0, 6)
    desafio_texto = desafio_texto.replace("@", complemento_aleatorio.aleatorio[z].texto);
  }

  $("#desafio").html(desafio_texto);

  $("#prenda").text(prenda_texto);

}

// função que vira a carta
function virar() {
  if ($("#carta").hasClass("estado1")) {
    $("#carta").removeClass("estado1").addClass("estado0");
  } else {
    $("#carta").removeClass("estado0").addClass("estado1");
  }
}

// função que registra o clique no botao principal (proximo/anterior desafio)
function clicou(modo) {
  virar();
  setTimeout(function () {
    definir_desafio(modo, ranNums, complemento_aleatorio, x);
  }, 850);

}

///////////////////// Event Triggers /////////////////////////////

$("#check-cafe").click(function () { if (JSON.parse($(this).val())) { $(this).val("false") } else { $(this).val("true") } });

$("#check-fogo").click(function () { if (JSON.parse($(this).val())) { $(this).val("false") } else { $(this).val("true") } });

$("#check-proibido").click(function () { if (JSON.parse($(this).val())) { $(this).val("false") } else { $(this).val("true") } });

$("#check-ditador").click(function () { if (JSON.parse($(this).val())) { $(this).val("false") } else { $(this).val("true") } });

// cartas selecionadas

$("#botao-jogar").click(function () {

  if ($("#botao-jogar").text() == "Jogar!") {
    $("#botao-jogar").text("Confirma?");
  } else {
    $("#seletor").css("display", "none")
    $("#jogo").css("display", "block")

    if (JSON.parse($("#check-cafe").val())) {
      for (i = 0; i < cartas_total.cafe.length; i++) {
        desafios.push(cartas_total.cafe[i].desafio)
        prendas.push(cartas_total.cafe[i].prenda)
        tipos.push(cartas_total.cafe[i].tipo)
      };
    };

    if (JSON.parse($("#check-fogo").val())) {
      for (i = 0; i < cartas_total.fogo.length; i++) {
        desafios.push(cartas_total.fogo[i].desafio)
        prendas.push(cartas_total.fogo[i].prenda)
        tipos.push(cartas_total.fogo[i].tipo)
      };
    };

    if (JSON.parse($("#check-proibido").val())) {
      for (i = 0; i < cartas_total.proibido.length; i++) {
        desafios.push(cartas_total.proibido[i].desafio)
        prendas.push(cartas_total.proibido[i].prenda)
        tipos.push(cartas_total.proibido[i].tipo)
      };
    };

    if (JSON.parse($("#check-ditador").val())) {
      for (i = 0; i < cartas_total.ditador.length; i++) {
        desafios.push(cartas_total.ditador[i].desafio)
        prendas.push(cartas_total.ditador[i].prenda)
        tipos.push(cartas_total.ditador[i].tipo)
      };
    };

    ranNums = gera_ranNums(desafios)

  };

});


$("#botao_desafio").one("click", function () {
  $("#botao_desafio").text("Próximo Desafio");
  $("#botao_voltar").fadeIn(400);
  setTimeout(function () {
    $("#desafio").css("font-weight", "normal")
  }, 850);
}).click(function () {
  clicou("proximo");
});


$("#botao_voltar").click(function () {

  if ($("#botao_voltar").text() == "Voltar um desafio") {
    $("#botao_voltar").text("Confirma?")
  } else {
    if (x == 0) {
      $("#botao_voltar").text("Não há mais desafios para voltar");
      setTimeout(function () {
        $("#botao_voltar").text("Voltar um desafio");
      }, 3000);
    } else {
      clicou("voltar");
      $("#botao_voltar").text("Voltar um desafio")
    }
  }

});


/////////////////////////////// Requisições /////////////////////////////


// requisição do dados das cartas
$.ajax({
  url: "https://tpougy.github.io/desafio-ou-desafio/data/cartas.json",
  type: "get",
  dataType: 'text',
  success: function (response) {
    cartas_total = JSON.parse(response); // convert to object

    $("#num-cartas-cafe").text((cartas_total.cafe.length - 1).toString() + " cartas");
    $("#num-cartas-fogo").text((cartas_total.fogo.length - 1).toString() + " cartas");
    $("#num-cartas-proibido").text((cartas_total.proibido.length - 1).toString() + " cartas");
    $("#num-cartas-ditador").text((cartas_total.ditador.length - 1).toString() + " cartas");

  },
  error: function (err) {
    console.log(err);
  }
});


// requisição do dados dos complementos aleatórios
$.ajax({
  url: "https://tpougy.github.io/desafio-ou-desafio/data/aleatorio.json",
  type: "get",
  dataType: 'text',
  success: function (response) {
    complemento_aleatorio = JSON.parse(response); // convert to object;
  },
  error: function (err) {
    console.log(err);
  }
});


////////////////////////// Execução /////////////////////////////////

// declaração das variáveis globais
var x = -1;

var desafios = [];
var prendas = [];
var tipos = [];

var ranNums;
