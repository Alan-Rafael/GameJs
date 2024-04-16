
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    const gravidade = 2.9;

    let score = 0

    let morreu = new Image()
    morreu.src = ("images/morreu.png")

    let up = new Image()
    up.src = ("images/up.png")

    let lixera = new Image()
    lixera.src = ("images/lixoSimple.png")

    let city = new Image();
    city.src = "images/city.jpeg";

    let NovoPulo = new Image()
    NovoPulo.src = ("images/NovoPulo.png")

    let MegaMan = new Image();
    MegaMan.src = ("images/MegaMan.png");

    let arvo = new Image()
    arvo.src = ("images/arvo.png")

    let gameOver = new Image()
    gameOver.src = ("images/gameOver.png")

    let logintela = new Image()
    logintela.src = ("images/logintela.gif")

    let PosicaoX = 20, PosicaoY = 520;
    let posIniX =0, corteIniX = 0;
    let corteIniY = 0, larguraCorteX = 86;
    let alturaCortey = 179, numSprite = 0;
    let numSpries = 6, pula = false
    let limite = false, arvoreE = 640;
    let arvoreA = 520, fogueteE = 800;
    let fogueteA = 520, colisao = false;
    let comecarJogo = false;
    let pxLogin =0; let pyLogin =3;
    let contagem = 0; let numLogin = 2;
    let LargLogin = logintela.width
    px2 = 0; numof = 256; py2=223
    let lixoE = 780
    let lixoA= 520
    inicioDoJogo = true; let coletou

    function zerar(){
        PosicaoX = 20; PosicaoY = 520;
        posIniX =0; corteIniX = 0;
        corteIniY = 0; larguraCorteX = 86
        alturaCortey = 179; numSprite = 0;
        numSpries = 6; pula = false
        limite = false; arvoreE = 640
        arvoreA = 520; fogueteE = 800
        fogueteA = 520; colisao = false
        comecarJogo = false; lixoE = 780
        lixoA= 520; inicioDoJogo = true
        score = 0; updateScore(score)
    }
    function colisaoX(){
        enterFinal()
        PosicaoX -= 5
        if(PosicaoX <=0){
            PosicaoX = 0
        }
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.drawImage(city,0,0,canvas.width, canvas.height);
        ctx.drawImage(arvo, arvoreE, arvoreA, 80,80)
        ctx.drawImage(morreu, PosicaoX,PosicaoY,80,80)
        ctx.drawImage(gameOver, 100,100, 400,400)

    }

    let animaCorre = setInterval(()=>{
        if(colisao){
            comecarJogo = false
            colisaoX()
        }
        else if(comecarJogo){
            inicioDoJogo = false
             if(!pula && !colisao){
                run()
            }
            ControlJump();
        }else if(inicioDoJogo){
            contagem++
            switch(contagem){
                case 1:
                    pxLogin = 0
                    px2 +=numof
                    break
                case 2:
                    pxLogin = 269
                    px2 = 256
                    break
                default:
                    contagem = 0
                    px2 = 0
                    pxLogin = 0
                }
                ctx.drawImage(logintela, pxLogin, pyLogin, px2, py2,0,0,canvas.width, canvas.height);
            }
    }, 80)
    function fundo(){
        ctx.drawImage(city,0,0,canvas.width, canvas.height);
        arvore()
    }

    function arvore(){
        verifyIfLose()
        coletar()
        if(colisao == false && score <10){
         arvoreE-=gravidade*10
         lixoE -= gravidade*10
        }else if(colisao == false && score>=5){
            arvoreE -=gravidade*14
            lixoE -= gravidade*14
        }else if(colisao == false && score >=10){
            arvoreE -=gravidade*16
            lixoE -= gravidade*10
        }
        if(arvoreE <= -200 ){
            arvoreE=610
        }
        if(lixoE <= - 300){
           lixoE =  Math.floor(Math.random() * (1000 - 10 + 1)) + 610;
        }
        if(coletou){
            console.log("desnehou")
            ctx.drawImage(up, PosicaoX, PosicaoY, 50, 40)
        }
        ctx.drawImage(lixera, lixoE, lixoA, 80, 80)
        ctx.drawImage(arvo, arvoreE, arvoreA, 80,80)
    }

    function verifyIfLose(){
        if(arvoreE <= 90 && arvoreE >= 10 && !pula ){
            console.log("colidiu")
            colisao = true
        }
    }
    function coletar(){
        if( lixoE <=100 && lixoE>= 10  && !pula){
            coletou = true
            score +=1
            updateScore(score)
        }else{
            coletou = false
        }
    }

    function Jump(){
        if(limite == false && PosicaoY >=330){
            PosicaoY-=15*gravidade;
            ctx.clearRect(0,0, canvas.width, canvas.height)
            fundo();
            ctx.drawImage(NovoPulo,0,0,110,206, PosicaoX, PosicaoY, 80,80)

            if(PosicaoY <= 330){
                limite = true;
            }
        }

        else if(PosicaoY<= 520 && limite == true){
            PosicaoY+=15*gravidade
            ctx.clearRect(0,0, canvas.width, canvas.height)
            fundo();
            ctx.drawImage(NovoPulo,0,0,110,206, PosicaoX, PosicaoY, 80,80)

            if(PosicaoY>=520-50 && arvoreE <= 90 && arvoreE >= 10){
                colisao = true;
            }
            if(PosicaoY>=520){
                pula=false;
                keys.s.pressed = false;
                limite = false
            }
        }
    }

    function run(){   //CONTROLE DA TELA MOSTRADA
        numSprite++;
        if(numSprite>numSpries){
            numSprite = 1;
        }
        switch(numSprite){
            case 1:
                posIniX = 0; larguraCorteX = 86
            break;
            case 2:
                posIniX = 86; larguraCorteX = 98
            break;
            case 3:
                posIniX = 182;larguraCorteX = 142
            break;
            case 4:
                posIniX = 333;larguraCorteX = 100
            break;
            case 5:
                posIniX =431;larguraCorteX = 100
            break;
            case 6:
                posIniX = 545;larguraCorteX = 149
            break;

        }
        ctx.clearRect(0,0,canvas.width,canvas.height); fundo();
        ctx.drawImage(MegaMan, posIniX, 0,larguraCorteX, alturaCortey, PosicaoX,PosicaoY,80, 80 )
    }

    const keys = {
        s:{
            pressed: false
        },
        a: {
            pressed: false
        }
    }

    function ControlJump(){
        if(keys.s.pressed){
            pula = true
            Jump();
        }
    }
    function updateScore (score) {
        let scoreElement = document.getElementById('score')
        scoreElement.innerText = score
    }
    function enterFinal(){
        if(keys.a.pressed){
            zerar()
            comecarJogo = true
            colisao = false
            inicioDoJogo = false
        }
    }

    window.addEventListener('keydown', (e)=>{
        let key = e.key
        if(key === " "||key === "ArrowUp"){
            keys.s.pressed = true;
        }
    })

    window.addEventListener("keydown", (e)=>{
        let key = e.key
        if(key === "Enter"){
            keys.a.pressed = true;
        }
    })

    window.addEventListener("keyup", (e)=>{
        let key = e.key
        if(key === "Enter"){
            keys.a.pressed = false;
        }
    })

    window.addEventListener("click", startGame)
    function startGame(){
        comecarJogo = true
        ctx.clearRect(0,0,canvas.width, canvas.height)
        updateScore(0);

    }
