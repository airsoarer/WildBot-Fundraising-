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

    total = 0;
    firebaseUser = false;

    function init(){
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebaseUser = true;
                $("#addTrigger").css("display", "block");
                console.log(user);
            }
        });
        let driveRef = firebase.database().ref("People");
        driveRef.on('child_added', (snapshot) => {
            var data = snapshot.val();
            var key = snapshot.key;

            // Create table row 
            var tr = document.createElement("tr");

            // Create cell for name 
            var name = document.createElement("td");
            name.textContent = data.Name;
            tr.appendChild(name);

            if(firebaseUser){
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                tr.appendChild(amountSold);

                // Create input for amount sold
                var amountSoldInput = document.createElement("input");
                amountSoldInput.placeholder = data.DriveAndShine.AmountSold + " Coupons Sold";
                amountSoldInput.id = key;
                amountSoldInput.type = "number";
                amountSoldInput.classList.add("driveUpdate");
                amountSold.appendChild(amountSoldInput);
            }else{
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                amountSold.textContent = data.DriveAndShine.AmountSold + " Coupons Sold";
                tr.appendChild(amountSold);
            }

            // Create cell for Money Earned 
            var moneyEarned = document.createElement("td");
            moneyEarned.textContent = "$" + data.DriveAndShine.MoneyEarned + " Earned";
            tr.appendChild(moneyEarned);

            // Create cell for Amount left 
            var amountLeft = document.createElement("td");
            amountLeft.textContent = data.DriveAndShine.AmountLeft + " Coupons Left";
            tr.appendChild(amountLeft);

            $('.driveTable').append(tr);
        });

        let portRef = firebase.database().ref("People");
        portRef.on('child_added', (snapshot) => {
            var data = snapshot.val();
            var key = snapshot.key;

            // Create table row 
            var tr = document.createElement("tr");

            // Create cell for name 
            var name = document.createElement("td");
            name.textContent = data.Name;
            tr.appendChild(name);

            if(firebaseUser){
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                tr.appendChild(amountSold);

                // Create input for amount sold
                var amountSoldInput = document.createElement("input");
                amountSoldInput.placeholder = data.PortAPit.AmountSold + " Tickets Sold";
                amountSoldInput.id = key;
                amountSoldInput.type = "number";
                amountSoldInput.classList.add("portUpdate");
                amountSold.appendChild(amountSoldInput);
            }else{
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                amountSold.textContent = data.PortAPit.AmountSold + " Tickets Sold";
                tr.appendChild(amountSold);
            }

            // Create cell for Money Earned 
            var moneyEarned = document.createElement("td");
            moneyEarned.textContent = "$" + data.PortAPit.MoneyEarned + " Earned";
            tr.appendChild(moneyEarned);

            // Create cell for Amount left 
            var amountLeft = document.createElement("td");
            amountLeft.textContent = data.PortAPit.AmountLeft + " Tickets Left";
            tr.appendChild(amountLeft);

            $('.portTable').append(tr);
        });

        let individualRef = firebase.database().ref("People");
        individualRef.on('child_added', (snapshot) => {
            var data = snapshot.val();
            var key = snapshot.key;

            // Create table row 
            var tr = document.createElement("tr");

            // Create cell for name 
            var name = document.createElement("td");
            name.textContent = data.Name;
            tr.appendChild(name);

            if(firebaseUser){
                // Create cell for Money Earned 
                var moneyEarned = document.createElement("td");
                tr.appendChild(moneyEarned);

                // Create input for amount sold
                var moneyEarnedInput = document.createElement("input");
                moneyEarnedInput.placeholder = "$" + data.Individual.MoneyEarned + " Earned";
                moneyEarnedInput.id = key;
                moneyEarnedInput.type = "number";
                moneyEarnedInput.classList.add("individualUpdate");
                moneyEarned.appendChild(moneyEarnedInput);
            }else{
                // Create cell for Money Earned 
                var moneyEarned = document.createElement("td");
                moneyEarned.textContent = "$" + data.Individual.MoneyEarned + " Earned";
                tr.appendChild(moneyEarned);
            }

            $('.individualTable').append(tr);
        });

        $("#add").on('click', add);
        $(document.body).on('keyup', '.driveUpdate', function(event) {
            if(event.which === 13){
                driveUpdate($(this).attr("id"), $(this).val());
            }
        });

        $(document.body).on("keyup", '.portUpdate', function(event) {
            if(event.which === 13){
                portUpdate($(this).attr("id"), $(this).val());
            }
        });

        $(document.body).on("keyup", '.individualUpdate', function(event) {
            if(event.which === 13){
                indiviudalUpdate($(this).attr("id"), $(this).val());
            }
        });

        firebase.database().ref("Total").on("value", (snapshot) => {
            total = snapshot.val();
        });

        $('.sidenav').sidenav();
        $('.modal').modal();
        $("#logout").on("click", logout);
    }

    function logout(){
        $("#addTrigger").css("display", "block");
        $("input").attr("disabled", "true");
        firebase.auth().signOut();
    }

    // Drive n Shine Methods
    function driveUpdate(id, amount){
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = parseInt(data.DriveAndShine.AmountSold) + parseInt(amount);
            moneyEarned = amountSold * 20;
            amountLeft = 0;
            if(amountSold < 20){
                amountLeft = 20 - amountSold;
            }
        });

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };
    
        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return parseInt(Total) + parseInt(amount * 20);
        }).then(() => {
            return firebase.database().ref("People/" + id).child("DriveAndShine").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) + parseInt(amount * 20);
            });
        });
    }

    // Port A Pit Methods
    function portUpdate(id, amount){
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = parseInt(data.PortAPit.AmountSold) + parseInt(amount);
            moneyEarned = amountSold * 7;
            amountLeft = 0;
            if(amountSold < 20){
                amountLeft = 20 - amountSold;
            }
        });

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };

        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return parseInt(Total) + parseInt(amount * 7);
        }).then(() => {
            return firebase.database().ref("People/" + id).child("PortAPit").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) + parseInt(amount * 7);
            });
        });
    }

    // Port A Pit Methods
    function indiviudalUpdate(id, amount){
        let ref = firebase.database().ref("People/" + id);

        let moneyEarned = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();
            moneyEarned = parseInt(data.Individual.MoneyEarned) + parseInt(amount);
        });

        let update = {
            MoneyEarned:moneyEarned
        };

        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return parseInt(Total) + parseInt(amount);
        }).then(() => {
            return firebase.database().ref("People/" + id).child("Individual").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) + parseInt(amount);
            });
        });
    }

    // Add people to Drive and Shine Fundraiser table
    function add(){
        let name = $('#addPerson').val();
        $('#addPerson').val('');
        let ref = firebase.database().ref("People");

        ref.push({
            Name:name,
            TotalEarned:0,
            PortAPit: {
                AmountSold:0,
                AmountLeft:20,
                MoneyEarned:0
            },
            DriveAndShine: {
                AmountSold:0,
                MoneyEarned:0,
                AmountLeft:20
            },
            Individual: {
                MoneyEarned:0
            }
        });
    }
})();