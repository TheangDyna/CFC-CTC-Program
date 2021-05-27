function setAdmin(){
    if(localStorage.getItem("registered")==null){
        let adminUser = {
            lname: "Admin",
            sex: "https://shanghai-date.com/uploads/g/t/t/h/q2t34kjldqrqv0pl7ihh.png",
            email: "admin@gmail.com",
            password:"admin@gmail.com"
        }
        let users = [];
        users.push(adminUser);
        localStorage.setItem("registered", JSON.stringify(users));
    }
}

function notifyMessage(message, color){
    var messageBox = document.createElement("div");
    messageBox.style.background = color;
    messageBox.innerHTML = message;
    document.body.appendChild(messageBox);
    messageBox.classList.add("alert");
    setTimeout(()=>{
        document.body.removeChild(messageBox);
    },5000);
    
}

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
                notifyMessage("Wrong Password! Try again.", "#f44336");
                document.getElementById("pswd").style.border = "solid red 1px";
            }
            else{
                localStorage.setItem("currentUser",JSON.stringify(objUsers[i]));
                notifyMessage("Sign In successful!", "#04AA6D");
                setTimeout(()=>{
                    window.open('../home.html',"_self");
                },2000);
            }
        }  
    }
    if(!isExist){
        notifyMessage("Couldn’t find your Account! Try again.", "#f44336");
        document.getElementById("email").style.border = "solid red 1px";
    }

}

function signup(){
    var signupInput = document.getElementById("signup");
    var userFname = signupInput.elements.namedItem("fname").value;
    var userLname = signupInput.elements.namedItem("lname").value;
    var userSex = signupInput.elements.namedItem("optradio").value;
    var userEmail = signupInput.elements.namedItem("email").value;
    var userPswd = signupInput.elements.namedItem("pswd").value;
    var userCpswd = signupInput.elements.namedItem("cpswd").value;
    var getUsers = localStorage.getItem("registered");
    var objUsers = JSON.parse(getUsers);
    var haven = false;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    for(let i =0; i<objUsers.length; i++){
        if(objUsers[i].email==userEmail){
            haven = true;
        }
    }
    if(!userEmail.match(pattern)){
        notifyMessage("your email is not in Valid! Try again.", "#f44336");
        document.getElementById("email").style.border = "solid red 1px";
    }
    else{
        if(haven){
            notifyMessage("This email is already Signed Up! Try again.", "#f44336");
            document.getElementById("email").style.border = "solid red 1px";
        }
        else{
            if( userPswd.length < 8){
                notifyMessage("your password must be at least 8 characters! Try again.", "#f44336");
                document.getElementById("pswd").style.border = "solid red 1px";
            }
            else{
                if(userPswd!=userCpswd){
                    notifyMessage("Those passwords didn’t match! Try again.", "#f44336");
                    document.getElementById("pswd").style.border = "solid red 1px";
                    document.getElementById("cpswd").style.border = "solid red 1px";
                }
                else{
                    var getUsers = localStorage.getItem("registered");
                    var objUsers = JSON.parse(getUsers);
                    let newUser = {
                        fname: userFname,
                        lname: userLname,
                        sex: userSex,
                        email: userEmail,
                        password: userPswd,
                        favorite:[]
                    };
                    objUsers.push(newUser);
                    localStorage.setItem("registered", JSON.stringify(objUsers));
                    notifyMessage("Sign Up successful!", "#04AA6D");
                    setTimeout(()=>{
                        window.open('../index.html',"_self");
                    },2000);
                }
            }
        }
    }
}

