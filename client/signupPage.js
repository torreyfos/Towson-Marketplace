 const BASE_URL = "http://localhost:5000/auth/register";

 document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("signupForm");

    if(form){
        form.addEventListener("submit", handleSignup);
    }
 })

 function handleSignup(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const psw = document.getElementById("psw").value;
    const confirmPsw = document.getElementById("confirmPsw").value;
    const error = document.getElementById("error");


//====================VALIDATION===============
    if(!name.trim()) {
        error.textContent = "Please Enter Your Name";
        return;
    }
    if(!email.trim() || !email.endsWith("@students.towson.edu")){
        error.textContent = "Please Use Your Towson Student Email";
        return;
    }
       if(!psw.trim()){
        error.textContent = "Please Enter and Confirm Your Password"
        return;
    }
    if(psw.length < 8){
        error.textContent = "Password Must Be At Least 8 Characters Long";
        return;
    }
    if(psw !== confirmPsw){
        error.textContent = "Passwords Do Not Match. Try Again";
        return;
    }

    localStorage.setItem("user", email);

    signupUser(name, email, psw)
 }
//===============End SIGNUP VALIDATION=================

//============SEND VALID ACCOUNT DATA TO BE STORED ON DATABASE======
 async function signupUser(name, email, psw){
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password: psw})
        });
        const result = await res.json();
        //console.log('Account Created', result);
        window.location.href = "tumarketplace.html";
    } catch (err){
        console.error("Error Creating Account", err);
    }
 }
//======================================================================


/*
 //==============Sign-up Form Popup==============
function openForm(){
    document.getElementById("signupPopup").style.display = "block";
}

function closeForm(){
    document.getElementById("signupPopup").style.display = "none";
}

 //==================End Popup===================
 */

 //==========Password Visibility======
 function showPsw(){
    const x = document.getElementById("psw");
    if(x.type === "password"){
        x.type = "text";
    } else{
        x.type = "password";
    }
 }

 function showConfirmPsw(){
    const x = document.getElementById("confirmPsw");
    if(x.type === "password"){
        x.type = "text";
    } else{
        x.type = "password";
    }
 }
 //==========End Password Visibility=====

