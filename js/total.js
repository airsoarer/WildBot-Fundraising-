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
        firebase.database().ref("Total").on("value", (snapshot) => {
            let data = snapshot.val();
            let originalTotal = data;
            let total = data;
            total = total / 10000;
            total = total.toString();
            total = total.split(".");
            total = total[1];
            if(total.length > 2){
                total = total.substring(0, 2);
            }

            console.log(total);
            $("#total").text(originalTotal);
            $(".barCover").css("height", total + "vh");
        });

        $('.sidenav').sidenav();
        $('.modal').modal();
        $("#logout").on("click", logout);
    }

    function logout(){
        firebase.auth().signOut();
    }
})();