function resetPassword(){
    var restInput = document.getElementById("reset");
    var userEmail = restInput.elements.namedItem("email").value;
    var userFname = restInput.elements.namedItem("fname").value;
    var userLname = restInput.elements.namedItem("lname").value;
    var newPswd = restInput.elements.namedItem("pswd").value;
    var cNewPswd = restInput.elements.namedItem("cpswd").value;
    var isUserExist = false;
    var isMatchName = false;
    if (newPswd.length < 8){
        notifyMessage("your password must be at least 8 characters! Try again.", "#f44336");
        document.getElementById("pswd").style.border = "solid red 1px";
    }
    else{
        if(newPswd!=cNewPswd){
            notifyMessage("Those passwords didn’t match! Try again.", "#f44336");
            document.getElementById("pswd").style.border = "solid red 1px";
            document.getElementById("cpswd").style.border = "solid red 1px";
        }
        else{
            let getUsers = localStorage.getItem("registered");
            let objUsers = JSON.parse(getUsers);
            for(let i = 0; i < objUsers.length; i++){
                if(objUsers[i].email == userEmail){
                    isUserExist = true;
                    if(objUsers[i].fname == userFname) {
                        if(objUsers[i].lname == userLname){
                            isMatchName = true;
                            objUsers[i].password = newPswd;
                            localStorage.setItem("registered", JSON.stringify(objUsers));
                            notifyMessage("Reset Password successful!", "#04AA6D");
                            setTimeout(()=>{
                                window.open('../index.html',"_self");
                            },2000);
                            break;
                        }
                    }
                }
            }
            if(!isUserExist){
                notifyMessage("Couldn’t find your Account! Try again.", "#f44336");
                document.getElementById("email").style.border = "solid red 1px";
            }
            else if(!isMatchName){
                notifyMessage("Couldn’t find your Name! Try again.", "#f44336");
                document.getElementById("fname").style.border = "solid red 1px";
                document.getElementById("lname").style.border = "solid red 1px";
                
            }
    
        }
    }
    
}

function checkSlide(){ 
    var currentUser =  JSON.parse(localStorage.getItem("currentUser"));
    var email = currentUser.email;
    var password = currentUser.password;
    var adminLink = document.getElementById("adminCL");
    var adminTool = document.getElementById("createLesson");
    if(email =="admin@gmail.com" && password=="admin@gmail.com"){
        adminLink.style.display = "inline";
        adminTool.style.display = "block";
    }
    else{
        adminLink.style.display = "none";
        adminTool.style.display = "none";
    }
}

function checkHome(){ 
    var currentUser =  JSON.parse(localStorage.getItem("currentUser"));
    var email = currentUser.email;
    var password = currentUser.password;
    var userTool = document.getElementById("favoriteTool");
    var adminLink = document.getElementById("adminCL");
    if(email =="admin@gmail.com" && password=="admin@gmail.com"){
        userTool.style.display = "none";
        adminLink.style.display = "inline";
    }
    else{
        userTool.style.display = "block";
        adminLink.style.display = "none";
        displayFavorite();
    }
}

function displayProfile(){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var name = document.getElementById("name");
    var cname = currentUser.lname;
    name.innerHTML = cname;

    var img =  document.getElementById("sex");
    var sImg = document.createElement("img");
    sImg.src = currentUser.sex;
    img.appendChild(sImg);

}

