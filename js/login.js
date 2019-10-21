(function(){
    $(document).ready(init);
    var firebaseConfig = {
        apiKey: "AIzaSyD6kaht5h4agX0UrN65zsWMcHlmS83d-l4",
        authDomain: "wildbot-fundraising-3ece0.firebaseapp.com",
        databaseURL: "https://wildbot-fundraising-3ece0.firebaseio.com",
        projectId: "wildbot-fundraising-3ece0",
        storageBucket: "wildbot-fundraising-3ece0.appspot.com",
        messagingSenderId: "661538317905",
        appId: "1:661538317905:web:aabdc87ff4357a5d2aba70"
    };

    function init(){
        firebase.initializeApp(firebaseConfig);
        $("#btn").on("click", authenticate);
        $('.sidenav').sidenav();
        $('.modal').modal();
        $("#logout").on('click', logout);
    }

    function logout(){
        firebase.auth().signOut();
    }

    function authenticate(){
        let email = $("#email").val();
        let pass = $("#pass").val();
        console.log(email, pass);

        firebase.auth().signInWithEmailAndPassword(email, pass).catch((err) => {
            let errCode = err.code;
            if(errCode === 'auth/wrong-password'){
                $(".incorrect").css("dispaly", "block");
                $("#pass").css("border-bottom-color", "red");
            }

            if(errCode === 'auth/invalid-email'){
                $(".incorrect").css("display", "block");
                $("#email").css("border-bottom-color", "red");
            }
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                location.replace("../html/update.html");
            }
        });
    }
})();