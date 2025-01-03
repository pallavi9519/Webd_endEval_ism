
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDOARZjL7c90_dDyK84eo8PHSEx_vT-Fm8",
    authDomain: "lallantop-4902e.firebaseapp.com",
    projectId: "lallantop-4902e",
    storageBucket: "lallantop-4902e.firebasestorage.app",
    messagingSenderId: "878395374583",
    appId: "1:878395374583:web:e204af1f95e90aa3044cf2"
  };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    auth.languageCode = 'en';
    const provider = new GoogleAuthProvider();

    const googleLogin = document.getElementById("GG");
    googleLogin.addEventListener("click", function(){
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "../index.html";
   
         }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
        });
    })



  // Sign up function
    const signUpForm = document.getElementById("signup");
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User created:", user);
                alert("Sign up successful!");
                window.location.href="../index.html";
            })
            .catch((error) => {
                console.error("Error signing up:", error.message);
                alert(error.message);
            });
    });