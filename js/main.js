
let main = document.getElementById("site-main");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let gamebar = document.getElementById("game-bar");

signup.remove();
gamebar.remove();

function openLogin(){
    main.appendChild(login);
    signup.remove();
    gamebar.remove();
}

function openRegister(){
    login.remove();
    main.appendChild(signup);
    gamebar.remove();
}

function openGame(){
    login.remove();
    signup.remove();
    main.appendChild(gamebar);
}

var credentails = [
    {name: "siva", pass: "jey"}   
]

function loginSubmit(){
    var name = document.getElementById("lname").value;
    var pass = document.getElementById("lpass").value;
    var obj = {"name": name, "pass": pass};
    
    var flag = false;
    for(let i=0;i<credentails.length;i++)
    {
        if(credentails[i].name == name && credentails[i].pass == pass)
            flag = true;
    }    
    
    if(flag)
    {
        alert("Login Successful!.");
        openGame();
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

function gameOn(){
    alert('Lets Play');
}