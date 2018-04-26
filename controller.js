module.exports = function (app) {

    var firebase = require("firebase");
    var bodyParser = require("body-parser"); //Import bodyParser so we can read request body data

    var mongoose = require('mongoose');

    //mongoose.connect('mongodb://abah:abah@ds247619.mlab.com:47619/lswpmap');

    //mongoose.connect(keys.mongodb.dbURI);

    var userSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        events: {
            date: String,
            time: String,
            room: String
        }
    });

    var roomSchema = new mongoose.Schema({
        events: {
            title: String,
            start: String,
            end: String,
            editable: Boolean,
        },
        owner: String
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    var config = {
        apiKey: "AIzaSyAvL3fwqb_PqPxNUy3mW3x94LtQG5zMRY8",
        authDomain: "lwsnmaps.firebaseapp.com",
        databaseURL: "https://lwsnmaps.firebaseio.com",
        projectId: "lwsnmaps",
        storageBucket: "",
        messagingSenderId: "662081766321"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    function isAdmin(req, res, next) {

        var user = req.body;
        console.log("Fetched user : ", user);
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
                //allow next route to run
                next();
            } else {
                // User is signed out.
                // ...
                res.status(401).send("Permission denied. Admin Only");
            }
        });
    }

    function loginUser(email, password) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                // Success
                console.log("Success ");
                //window.location = "../html/main.html"; // Redirecting to other page.
            })
            .catch(function (error) {
                // Error Handling
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signIn error', error);
            });
    }

    function logoutUser() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Sign-out successful");
        }).catch(function (error) {
            // An error happened.
            console.log(error.message);
            res.status(401).send(error.message);
        });
    }

    function authUser() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("Currently logged in");
                //next();
            } else {
                // No user is signed in.
                console.log("Currently Not logged in");
                res.json({
                    message: "Currently Not logged in"
                })
            }
        });
    }

    function registarUser(firstname, lastname, email, password, cpassword) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                // Success
                console.log("Successful signUp");
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signUp error', error);
            });
    }

    app.post('/createUserEvent', function (req, res) {
        console.log('called createUserEvent');

        // Gets the fields from the form
        var newRoomName = req.body.roomname;
        var currUser = req.body.userAuth;
        var newEventTitle = req.body.eventTitle;
        var newEventDescription = req.body.eventDescription;
        var newEventDate = req.body.eventDate;
        var newEventStart = req.body.startTime;
        var newEventEnd = req.body.endTime;

        // Database refs
        var userRef = database.ref('/users');
        var roomsRef = database.ref('/rooms');
        var currRoomRef = database.ref('/rooms/' + newRoomName + '/events');
        var eventId = newRoomName + '-' + newEventTitle;
        console.log(eventId);
        //console.log(currRoomRef);

        currRoomRef.child(currUser).set({
                eventUser: currUser,
                title: newEventTitle,
                description: newEventDescription,
                date: newEventDate,
                start: newEventStart, 
                end: newEventEnd
        });

        // Printing fields
        console.log("Room name: " + newRoomName);
        console.log("Current User: " + currUser)
        console.log("Event Title: " + newEventTitle);
        console.log("Event Description: " + newEventDescription);
        console.log("Event Date: " + newEventDate);
        console.log("Event Start time: " + newEventStart);
        console.log("Event End Time: " + newEventEnd);


        if (currUser === "") {                      // check if currUser field exists
            console.log("currUserVarEmpty");
        }
        else {
            console.log("user var has some value");
        }

        res.render('signin.ejs');

        return userRef.push('testing adding to firebase');
    });

    app.post('/searchForUser', function (req, res) {
        console.log('called searchForUser');
        var roomName = req.body.searchRoom;
        var currUser = req.body.searchUser;
        console.log(roomName);
        console.log(currUser);

        var currRoomRef = database.ref('/rooms/' + roomName + '/events/' + currUser);
        //console.log(currRoomRef);

        currRoomRef.on("value", function(snapshot) {
            console.log("title: " + snapshot.val().title);
            console.log("date: " + snapshot.val().date);
            console.log("description: " + snapshot.val().description);
            console.log("start: " + snapshot.val().start);
            console.log("end: " + snapshot.val().end);

            res.json({title: snapshot.val().title, date: snapshot.val().date, description: snapshot.val().description,
            start: snapshot.val().start, end: snapshot.val().end});
          });
        
          //res.render('search.ejs');
          
    });


    function createRoomEvent() { // creates event and adds it to the rooms info in firebase
        var roomRef = database.ref('/rooms');
    }


    app.get('/', function (req, res) {
        console.log("Am in get /")
        res.render('index.ejs');
    });


    app.get('/signin', function (req, res) {
        console.log("Am in get /signin")
        res.render('signin.ejs');
    });

    app.get('/signup', function (req, res) {
        console.log("Am in get /signup")
        res.render('signup.ejs');
    });

    app.get('/profile', function (req, res) {
        console.log("Am in get /profile")
        //res.render('profile.ejs');
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("Currently logged in");
                res.render('profile.ejs');
            } else {
                // No user is signed in.
                console.log("Currently Not logged in");
                res.render('signin.ejs');
            }
        });
    });


    app.get('/calendar', function (req, res) {
        console.log("Am in get /calendar")
        res.render('calendar.ejs');
    });

    app.get('/search', function (req, res) {
        console.log("Am in get /search")
        res.render('search.ejs');
    });

    app.get('/feedback', function (req, res) {
        console.log("Am in get /feedback")
        res.render('feedback.ejs');
    });

    app.post('/signin', function (req, res) {
        console.log("Am in Post /signin")

        var email = req.body.si_email;
        var password = req.body.si_password;

        //loginUser(email, password)
        //res.render('signin.ejs');
        /*res.json({
            message: "Sucessful Sign In"
        });*/

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                // Success
                console.log("Success ");
                //console.log(user);
                //res.render('profile.ejs');
                res.render('search.ejs');
            })
            .catch(function (error) {
                // Error Handling
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signIn error', errorMessage);
                res.json({
                    message: errorMessage
                });
            });
    });

    app.post('/signup', function (req, res) {
        console.log("Am in Post /signup")

        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.su_email;
        var password = req.body.su_password;
        var cpassword = req.body.su_cpassword;

        registarUser(firstname, lastname, email, password, cpassword)
        //res.render('signin.ejs');
        res.json({
            message: "Sucessful Sign In"
        });;
    });

    app.post('/profile', function (req, res) {
        console.log("Am in Post /profile")
    });


    app.post('/signout', function (req, res) {
        console.log("Am in Post /signout")

        //loginUser(email, password)
        //res.render('signin.ejs');
        /*res.json({
            message: "Sucessful Sign out"
        });*/
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Sign-out successful");
            res.render('signin.ejs');
        }).catch(function (error) {
            // An error happened.
            console.log(error.message);
            res.status(401).send(error.message);
        });
    });

}