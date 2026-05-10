const BASE_URL = "http://localhost:5000/auth/register";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("signupForm");

    if (form) {
        form.addEventListener("submit", handleSignup);
    }

});


function handleSignup(e) {

    e.preventDefault();

    // GET FORM VALUES
    const fullName =
        document.getElementById("fullName").value;

    const email =
        document.getElementById("email").value;

    const psw =
        document.getElementById("psw").value;

    const confirmPsw =
        document.getElementById("confirmPsw").value;

    const profilePic =
        document.getElementById("profilePic").files[0];

    const error =
        document.getElementById("error");


    // CLEAR OLD ERROR
    error.textContent = "";


    // ==================== VALIDATION ===================

    // FULL NAME
    if (!fullName.trim()) {

        error.textContent =
            "Please Enter Your Full Name";

        return;
    }

    // EMAIL
    if (
        !email.trim() ||
        !email.endsWith("@students.towson.edu")
    ) {

        error.textContent =
            "Please Use Your Towson Student Email";

        return;
    }

    // PASSWORD
    if (!psw.trim()) {

        error.textContent =
            "Please Enter and Confirm Your Password";

        return;
    }

    // PASSWORD LENGTH
    if (psw.length < 8) {

        error.textContent =
            "Password Must Be At Least 8 Characters Long";

        return;
    }

    // PASSWORD MATCH
    if (psw !== confirmPsw) {

        error.textContent =
            "Passwords Do Not Match. Try Again";

        return;
    }


    // SAVE USER EMAIL
    localStorage.setItem("user", email);

    // SAVE PROFILE PIC NAME (temporary)
    if (profilePic) {

        localStorage.setItem(
            "profilePic",
            profilePic.name
        );
    }


    // SIGNUP
    signupUser(
        fullName,
        email,
        psw,
        profilePic
    );
}


//=============== SEND VALID ACCOUNT DATA =================

async function signupUser(
    fullName,
    email,
    psw,
    profilePic
) {

    try {

        // FORM DATA FOR IMAGE UPLOADS
        const formData = new FormData();

        formData.append(
            "fullName",
            fullName
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "password",
            psw
        );

        // PROFILE PIC
        if (profilePic) {

            formData.append(
                "profilePicture",
                profilePic
            );
        }


        const res = await fetch(BASE_URL, {

            method: "POST",

            body: formData

        });

        const result = await res.json();

        console.log(
            "Account Created",
            result
        );

        // REDIRECT
        window.location.href =
            "tumarketplace_completed.html";

    }

    catch (err) {

        console.error(
            "Error Creating Account",
            err
        );
    }
}


//========== PASSWORD VISIBILITY ======

function showPsw() {

    const x =
        document.getElementById("psw");

    if (x.type === "password") {

        x.type = "text";

    } else {

        x.type = "password";
    }
}


function showConfirmPsw() {

    const x =
        document.getElementById("confirmPsw");

    if (x.type === "password") {

        x.type = "text";

    } else {

        x.type = "password";
    }
}

//========== END PASSWORD VISIBILITY ======