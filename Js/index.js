function signin(){
    var signinInput = document.getElementById("signin");
    var inputEmail = signinInput.elements.namedItem("email").value;
    var inputPswd= signinInput.elements.namedItem("pswd").value;
    var isExist = false;
    var getUsers = localStorage.getItem("registered");
    var objUsers = JSON.parse(getUsers);
    for(let i =0; i<objUsers.length; i++){
        if(objUsers[i].email == inputEmail){
            isExist= true;
            if(objUsers[i].password!= inputPswd){
                alert("Wrong Password! Try again.");
                document.getElementById("pswd").style.border = "solid red 1px";
            }
            else{
                window.open('../home.html',"_self");
            }
        }  
    }
    if(!isExist){
        alert("Couldn’t find your Account! Try again.");
        document.getElementById("email").style.border = "solid red 1px";
    }

}