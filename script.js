var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

//carregar imagens
var bird = new Image();
bird.src = "images/bird.png";
var bg = new Image();
bg.src = "images/bg.png";
var canoBaixo = new Image();
canoBaixo.src = "images/canobaixo.png";
var canoCima = new Image();
canoCima.src = "images/canocima.png";
var chao = new Image();
chao.src = "images/chao.png";

//variaveis

//espaço entre os canos,maior espaço mais facil
var eec = 100;
var constant;
var bX = 33; 
var bY = 200;
var gravidade = 1.4;
var ponto = 0;

var cano = [];
cano[0] = {
    x : canvas.width,
    y : 0
}


//carregar sons
var fly = new Audio();
fly.src = 'sounds/fly.mp3';
var score = new Audio();
score.src = 'sounds/score.mp3';

//captura de tecla
document.addEventListener('keydown',voa);
//voando
function voa(){
    bY = bY - 26;
    fly.play();
}
//inicia o jogo
function jogo(){
    //fundo do jogo
    ctx.drawImage(bg,0,0);
    //criando canos
    for(var i = 0; i < cano.length; i++){
        //posição do cano de baixo
        //altura do cano de baixo sera a do cano de cima mais um espaço
        constant = canoCima.height + eec;
        //cano cima
        ctx.drawImage(canoCima, cano[i].x, cano[i].y);
        //cano de baixo
        ctx.drawImage(canoBaixo, cano[i].x, cano[i].y + constant);
        //movimentação do cano
        cano[i].x = cano[i].x - 1;

        if(cano[i].x == 125){
            //push adicionar mais elemento no array cano
            cano.push({
                x : canvas.width,
                y : Math.floor(Math.random()*canoCima.height)-canoCima.height
            })
        }
        //passaro entre as bordas dos canos
        if(bX+bird.width >= cano[i].x && bX <= cano[i].x+canoCima.width
            //passaro colidiu com o cano de cima ou cano de baixo
            && (bY <= cano[i].y+canoCima.height || bY+bird.height >= cano[i].y+constant)
            //passaro bateu no chao
            || bY+bird.height >= canvas.height - chao.height){
            location.reload();
        }

        //marcar ponto
        if(cano[i].x == 5){
            ponto = ponto+1;
            score.play();
        }
    }
    
    //chao
    ctx.drawImage(chao,0,canvas.height - chao.height);
    //passaro
    ctx.drawImage(bird,bX,bY);
    bY+=gravidade;
    
    //placar
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Placar: "+ponto, 10, canvas.height-20);
    //tipo set interval mas sem chamar milisegundos
    requestAnimationFrame(jogo);
}

jogo();