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


var i = 0;
var fim = false;
var n = 0;
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


// function countdown() {

//     $("#countdown").fadeIn("fast")
//     $("#countdown-img1").fadeIn("fast");
//     document.getElementById('beep').play();

//     $("#countdown-img1").delay(800).queue(function () {

//         $("#countdown-img2").fadeIn("fast");
//         document.getElementById('beep').play();
//         $("#countdown-img2").delay(800).queue(function () {

//             $("#countdown-img3").fadeIn("fast");
//             document.getElementById('beep').play();
//             $("#countdown-img3").delay(800).queue(function () {

//                 $("#countdown").css("display", "none");
//                 $(".img-count").css("display", "none");
//                 // document.getElementById('music').play();
//                 // $("#music").setPlaybackRate(3);
//             });
//         });
//     });
// };

function esquentando_pt1() {
    let interval = getRandomInt(7, 25);
    setTimeout(() => {
        $("#red-background").fadeIn(10000)
        esquentando_pt2();
    }, (interval - 10) * 1000);
};

var j = 0
function esquentando_pt2() {
    setTimeout(() => {

        // correção pq estava bugado tocando o som mais de uma vez
        j++
        if (j == 1) {
            $(".card-recomecar").fadeIn(150)
            fim = true;

            document.getElementById('timesup').play();
        }
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