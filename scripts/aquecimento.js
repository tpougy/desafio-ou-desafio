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

// função que gera a sequencia de numeros aleatórios
function gera_ranNums(comandos_recebidos) {
    let total = comandos_recebidos.length;
    let nums = []
    for (k = 0; k < total; k++) {
        nums.push(k)
    }

    return nums.shuffle();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// função que gera um numero inteiro aleatorio inclusivo entre dois números
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var i = 0;
var fim = false;
var n = 0;
var j = 0
var ranNums

$("#proxima-batata").click(() => {
    if (n == 0) {
        n++;
        countdown();
        $(".titulo-aquecimento").hide();
        $("#proxima-batata").text("Próximo");
        $("#texto-aquecimento").show();
    }
    if (fim != true) {
        $("#texto-aquecimento").text(data.comandos[ranNums[i]].texto);
        if (i >= 2) {
            esquentando_pt1();
        }
        i++
    }
});

$("#btn-recomecar").click(() => {
    $(".card-recomecar").fadeOut(500);
    $("#red-background").fadeOut(500);

    ranNums = gera_ranNums(data.comandos);
    i = 0;
    j = 0
    n = 0;
    fim = false;
    $("#texto-aquecimento").text(" ");
    $("#proxima-batata").text("Iniciar");
});

function countdown() {
    // Parte 1
    $("#countdown").fadeIn("fast")
    $("#countdown-img1").fadeIn("fast");
    document.getElementById('beep').play();

    setTimeout(() => {
        // Parte 2
        $("#countdown-img2").fadeIn("fast");
        document.getElementById('beep').play();

        setTimeout(() => {
            // Parte 3
            $("#countdown-img3").fadeIn("fast");
            document.getElementById('beep').play();

            setTimeout(() => {
                // Parte 4
                $("#countdown").css("display", "none");
                $(".img-count").css("display", "none");

            }, 800)


        }, 800)

    }, 800)

};



function esquentando_pt1() {
    let interval = getRandomInt(7, 25);
    setTimeout(() => {
        $("#red-background").fadeIn(10000)
        if (j == 0) {
            esquentando_pt2();
            j++;
        }
    }, (interval - 10) * 1000);
};


function esquentando_pt2() {
    console.log("passou " + j.toString())
    setTimeout(() => {

        // correção pq estava bugado tocando o som mais de uma vez

        numShots = getRandomIntInclusive(1, 3)
        if (numShots == 1) {
            $(".titulo-recomecar").text("Quem está segurando toma " + numShots + " shot!")
        } else {
            $(".titulo-recomecar").text("Quem está segurando toma " + numShots + " shots!")
        }
        console.log("entrou " + j.toString())
        $(".card-recomecar").fadeIn(150)
        fim = true;


        document.getElementById('timesup').play();

    }, 12 * 1000);
}


// requisição do dados dos complementos aleatórios
$.ajax({
    url: "https://tpougy.github.io/desafio-ou-desafio/data/aquecimento.json",
    type: "get",
    dataType: 'text',
    success: function (response) {
        data = JSON.parse(response); // convert to object;
        ranNums = gera_ranNums(data.comandos);
    },
    error: function (err) {
        console.log(err);
    }
});