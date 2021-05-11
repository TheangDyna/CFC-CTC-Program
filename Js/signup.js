function signup(){
    var signupInput = document.getElementById("signup");
    var userFname = signupInput.elements.namedItem("fname").value;
    var userLname = signupInput.elements.namedItem("lname").value;
    var userEmail = signupInput.elements.namedItem("email").value;
    var userPswd = signupInput.elements.namedItem("pswd").value;
    var userCpswd = signupInput.elements.namedItem("cpswd").value;

    if(userPswd!=userCpswd){
        alert("Those passwords didn’t match! Try again.");
        document.getElementById("cpswd").style.border = "solid red 1px";
    }
    else{
        if(localStorage.getItem("registered")==null){
            localStorage.setItem("registered", "[]");
        }
        var getUsers = localStorage.getItem("registered");
        var objUsers = JSON.parse(getUsers);
        let newUser = {
            fname: userFname,
            lname: userLname,
            email: userEmail,
            password: userPswd
        };
        objUsers.push(newUser);
        localStorage.setItem("registered", JSON.stringify(objUsers));
        window.open('../index.html',"_self");
    }
}