function addlessonSlide(){
    var courseInput = document.getElementById("createL");
    var idC = courseInput.elements.namedItem("seleteId").value;
    var titleL = courseInput.elements.namedItem("titleL").value;
    var urlL = courseInput.elements.namedItem("urlL").value;

    if(idC=="computer"){
        if(localStorage.getItem("computerLesson")==null){
            localStorage.setItem("computerLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("computerLesson"));
        let courseItem = {
            idCourse: idC,
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("computerLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    else if(idC=="microsoft"){
        if(localStorage.getItem("microsoftLesson")==null){
            localStorage.setItem("microsoftLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("microsoftLesson"));
        let courseItem = {
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("microsoftLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    else if(idC=="microsoftAdvane"){
        if(localStorage.getItem("microsoftAdvaneLesson")==null){
            localStorage.setItem("microsoftAdvaneLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("microsoftAdvaneLesson"));
        let courseItem = {
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("microsoftAdvaneLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    else if(idC=="living"){
        if(localStorage.getItem("livingLesson")==null){
            localStorage.setItem("livingLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("livingLesson"));
        let courseItem = {
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("livingLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    else if(idC=="game"){
        if(localStorage.getItem("gameLesson")==null){
            localStorage.setItem("gameLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("gameLesson"));
        let courseItem = {
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("gameLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    else if(idC=="global"){
        if(localStorage.getItem("globalLesson")==null){
            localStorage.setItem("globalLesson","[]");
        }
        
        var ObjCourse = JSON.parse(localStorage.getItem("globalLesson"));
        let courseItem = {
            titleLesson: titleL,
            urlLesson: urlL
        }
        ObjCourse.push(courseItem);
        localStorage.setItem("globalLesson", JSON.stringify(ObjCourse));
        notifyMessage("Added lesson successful!", "#04AA6D");
    }
    displaySlide();
}

function addFavorite(objLesson){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.favorite.push(objLesson);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    var registered = JSON.parse(localStorage.getItem("registered"));
    for(let i=0; i<registered.length;i++){
        if(registered[i].email == currentUser.email){
            registered[i].favorite = currentUser.favorite;
            localStorage.setItem("registered",JSON.stringify(registered));
            notifyMessage("Added to Favorite successful!", "#04AA6D");
            break;
        }
    }
}

function displayComputer(){
    create("computer","computerLesson",deleteComputerL);
}

function displayMicrosoft(){
    create("microsoft","microsoftLesson",deleteMicrosoftL);
}

function displayMicrosoftAdvane(){
    create("microsoftAdvane","microsoftAdvaneLesson",deleteMicrosoftAdvaneL);
}

function displayLiving(){
    create("living","livingLesson",deleteLivingL);
}

function displayGame(){
    create("game","gameLesson",deleteGameL);
}

function displayGlobal(){
    create("global","globalLesson",deleteGlobalL);
}

function displaySlide(){
    displayComputer();
    displayMicrosoft();
    displayMicrosoftAdvane();
    displayLiving();
    displayGame();
    displayGlobal();
}

function displayFavorite(){
    var tableL = document.getElementById("favorite");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var arrFavorite = currentUser.favorite;
    for(let i= 0 ; i<arrFavorite.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = arrFavorite[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = arrFavorite[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remove";
        deleteButton.onclick = function(){
            deleteFavorite(arrFavorite[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("favoriteBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function deleteComputerL(titleLesson){
    deleteF("computerLesson",titleLesson);
}

function deleteMicrosoftL(titleLesson){
    deleteF("microsoftLesson",titleLesson);
}

function deleteMicrosoftAdvaneL(titleLesson){
    deleteF("microsoftAdvaneLesson",titleLesson);
}

function deleteLivingL(titleLesson){
    deleteF("livingLesson",titleLesson);
}

function deleteGameL(titleLesson){
    deleteF("gameLesson",titleLesson);

}

function deleteGlobalL(titleLesson){
    deleteF("globalLesson",titleLesson);
}

function deleteFavorite(titleLesson){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var arrFavorite = currentUser.favorite;
    for(let i= 0 ; i<arrFavorite.length;i++){
        if(arrFavorite[i].titleLesson == titleLesson){
            arrFavorite.splice(i,1);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            notifyMessage("Deleted Favorite successful!", "#04AA6D");
            displayFavorite();
            break;
        } 
    }
}

function create(id,obj,fdelete){
    var tableL = document.getElementById(id);
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem(obj)==null){
        localStorage.setItem(obj,"[]");
    }
    var objCourse = JSON.parse(localStorage.getItem(obj));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remove";
        deleteButton.onclick = function(){
           fdelete(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        let faviteButton = document.createElement("button");
        faviteButton.innerHTML = "Add to Favorite";
        faviteButton.onclick = function(){
            addFavorite(objCourse[i]);
        }
        faviteButton.classList.add("btn");
        faviteButton.classList.add("btn-primary");
        faviteButton.classList.add("favoriteBtn");
        var currentUser =  JSON.parse(localStorage.getItem("currentUser"));
        var email = currentUser.email;
        var password = currentUser.password;
        if(email =="admin@gmail.com" && password=="admin@gmail.com"){
            deleteButton.style.display = "inline-block";
            faviteButton.style.display = "none";
        }
        else{
            deleteButton.style.display = "none";
            faviteButton.style.display = "inline-block";
        }
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        rowL.appendChild(faviteButton);
        tableL.appendChild(rowL);
    }
}

function deleteF(obj,titleLesson){
    var objCourse = JSON.parse(localStorage.getItem(obj));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem(obj, JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function homeSlide(){
    var slideIndex = 0;
    showSlides();

    function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeDot", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " activeDot";
    setTimeout(showSlides, 4000);
    }
}

function showpswd(){
    var pswd = document.getElementById("pswd");
    var cpswd = document.getElementById("cpswd");
    if (pswd.type === "password") {
        pswd.type = "text";
    } else {
        pswd.type = "password";
    }
    if (cpswd.type === "password") {
        cpswd.type = "text";
    } else {
        cpswd.type = "password";
    }
  }