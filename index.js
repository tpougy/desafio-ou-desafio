// use this link for production https://rawcdn.githack.com/thomazpougy/desafio-ou-desafio/94379cc6486f9c8a322fc5cffd11fa3caef5714e/index.js
//use this link for development https://raw.githack.com/thomazpougy/desafio-ou-desafio/main/index.js

// função que faz o shuffle de um array
Array.prototype.shuffle = function() {

let indice = this.length;

while(indice) {

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
function gera_ranNums(cartas_total) {
  let total = cartas_total.cartas.length;
  let nums = []
  for (i = 0; i < total; i++) {
      nums.push(i)
  }

  return nums.shuffle();
}

// função que implementa o texto do desafio no html
function definir_desafio(modo,seqAleat,cartas_total,complemento_aleatorio,x) {

  if(modo=="voltar"){
    x -= 1;
  }else{
  x += 1;
  }

  let y = seqAleat[x];
  
  let desafio_texto = cartas_total.cartas[y].desafio;
  let prenda_texto = cartas_total.cartas[y].prenda;

  if(cartas_total.cartas[y].tipo == "aleatorio"){
    let z = getRandomIntInclusive(0,6)
    desafio_texto = desafio_texto.replace("@",complemento_aleatorio.aleatorio[z].texto);
  }
  
  $("#desafio").html(desafio_texto);
  
  $("#prenda").text(prenda_texto);

}

// função que vira a carta
function virar() {
  if($("#carta").hasClass("estado1")){
    $("#carta").removeClass( "estado1" ).addClass( "estado0" );
  }else{
    $("#carta").removeClass( "estado0" ).addClass( "estado1" );
  }
}

// função que registra o clique no botao principal (proximo/anterior desafio)
function clicou(modo){
  virar();
  setTimeout(function(){
    definir_desafio(modo,ranNums,cartas_total,complemento_aleatorio,x);
  },850);
  
}

///////////////////// Event Triggers /////////////////////////////

// cartas selecionadas
$("#botao-jogar").click(function(){
  let seletor;

  if( $("#botao-jogar").text() == "Jogar!" ){
    $("#botao-jogar").text("Confirma?");
  }else{
    $("#seletor").css("display","none")
    $("#jogo").css("display","block")
    i = 0
    if($("#check-cafe").val()){
      data[i]=get_cartas_data("cafe")
      i++;
    }else if($("#check-fogo").val()){
      data[i]=get_cartas_data("fogo")
      i++;
    }else if($("#check-proibido").val()){
      data[i]=get_cartas_data("proibido")
      i++;
    }else if($("#check-ditador").val()){
      data[i]=get_cartas_data("ditador")
    }

    complemento_aleatorio=get_aleatorio()

    for(i=0;i<data.length();i++){
      cartas_total.push(data[i].cartas)
    }

    ranNums=gera_ranNums(cartas_total)
  }

});
  

$("#botao_desafio").one("click",function(){
  $("#botao_desafio").text("Próximo Desafio");
  $("#botao_voltar").fadeIn(400);
  setTimeout(function(){
    $("#desafio").css("font-weight", "normal")
  },850);
}).click(function(){
  clicou("proximo");
});


$("#botao_voltar").click(function(){

  if($("#botao_voltar").text() == "Voltar um desafio"){
    $("#botao_voltar").text("Confirma?")
  }else{
    if(x==0){
      $("#botao_voltar").text("Não há mais desafios para voltar");
      setTimeout(function(){
        $("#botao_voltar").text("Voltar um desafio");              
      }, 3000);
    }else{
      clicou("voltar");
      $("#botao_voltar").text("Voltar um desafio")
    }
  }

});


$("#botao-jogar").click(function(){
  if( $("#botao-jogar").text() == "Jogar!" ){
    $("#botao-jogar").text("Confirma?");
  }else{
    $("#seletor").css("display","none")
    $("#jogo").css("display","block")
  }
});

/////////////////////////////// Requisições /////////////////////////////


// requisição do dados das cartas
function get_cartas_data(ref){
  $.ajax({
    url: "https://tpougy.github.io/desafio-ou-desafio/data/"+ref+".json",
    type: "get",
    dataType: 'text',
    success: function(response) {
      return JSON.parse(response); // convert to object
    },
    error: function(err) {
      console.log(err);
    }
  });
};

// requisição do dados dos complementos aleatórios
function get_aleatorio() {
  $.ajax({
    url: "https://tpougy.github.io/desafio-ou-desafio/data/aleatorio.json",
    type: "get",
    dataType: 'text',
    success: function(response) {
      return JSON.parse(response); // convert to object;
    },
    error: function(err) {
      console.log(err);
    }
  });
};


////////////////////////// Execução /////////////////////////////////

// declaração das variáveis globais
var x = -1
var cartas_total
var complemento_aleatorio
var ranNums





  



  


