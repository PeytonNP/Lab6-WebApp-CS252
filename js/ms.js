$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAvL3fwqb_PqPxNUy3mW3x94LtQG5zMRY8",
        authDomain: "lwsnmaps.firebaseapp.com",
        databaseURL: "https://lwsnmaps.firebaseio.com",
        projectId: "lwsnmaps",
        storageBucket: "lwsnmaps.appspot.com",
        messagingSenderId: "662081766321"
    };
    firebase.initializeApp(config);
    const auth = firebase.auth()

    var database = firebase.database();
    var usersRef = database.ref('users');
    var roomsRef = database.ref('rooms');
    var roomRef = roomsRef.child('rooms');
    ///index code

    //var user = firebase.auth().currentUser;
    if (sessionStorage.getItem("sessID")) {
        var current_user = "";
        usersRef.on("value", function(snapshot) {

            var data = snapshotToArray(snapshot);
            console.log(data.email);
            data.forEach(function(childSnap) {
                if (childSnap.userID === sessionStorage.getItem("sessID")) {
                    current_user = childSnap;
                }
            });
            console.log(data);
            $('#readOnlyCalendar').fullCalendar({
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                views: {
                    listDay: {
                        buttonText: "Events Today"
                    },
                    listWeek: {
                        buttonText: "Events this Week"
                    },
                    listMonth: {
                        buttonText: "Events this Month"
                    }
                },
                header: {
                    left: 'prev today next',
                    center: 'title',
                    right: 'listDay,listWeek,listMonth'
                },
                defaultView: "listMonth",
                resourceLabelText: 'Rooms Available',
                events: current_user.events,

                noEventsMessage: "There are currently no events for the given time."
            });
            $("#blanket").show();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    } else {
        // No user is signed in.
        alert("hide");

        $("#blanket").hide();
        console.log("No user is signed in")
    }
    /*$('#profile_body').on('load', function() {
        console.log("my body has loaded")
        $.ajax({
            type: 'GET',
            url: '/profile_data',
            success: function(result) {
                console.log("my body has loaded")
                    //console.log("result");

            },
            error: function(textStatus, errorThrown) {
                console.log("result");
            }
        });
    });*/
    $('#button').on('click', function() {
        $(".opacity-nav").fadeToggle("slow", "linear");
        // Animation complete.
    });

    $('#reserveBtn').click(function() {
        //document.getElementById('calendarModal').style.display = "none";
        //$('#calendarModal').modal('toggle');
        $('#modal').modal('show');
    });


    function logoutUser() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Sign-out successful");
            window.location.href = '/signin';
        }).catch(function(error) {
            // An error happened.
            console.log(error.message);
            res.status(401).send(error.message);
        });
    }

    function reserveRoom(obj) {
        var str = "Would you like to reserve room " + $(obj).attr("title") + "?";
        if (confirm(str)) {
            document.location.href = "account.html";
        } else {
            return false;
        }
    }

    function addevent() {

        var room = "B164"
        var title = $('#firstname_txt').val();
        var start_date = $('#lastname_txt').val();
        var start_time = $('#lastname_txt').val();
        var description = $('#su_email_txt').val();
        var end_date = $('#su_password_txt').val();
        var end_time = $('#su_password_txt').val();
        var color = $('#su_confirmpassword_txt').val();

        var temobject = {
            title: 'Meeting',
            start: '2018-04-12T10:30:00',
            description: 'Event Notes',
            end: '2018-04-12T12:30:00',
            color: 'black',
            editable: true // user can edit this event (user events are editable)
        };
        var event = {
            title: title,
            start: str1.concat(start_date, 'T', start_time),
            description: 'Event Notes',
            end: '2018-04-12T12:30:00',
            color: 'black',
            editable: true
        };
    }

    function regUser() {
        var firstname = $('#firstname_txt').val();
        var lastname = $('#lastname_txt').val();
        var email = $('#su_email_txt').val();
        var password = $('#su_password_txt').val();
        var cpassword = $('#su_confirmpassword_txt').val();
        var userID = "";
        var events = [{
            title: 'Meeting',
            start: '2018-04-12T10:30:00',
            description: 'Event Notes',
            end: '2018-04-12T12:30:00',
            color: 'black',
            editable: true // user can edit this event (user events are editable)
        }, ];


        var newUser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            userID: userID,
            events: events
        };
    }
    var events = [{
        title: 'All Day Event',
        start: '2018-04-01',
        description: 'Event Notes',
        color: 'red'
    }, {
        title: 'Purdue day of giving',
        start: '2018-04-25',
        description: 'Purdue day of giving',
        end: '2018-04-25',
        color: 'green'
    }, {
        title: 'Conference',
        start: '2018-04-11',
        description: 'Event Notes',
        end: '2018-04-13',
        color: 'green'
    }, {
        title: 'Meeting',
        start: '2018-04-12T10:30:00',
        description: 'Event Notes',
        end: '2018-04-12T12:30:00',
        color: 'black',
        editable: true // user can edit this event (user events are editable)
    }, {
        title: 'Click for Google',
        url: 'http://google.com/',
        description: 'Event Notes',
        start: '2018-04-28',
        color: 'blue',
        editable: true // user can edit this event (user events are editable)
    }];
    $('#login_btn').on('click', function() {
        userLogin();
    });
    $('#logOut_btn').on('click', function() {
        logoutUser();
    });

    //$('#login_btn').click(userLogin());
    function userLogin() {
        var email = $('#si_email_txt').val();
        var password = $('#si_password_txt').val();

        console.log(email, password);
        if (email === "") {
            alert("Email is required.");
            return;
        }
        if (password === "") {
            alert("Password is required.");
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                // Success
                console.log("Success")
                var user = firebase.auth().currentUser;
                if (user) {
                    console.log("user is signed in")
                    var url = '/profile' + '?auth=' + user.uid;
                    sessionStorage.setItem("sessID", user.uid);
                    window.location.href = url;
                    // User is signed in.
                } else {
                    // No user is signed in.
                    console.log("No user is signed in")
                }
            })
            .catch(function(error) {
                // Error Handling
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signIn error', errorMessage);
            });
        /*$.ajax({
                type: 'POST',
                url: '/profile',
                data: {
                    email: email,
                    password: password,
                },
                success: function(data) {
                    var user = firebase.auth().currentUser;
                    console.log(data.success)
                    window.location.href = '/profile?uid = user.uid';
                },
                error: function(err) {
                    console.log(err);
                }
            });*/

    }
    $('#register_btn').on('click', function() {
        regUser();
    });

    function regUser() {
        var email = $('#si_email_txt').val();
        var password = $('#si_password_txt').val();
        var firstname = $('#firstname_txt').val();
        var lastname = $('#lastname_txt').val();
        var email = $('#su_email_txt').val();
        var password = $('#su_password_txt').val();
        var cpassword = $('#su_confirmpassword_txt').val();
        var userID = "";

        if (email === "") {
            alert("Email is required.");
            return;
        }
        if (password === "") {
            alert("Password is required.");
            return;
        }
        if (password !== cpassword) {
            alert("Password Mismatch.");
            return;
        }

        var events = [{
            title: 'Meeting',
            start: '2018-04-12T10:30:00',
            description: 'Event Notes',
            end: '2018-04-12T12:30:00',
            color: 'black',
            editable: true // user can edit this event (user events are editable)
        }, ];

        $.ajax({
            type: 'POST',
            url: '/signup',
            data: {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                email: email,
                userID: userID,
                events: events
            },
            success: function(data) {
                console.log(data.success)
                window.location.href = '/profile';
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    function snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            //item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };
    // script to trigger modal
    var roomid = "";
    var current_room = "";
    $('area').on('click', function() {
        roomid = $(this).attr('id'); // gets the id of a clicked link that has a class of menu
        roomsRef.on("value", function(snapshot) {

            var data = snapshotToArray(snapshot);
            data.forEach(function(childSnap) {
                if (childSnap.roomname === roomid) {
                    current_room = childSnap;
                }
            });
            console.log(data);
            $('#readOnlyCalendar').fullCalendar({
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                views: {
                    listDay: {
                        buttonText: "Events Today"
                    },
                    listWeek: {
                        buttonText: "Events this Week"
                    },
                    listMonth: {
                        buttonText: "Events this Month"
                    }
                },
                header: {
                    left: 'prev today next',
                    center: 'title',
                    right: 'listDay,listWeek,listMonth'
                },
                defaultView: "listMonth",
                resourceLabelText: 'Rooms Available',
                events: current_room.events,

                noEventsMessage: "There are currently no events for the given time."
            });
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });


    //calendar code

    // script to trigger modal 
    $('#btn').click(function() {
        $('#modal').modal('show');
    });

});