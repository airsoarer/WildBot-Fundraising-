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

    let i = 0;
    let colors = ["#2A3132", '#763626'];

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.database().ref("People").on("child_added", (snapshot) => {
            let data = snapshot.val();
            let sold = data.PortAPit.AmountSold;
            sold = sold / 20;
            sold = sold.toString();
            if(sold != 0){
                sold = sold.split(".");
                sold = sold[1];

                if(sold.length === 1){
                    sold += "0";
                }
            }

            let hr = document.createElement("hr");
            hr.textContent = data.Name;
            // hr.classList.add("col");
            // hr.classList.add("m10");
            // hr.classList.add("offset-m1");
            // $(hr).css("width", sold + "vw");
            if(sold < 2){
                $(hr).animate({
                    width: "2vw",
                }, 1000);
            }else{
                $(hr).animate({
                    width:sold + "vw",
                }, 1000);
            }
            if(i % 2 === 0){
                $(hr).css("background-color", colors[0]);
            }else{
                $(hr).css("background-color", colors[1]);
            }

            $('.graph').append(hr);
            i++;
        });

        $('.sidenav').sidenav();
        $('.modal').modal();
        $("#logout").on("click", logout);
    }

    function logout(){
        firebase.auth().signOut();
    }
})();