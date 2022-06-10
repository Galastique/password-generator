//Types of characters to include in password generation
let letters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let special = "!@#$%^&*()-_=+`~[{]};:'\",<.>/?\\|";
let generated = false;
let copied = false;

//Generates string of every character to use in generation
function getValues(){
    //Variables
    let error = "";
    let chars = "";
    let length;
    let l;
    let n;
    let s;

    //Gets values
    length = document.getElementById("length").value;
    l = document.getElementById("letters").value;
    n = document.getElementById("numbers").value;
    s = document.getElementById("special").value;

    //Generates characters included in password + error codes
    //Length
    if(isNaN(length)){
        error += "You must enter a valid password length\n";
    }else if(length == ""){
        error += "You must enter a password length\n";
    }else if(length < 20){
        error += "Your password must be at least 20 characters long\n";
    }else if(length > 120){
        error += "Your password must not be longer than 120 characters\n";
    }

    //Letters
    if(l == "lower"){
        chars += letters;
    }else if(l == "upper"){
        chars += letters.toUpperCase();
    }else if(l == "both"){
        chars += letters;
        chars += letters.toUpperCase();
    }else if(l == "choose"){
        error += "You must select an option for letters\n";
    }

    //Numbers
    if(n == "true"){
        chars += numbers;
    }else if(n == "choose"){
        error += "You must select an option for numbers\n";
    }

    //Special
    if(s == "true"){
        chars += special;
    }else if(s == "choose"){
        error += "You must select an option for special characters\n";
    }

    //Other
    if(l == "none" && n == "false" && s == "false"){
        error += "You must choose at least 1 option to generate a password";
    }

    //Proceeds if no errors are found
    if(error == ""){
        document.getElementById("error").innerText = "";
        generate(chars, Math.floor(length));
    }else{
        document.getElementById("error").innerText = error;
        animate("error");
    }
}

//Generates password
function generate(chars, length){
    let password = "";
    for(let x = 0; x < length; x++){
        password += chars.charAt(Math.random() * chars.length);
    }
    document.getElementById("password").value = password;
    generated = true;
    copied = false;
}

//Copies password to clipboard
function copy(){
    //Does not copy if password hasnt been generated
    if(!generated){
        return
    }

    //Copies password
    let copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    //Displays confirmation
    let tooltip = document.getElementById("success");
    tooltip.innerHTML = "Password copied to clipboard successfully!";
    animate("success");
    copied = true;
}

//Error message fade out animation
function animate(field){
    document.getElementById(field).classList.remove("fadeOut");

    setTimeout(function(){
        document.getElementById(field).classList.add("fadeOut");
    }, 1);
}

//Asks user if they want to leave if they havent copied their password yet
function leaving(){
    if(generated && !copied){
        alert("You haven't copied your generated password. Are you sure you would like to leave?");
    }
}

//
let visible = false;
function view(){
    if(!visible){
        document.getElementById("password").type = "text";
        visible = true;
    }else{
        document.getElementById("password").type = "password";
        visible = false;
    }
}