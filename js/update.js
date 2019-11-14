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
                // console.log(user);
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
                amountSold.textContent = data.DriveAndShine.AmountSold + " Coupons Sold";
                amountSold.id = key + "driveShineTd"
                tr.appendChild(amountSold);

                // Create amount sold plus button
                var amountSoldPlus = document.createElement("button");
                amountSoldPlus.classList.add("drivePlus");
                amountSoldPlus.id = key;
                amountSold.appendChild(amountSoldPlus);

                // Create amount sold plus icon
                var amountSoldPlusIcon = document.createElement("i");
                amountSoldPlusIcon.classList.add("material-icons");
                amountSoldPlusIcon.classList.add("small");
                amountSoldPlusIcon.textContent = "keyboard_arrow_up"
                amountSoldPlus.append(amountSoldPlusIcon);

                // Create amount sold minus button
                var amountSoldMinus = document.createElement("button");
                amountSoldMinus.classList.add("driveMinus");
                amountSoldMinus.id = key;
                amountSold.appendChild(amountSoldMinus);

                // Create amount sold plus icon
                var amountSoldMinusIcon = document.createElement("i");
                amountSoldMinusIcon.classList.add("material-icons");
                amountSoldMinusIcon.classList.add("small");
                amountSoldMinusIcon.textContent = "keyboard_arrow_down"
                amountSoldMinus.append(amountSoldMinusIcon);
            }else{
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                amountSold.textContent = data.DriveAndShine.AmountSold + " Coupons Sold";
                tr.appendChild(amountSold);
            }

            // Create cell for Money Earned 
            var moneyEarned = document.createElement("td");
            moneyEarned.textContent = "$" + data.DriveAndShine.MoneyEarned + " Earned";
            moneyEarned.id = key + "driveShineMoneyEarned";
            tr.appendChild(moneyEarned);

            // Create cell for Amount left 
            var amountLeft = document.createElement("td");
            amountLeft.textContent = data.DriveAndShine.AmountLeft + " Coupons Left";
            amountLeft.id = key + "driveShineAmountLeft";
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
                amountSold.textContent = data.PortAPit.AmountSold + " Coupons Sold";
                amountSold.id = key + "portAPitTd"
                tr.appendChild(amountSold);

                // Create amount sold plus button
                var amountSoldPlus = document.createElement("button");
                amountSoldPlus.classList.add("portAPitPlus");
                amountSoldPlus.id = key;
                amountSold.appendChild(amountSoldPlus);

                // Create amount sold plus icon
                var amountSoldPlusIcon = document.createElement("i");
                amountSoldPlusIcon.classList.add("material-icons");
                amountSoldPlusIcon.classList.add("small");
                amountSoldPlusIcon.textContent = "keyboard_arrow_up"
                amountSoldPlus.append(amountSoldPlusIcon);

                // Create amount sold minus button
                var amountSoldMinus = document.createElement("button");
                amountSoldMinus.classList.add("portAPitMinus");
                amountSoldMinus.id = key;
                amountSold.appendChild(amountSoldMinus);

                // Create amount sold plus icon
                var amountSoldMinusIcon = document.createElement("i");
                amountSoldMinusIcon.classList.add("material-icons");
                amountSoldMinusIcon.classList.add("small");
                amountSoldMinusIcon.textContent = "keyboard_arrow_down"
                amountSoldMinus.append(amountSoldMinusIcon);
            }else{
                // Create cell for Amount Sold
                var amountSold = document.createElement("td");
                amountSold.textContent = data.PortAPit.AmountSold + " Tickets Sold";
                tr.appendChild(amountSold);
            }

            // Create cell for Money Earned 
            var moneyEarned = document.createElement("td");
            moneyEarned.textContent = "$" + data.PortAPit.MoneyEarned + " Earned";
            moneyEarned.id = key + "portAPitMoneyEarned";
            tr.appendChild(moneyEarned);

            // Create cell for Amount left 
            var amountLeft = document.createElement("td");
            amountLeft.textContent = data.PortAPit.AmountLeft + " Tickets Left";
            amountLeft.id = key + "portAPitAmountLeft"
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
        $(document.body).on("click", ".drivePlus", drivePlusUpdate);
        $(document.body).on("click", ".driveMinus", driveMinusUpdate);
        $(document.body).on("click", ".portAPitPlus", portAPitPlusUpdate);
        $(document.body).on("click", ".portAPitMinus", portAPitMinusUpdate);

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
    function drivePlusUpdate(){
        console.log("working");
        let id = $(this).attr("id");
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0;
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = data.DriveAndShine.AmountSold;
            moneyEarned = data.DriveAndShine.MoneyEarned;
            amountLeft = data.DriveAndShine.AmountLeft;
        });

        amountSold += 1;
        moneyEarned += 5;
        amountLeft -= 1;

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };

        if(amountLeft <= 0){
            $("#" + id + "driveShineAmountLeft").html("0 Coupons Left");
        }else {
            $("#" + id + "driveShineAmountLeft").html(amountLeft + " Coupons Left");
        }

        $("#" + id + "driveShineTd").html(amountSold + " Coupons Sold");
        $("#" + id + "driveShineMoneyEarned").html("$" + moneyEarned + " Earned");

        // Create amount sold plus button
        var amountSoldPlus = document.createElement("button");
        amountSoldPlus.classList.add("drivePlus");
        amountSoldPlus.id = id;
        $("#" + id + "driveShineTd").append(amountSoldPlus);

        // Create amount sold plus icon
        var amountSoldPlusIcon = document.createElement("i");
        amountSoldPlusIcon.classList.add("material-icons");
        amountSoldPlusIcon.classList.add("small");
        amountSoldPlusIcon.textContent = "keyboard_arrow_up"
        amountSoldPlus.append(amountSoldPlusIcon);

        // Create amount sold minus button
        var amountSoldMinus = document.createElement("button");
        amountSoldMinus.classList.add("driveMinus");
        amountSoldMinus.id = id;
        $("#" + id + "driveShineTd").append(amountSoldMinus);

        // Create amount sold plus icon
        var amountSoldMinusIcon = document.createElement("i");
        amountSoldMinusIcon.classList.add("material-icons");
        amountSoldMinusIcon.classList.add("small");
        amountSoldMinusIcon.textContent = "keyboard_arrow_down"
        amountSoldMinus.append(amountSoldMinusIcon);
    
        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return Total + 5;
        }).then(() => {
            return firebase.database().ref("People/" + id).child("DriveAndShine").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) + 5;
            });
        });
    }

    function driveMinusUpdate(){
        let id = $(this).attr("id");
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0;
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = data.DriveAndShine.AmountSold;
            moneyEarned = data.DriveAndShine.MoneyEarned;
            amountLeft = data.DriveAndShine.AmountLeft;
        });

        amountSold -= 1;
        moneyEarned -= 5;
        amountLeft += 1;

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };

        if(amountLeft <= 0){
            $("#" + id + "driveShineAmountLeft").html("0 Coupons Left");
        }else {
            $("#" + id + "driveShineAmountLeft").html(amountLeft + " Coupons Left");
        }

        $("#" + id + "driveShineTd").html(amountSold + " Coupons Sold");
        $("#" + id + "driveShineMoneyEarned").html("$" + moneyEarned + " Earned");

        // Create amount sold plus button
        var amountSoldPlus = document.createElement("button");
        amountSoldPlus.classList.add("drivePlus");
        amountSoldPlus.id = id;
        $("#" + id + "driveShineTd").append(amountSoldPlus);

        // Create amount sold plus icon
        var amountSoldPlusIcon = document.createElement("i");
        amountSoldPlusIcon.classList.add("material-icons");
        amountSoldPlusIcon.classList.add("small");
        amountSoldPlusIcon.textContent = "keyboard_arrow_up"
        amountSoldPlus.append(amountSoldPlusIcon);

        // Create amount sold minus button
        var amountSoldMinus = document.createElement("button");
        amountSoldMinus.classList.add("driveMinus");
        amountSoldMinus.id = id;
        $("#" + id + "driveShineTd").append(amountSoldMinus);

        // Create amount sold plus icon
        var amountSoldMinusIcon = document.createElement("i");
        amountSoldMinusIcon.classList.add("material-icons");
        amountSoldMinusIcon.classList.add("small");
        amountSoldMinusIcon.textContent = "keyboard_arrow_down"
        amountSoldMinus.append(amountSoldMinusIcon);

        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return Total - 5;
        }).then(() => {
            return firebase.database().ref("People/" + id).child("DriveAndShine").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) - 5;
            });
        });
    }

    // Port A Pit Methods
    function portAPitPlusUpdate(){
        let id = $(this).attr("id");
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0;
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = data.PortAPit.AmountSold;
            moneyEarned = data.PortAPit.MoneyEarned;
            amountLeft = data.PortAPit.AmountLeft;
        });

        amountSold += 1;
        moneyEarned += 5;
        amountLeft -= 1;

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };

        if(amountLeft <= 0){
            $("#" + id + "portAPitAmountLeft").html("0 Coupons Left");
        }else {
            $("#" + id + "portAPitAmountLeft").html(amountLeft + " Coupons Left");
        }

        $("#" + id + "portAPitTd").html(amountSold + " Coupons Sold");
        $("#" + id + "portAPitMoneyEarned").html("$" + moneyEarned + " Earned");

        // Create amount sold plus button
        var amountSoldPlus = document.createElement("button");
        amountSoldPlus.classList.add("portAPitPlus");
        amountSoldPlus.id = id;
        $("#" + id + "portAPitTd").append(amountSoldPlus);

        // Create amount sold plus icon
        var amountSoldPlusIcon = document.createElement("i");
        amountSoldPlusIcon.classList.add("material-icons");
        amountSoldPlusIcon.classList.add("small");
        amountSoldPlusIcon.textContent = "keyboard_arrow_up"
        amountSoldPlus.append(amountSoldPlusIcon);

        // Create amount sold minus button
        var amountSoldMinus = document.createElement("button");
        amountSoldMinus.classList.add("portAPitMinus");
        amountSoldMinus.id = id;
        $("#" + id + "portAPitTd").append(amountSoldMinus);

        // Create amount sold plus icon
        var amountSoldMinusIcon = document.createElement("i");
        amountSoldMinusIcon.classList.add("material-icons");
        amountSoldMinusIcon.classList.add("small");
        amountSoldMinusIcon.textContent = "keyboard_arrow_down"
        amountSoldMinus.append(amountSoldMinusIcon);

        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return parseInt(Total) + 5;
        }).then(() => {
            return firebase.database().ref("People/" + id).child("PortAPit").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) + 5;
            });
        });
    }

    // Port A Pit Methods
    function portAPitMinusUpdate(){
        let id = $(this).attr("id");
        let ref = firebase.database().ref("People/" + id);

        let amountLeft = 0;
        let moneyEarned = 0;
        let amountSold = 0;

        ref.on("value", (snapshot) => {
            let data = snapshot.val();

            amountSold = data.PortAPit.AmountSold;
            moneyEarned = data.PortAPit.MoneyEarned;
            amountLeft = data.PortAPit.AmountLeft;
        });

        amountSold -= 1;
        moneyEarned -= 5;
        amountLeft += 1;

        let update = {
            AmountSold:amountSold,
            MoneyEarned:moneyEarned,
            AmountLeft:amountLeft
        };

        if(amountLeft <= 0){
            $("#" + id + "portAPitAmountLeft").html("0 Coupons Left");
        }else {
            $("#" + id + "portAPitAmountLeft").html(amountLeft + " Coupons Left");
        }

        $("#" + id + "portAPitTd").html(amountSold + " Coupons Sold");
        $("#" + id + "portAPitMoneyEarned").html("$" + moneyEarned + " Earned");

        // Create amount sold plus button
        var amountSoldPlus = document.createElement("button");
        amountSoldPlus.classList.add("portAPitPlus");
        amountSoldPlus.id = id;
        $("#" + id + "portAPitTd").append(amountSoldPlus);

        // Create amount sold plus icon
        var amountSoldPlusIcon = document.createElement("i");
        amountSoldPlusIcon.classList.add("material-icons");
        amountSoldPlusIcon.classList.add("small");
        amountSoldPlusIcon.textContent = "keyboard_arrow_up"
        amountSoldPlus.append(amountSoldPlusIcon);

        // Create amount sold minus button
        var amountSoldMinus = document.createElement("button");
        amountSoldMinus.classList.add("portAPitMinus");
        amountSoldMinus.id = id;
        $("#" + id + "portAPitTd").append(amountSoldMinus);

        // Create amount sold plus icon
        var amountSoldMinusIcon = document.createElement("i");
        amountSoldMinusIcon.classList.add("material-icons");
        amountSoldMinusIcon.classList.add("small");
        amountSoldMinusIcon.textContent = "keyboard_arrow_down"
        amountSoldMinus.append(amountSoldMinusIcon);

        // firebase.database().ref("Total").set({Total:total + moneyEarned});
        firebase.database().ref("/").child("Total").transaction((Total) => {
            return parseInt(Total) - 5;
        }).then(() => {
            return firebase.database().ref("People/" + id).child("PortAPit").update(update);
        }).then(() => {
            firebase.database().ref("People/" + id).child("TotalEarned").transaction((Total) => {
                return parseInt(Total) - 5;
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