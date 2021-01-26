

let altura = 0, largura = 0, vidas = 1,pontos = 0,tamanhoMosquito, criarMosquitoTempo = 1500;

let nivel = window.location.search; //search é usado para buscas
nivel = nivel.replace('?','');

if(nivel === 'normal'){
    criarMosquitoTempo = 1500;
    tempo = 30;
    //1500 milisec
}

else if(nivel === 'dificil'){
    //1000
    criarMosquitoTempo = 1000;
    tempo = 18;
}

else if(nivel === 'chucknorris'){
    //750

    criarMosquitoTempo = 750;
    tempo = 12;
}


function ajustaTamanhoPalcoJogo(){
     altura = window.innerHeight; 
     largura = window.innerWidth    
}

ajustaTamanhoPalcoJogo();//função usada para reorganizar os elementos da página a depender do dispositivo

let cronometro = setInterval(() => {

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html';
    }
    else{
        document.getElementById('cronometro').innerHTML = tempo;
        
    }

},1000)


function posicaoRandomica(){

    

    let acessPoints = document.querySelector('span#points');//inicia a pontuação como zero

    tempo--;
    //remover o mosquito anterior(caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html';
        }
        else{
            document.getElementById('v' + vidas).src = 'imagens/imagens/coracao_vazio.png'
        }

        vidas++;
    }

    else{
        tamanhoMosquito = GeraTamanhoMosquito()

        let posicaoX = Math.floor(Math.random()* largura) - 90;
        let posicaoY = Math.floor(Math.random()* altura) - 90;


        posicaoX = posicaoX < 0 ?0 :posicaoX;
        posicaoY = posicaoY < 0 ?0 :posicaoY;

        //criar o elemento HTML 

        let mosquito =  document.createElement('img');
        
        mosquito.src = 'imagens/imagens/mosca.png'
        mosquito.style.left = posicaoX + 'px';
        mosquito.style.top = posicaoY + 'px';
        mosquito.style.position = 'absolute';
        mosquito.id = 'mosquito'
        mosquito.onclick = () => {
            document.getElementById('mosquito').remove()
            
            if(tamanhoMosquito == 'mosquito1'){
                pontos += 10;
            }

            else if(tamanhoMosquito == 'mosquito2'){
                pontos += 5;
            }

            else if(tamanhoMosquito == 'mosquito3'){
                pontos += 2
            }
            acessPoints.textContent = `${pontos}`; 
        }

        document.body.appendChild(mosquito)
        mosquito.className =    tamanhoMosquito + ' ' + ladoAleatorio();
        
    }    
}

let GeraTamanhoMosquito = () => {
   let classe = Math.floor(Math.random()*3);
   
    switch(classe){
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    let classe = Math.floor(Math.random()*2);

    switch(classe){
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}