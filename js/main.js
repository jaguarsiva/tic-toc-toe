
let main = document.getElementById("site-main");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let gamebar = document.getElementById("game-bar");
let gamepage = document.getElementById("game-page");

window.onload = function (){
    openLogin();
}

function openLogin(){
    main.innerHTML= '';
    main.appendChild(login);
}

function openRegister(){
    main.innerHTML= '';
    main.appendChild(signup);
}

function openGameBar(){
    main.innerHTML= '';
    main.appendChild(gamebar);
}

var credentails = [
    {name: "siva", pass: "jey"}   
]

function loginSubmit(){
    var name = document.getElementById("lname").value;
    var pass = document.getElementById("lpass").value;
    
    var flag = false;
    for(let i=0;i<credentails.length;i++)
        if(credentails[i].name == name && credentails[i].pass == pass)
        {
            flag = true;
            break;
        }    
    
    if(flag)
    {
        alert("Login Successful!.");
        openGameBar();
    }
    else
        alert("Incorrect Credentials");
}


function registerSubmit(){
    var name = document.getElementById("Rname").value;
    var pass = document.getElementById("Rpass").value;
    var obj = {"name": name, "pass": pass};
    credentails.push(obj);
    alert("Signup Successfull!.\nLogin to Continue");
    openLogin();
}

var player1,player2;

function gameOn(){
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;
    alert('Lets Play'+' '+player1+' and '+player2);
    openGamePage();
}

var controlflow,turn;
var spinbtn = document.getElementById("spin-btn");
var spintxt = document.getElementById("spin-txt");
var turntxt = document.getElementById("turn-text");

var spinSound = document.createElement('audio');
spinSound.src = '../audios/spin.mp3';

var startSound = document.createElement('audio');
startSound.src = '../audios/play.ogg';

function openGamePage()
{
    controlflow = 0;
    main.innerHTML= '';
    main.appendChild(gamepage);
    document.getElementById("player1name").innerHTML = '💚 Player 1 :  ' + player1
    document.getElementById("player2name").innerHTML = '💔 Player 2 :  ' + player2
    turntxt.remove();
}

function spinIt()
{
    spinSound.play();
    setTimeout(function(){
        turn = Math.floor((Math.random() * 2) + 1);
        spinbtn.setAttribute('onclick','playIt()');
        spinbtn.innerHTML = 'Start to Play 🚩';
        
        if(turn==1)
        spintxt.innerHTML = player1+' Starts First';
        else
        spintxt.innerHTML = player2+' Starts First';
    
        spintxt.classList.add('text-uppercase')
        controlflow = 1;
    },1000);
}

function playIt()
{
    startSound.play();
    spintxt.remove()
    spinbtn.remove()   
    document.getElementById('turntxt-box').appendChild(turntxt);
    if(turn==1)
        turntxt.innerHTML = player1+'\'s turn now';
    else
        turntxt.innerHTML = player2+'\'s turn now';
    controlflow = 2;
}

function cellClicked(event)
{
    if(controlflow == 0)
    {
        alert("Spin to Play")
        return;
    }
    
    if(controlflow == 1)
    {
        alert("Click the Start to play button ")
        return;
    }

    if(event.target.innerHTML != "")
    {
        var wrongSound = document.createElement('audio');
        wrongSound.src = '../audios/wrong.wav';
        wrongSound.play();     
        return;
    }

    if(turn == 1)
    {
        event.target.innerHTML = "💚";
        turn = 2;
        turntxt.innerHTML = player2+'\'s turn now';
    } 
    else
    {
        event.target.innerHTML = "💔";       
        turn = 1;
        turntxt.innerHTML = player1+'\'s turn now';
    }

    var correctSound = document.createElement('audio');
    correctSound.src = '../audios/correct.mp3';
    correctSound.play();
    cellCheck()
}

var cells,winner;
const obj = document.getElementsByClassName('game-cell')

function cellCheck()
{
    cells = [
        obj[0].innerHTML,
        obj[1].innerHTML,
        obj[2].innerHTML,
        obj[3].innerHTML,
        obj[4].innerHTML,
        obj[5].innerHTML,
        obj[6].innerHTML,
        obj[7].innerHTML,
        obj[8].innerHTML
    ]
    
    var Full = true
    for(let i=0;i<9;i++)
        if(cells[i] != '💔' && cells[i] != '💚')
        {
            Full = false;
            break;
        }
    
    if(Full)
    {
        alert("Games Ends in a draw")
        return;
    }    
    
    var arr1=[],arr2=[];
    for(let i=0;i<9;i++)
    {
        if(cells[i] == '💔')
            arr1.push(i)
        else if(cells[i] == '💚')
            arr2.push(i)
    }

    if(3 <= arr1.length)
        if(checkArrayEquality(arr1))
        {
            setTimeout( function(){
                alert(player1+" Won!..."); 
               }, 250);
            winner = player1;
            pushWinner();
        }    
        
        
        if(3 <= arr2.length)
        if(checkArrayEquality(arr2))
        {
            setTimeout( function(){
                alert(player2+" Won!..."); 
               }, 250);
            winner = player2;
            pushWinner();
        }    
}

function checkArrayEquality(arr){
    const winscenario = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    
    for(let i=0;i<8;i++)
    {
        var count = 0;
        let win = winscenario[i]
        if( arr.length == 3 && JSON.stringify(win) ==  JSON.stringify(arr) )
            return true;

        for(let j=0;j<3;j++)
        {
            if(isPresent(win[j],arr))
                count++;
        }
        
        if(count == 3)
            return true;
    }
    return false;
}

function isPresent(ele,array){
    for(let i=0;i<array.length;i++)
        if(array[i] == ele)
            return true;
    return false;
}

function pushWinner(){
    turntxt.innerHTML = "Hurray! "+winner+" won the Game";
    document.getElementsByClassName('boxtable')[0].setAttribute('style','pointer-events:none;')
    setTimeout( function(){
        let cnfrmMSG = confirm("Do You want to replay!");
        if(cnfrmMSG)
        restartGame(); 
    }, 4000);
}

function restartGame()
{
    document.getElementById('spintxt-box').appendChild(spintxt);   
    document.getElementById('spinbtn-box').appendChild(spinbtn);
    turntxt.remove();
    spinbtn.setAttribute('onclick','spinIt()');
    spinbtn.innerHTML = 'Spin 🎲';
    for(let i=0;i<9;i++)
        obj[i].innerHTML = '';
    document.getElementsByClassName('boxtable')[0].removeAttribute('style')
    openGamePage();
}