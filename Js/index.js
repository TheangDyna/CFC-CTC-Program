function setAdmin(){
    if(localStorage.getItem("registered")==null){
        let adminUser = {
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
    var userEmail = signupInput.elements.namedItem("email").value;
    var userPswd = signupInput.elements.namedItem("pswd").value;
    var userCpswd = signupInput.elements.namedItem("cpswd").value;
    var getUsers = localStorage.getItem("registered");
    var objUsers = JSON.parse(getUsers);
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
                email: userEmail,
                password: userPswd
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

function checkAdmin(){ 
    var currentUser =  JSON.parse(localStorage.getItem("currentUser"));
    var email = currentUser.email;
    var password = currentUser.password;
    var adminTool = document.getElementById("createLesson");
    if(email =="admin@gmail.com" && password=="admin@gmail.com"){
        adminTool.style.visibility = "visible";
    }
    else{
        adminTool.style.visibility = "hidden";
    }
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

function displayComputer(){
    var tableL = document.getElementById("computer");
    tableL.innerHTML = "";
    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("computerLesson")==null){
        localStorage.setItem("computerLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("computerLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteCoputerL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displayMicrosoft(){
    var tableL = document.getElementById("microsoft");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("microsoftLesson")==null){
        localStorage.setItem("microsoftLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("microsoftLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteMicrosoftL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displayMicrosoftAdvane(){
    var tableL = document.getElementById("microsoftAdvane");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("microsoftAdvaneLesson")==null){
        localStorage.setItem("microsoftAdvaneLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("microsoftAdvaneLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteMicrosoftAdvaneL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displayLiving(){
    var tableL = document.getElementById("living");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("livingLesson")==null){
        localStorage.setItem("livingLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("livingLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteLivingL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displayGame(){
    var tableL = document.getElementById("game");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("gameLesson")==null){
        localStorage.setItem("gameLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("gameLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteGameL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displayGlobal(){
    var tableL = document.getElementById("global");
    tableL.innerHTML = "";

    var header = document.createElement("tr");
    header.innerHTML = "<th>lesson</th>";
    tableL.appendChild(header);
    if(localStorage.getItem("globalLesson")==null){
        localStorage.setItem("globalLesson","[]");
    }
    var objCourse = JSON.parse(localStorage.getItem("globalLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        let rowL = document.createElement("tr");
        let aL = document.createElement("a");
        aL.href = objCourse[i].urlLesson;
        aL.target = "_blank";
        let titleL = document.createElement("td");
        titleL.innerHTML = objCourse[i].titleLesson;
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
            deleteGlobalL(objCourse[i].titleLesson);
        }
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-primary");
        deleteButton.classList.add("adminBtn");
        aL.appendChild(titleL)
        rowL.appendChild(aL);
        rowL.appendChild(deleteButton);
        tableL.appendChild(rowL);
    }
}

function displaySlide(){
    displayComputer();
    displayMicrosoft();
    displayMicrosoftAdvane();
    displayLiving();
    displayGame();
    displayGlobal();
}

function deleteCoputerL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("computerLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("computerLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function deleteMicrosoftL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("microsoftLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("microsoftLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function deleteMicrosoftAdvaneL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("microsoftAdvaneLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("microsoftAdvaneLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function deleteLivingL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("livingLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("livingLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function deleteGameL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("gameLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("gameLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}

function deleteGlobalL(titleLesson){
    var objCourse = JSON.parse(localStorage.getItem("globalLesson"));
    for(let i= 0 ; i<objCourse.length;i++){
        if(objCourse[i].titleLesson == titleLesson){
            objCourse.splice(i,1);
            localStorage.setItem("globalLesson", JSON.stringify(objCourse));
            notifyMessage("Deleted Lesson successful!", "#04AA6D");
            displaySlide();
            break;
        } 
    }
}
