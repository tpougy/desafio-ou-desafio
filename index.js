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

$.ajax({
    url: "https://raw.githubusercontent.com/thomazpougy/desafio-ou-desafio/main/cartas.json",
    type: "get",
    dataType: 'text',
    success: function(response) {
      if (!response)
        return;
  
      data_cartas = JSON.parse(response); // convert to object
      
      var total = data_cartas.cartas.length;
      var nums = []
      for (i = 0; i < total; i++) {
          nums.push(i)
      }

      ranNums=nums.shuffle();

      x=-1
      function definir_desafio(voltar) {

        if(voltar){
          x -= 1;
        }else{
        x += 1;
        }

        y = ranNums[x];
            
        desafio_texto = data_cartas.cartas[y].desafio;
        prenda_texto = data_cartas.cartas[y].prenda;

        if(data_cartas.cartas[y].tipo == "aleatorio"){
          z = getRandomIntInclusive(0,6)
          desafio_texto = desafio_texto.replace("@",data_aleatorio.aleatorio[z].texto);
        }
        
        $("#desafio").html(desafio_texto);
        
        $("#prenda").text(prenda_texto);

        return;
        
      }

      function virar() {
        if($("#carta").hasClass("estado1")){
          // document.getElementById("carta").className = "estado1"
          $("#carta").removeClass( "estado1" ).addClass( "estado0" );
        }else{
          // document.getElementById("carta").className = "estado0"
          $("#carta").removeClass( "estado0" ).addClass( "estado1" );
        }
        
      }

      function clicou(voltar){
        virar();
        setTimeout(function(){
          definir_desafio(voltar);
        },850);
        
      }

      $("#botao_desafio").one("click",function(){
        $("#botao_desafio").text("Próximo Desafio");
        $("#botao_voltar").fadeIn(400);
        setTimeout(function(){
          $("#desafio").css("font-weight", "normal")
        },850);
      }).click(function(){
        clicou(false);
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
            clicou(true);
            $("#botao_voltar").text("Voltar um desafio")
          }
        }

        
        
      });

    },
    error: function(err) {
      console.log(err);
    }
  });

$.ajax({
  url: "https://raw.githubusercontent.com/thomazpougy/desafio-ou-desafio/main/aleatorio.json",
  type: "get",
  dataType: 'text',
  success: function(response) {
    if (!response)
      return;

    data_aleatorio = JSON.parse(response); // convert to object;
  },
  error: function(err) {
    console.log(err);
  }
});