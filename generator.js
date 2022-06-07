//Types of characters to include in password generation
let letters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let special = "!@#$%^&*()-_=+`~[{]};:'\",<.>/?\\|";

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
    }else if(length < 10){
        error += "You must select a password longer than 10 characters\n";
    }else if(length > 80){
        error += "You must select a password shorter than 80 characters\n";
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
        generate(chars, length);
    }else{
        document.getElementById("error").innerText = error;
    }
}

//Generates password
function generate(chars, length){
    let password = "";
    for(let x = 0; x < length; x++){
        password += chars.charAt(Math.random() * chars.length);
    }
    document.getElementById("password").value = password;
}

console.log(chars);