module.exports = function(app) {

    var firebase = require("firebase");
    var bodyParser = require("body-parser"); //Import bodyParser so we can read request body data


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
    var usersRef = database.ref('users');
    var roomsRef = database.ref('rooms');
    var roomRef = roomsRef.child('rooms');

    function snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            //item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    function currentUser() {
        var returnArr = "";
        var user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            returnArr = user.uid
            console.log(returnArr);
            return returnArr
        } else {
            // No user is signed in.
            console.log(returnArr);
            return returnArr
        }
    };

    app.get('/', function(req, res) {
        console.log("Am in get /")
        res.render('index.ejs');
    });
    app.get('/signin', function(req, res) {
        console.log("Am in get /signin")
        res.render('signin.ejs');
    });

    app.get('/signup', function(req, res) {
        console.log("Am in get /signup")
        res.render('signup.ejs');
    });
    /*app.get('/profile_data', function(req, res) {
        console.log("In profile_data")
        roomsRef.on("value", function(snapshot) {

            var data = snapshotToArray(snapshot);
            console.log(data);
            //res.render('calender', { posts: data });
            res.json(data);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });*/

    /*app.get('/profile', function(req, res) {
        console.log("Am in get /profile")
            //res.render('profile');
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                //console.log("Currently logged in", user.uid);
                res.render('profile');
            } else {
                // No user is signed in.
                console.log("Currently Not logged in");
                res.redirect('signin');
            }
        });
    });*/
    app.get('/profile', function(req, res) {
        console.log("Am in get /profile")
        res.render('profile');
    });
    app.post('/profile', function(req, res) {
        console.log("Am in Post /profile")
        var auth = req.body.auth;
        console.log(auth);
        res.render('profile');
    });

    app.get('/calender', function(req, res) {
        console.log("Am in get /signin")

        //usersRef.on("value", function(snapshot) {
        roomsRef.on("value", function(snapshot) {

            var data = snapshotToArray(snapshot);
            console.log(data);
            res.render('calender', { posts: data });
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
    app.get('/feedback', function(req, res) {
        console.log("Am in get /feedback")
        res.render('feedback.ejs');
    });

    app.post('/signin', function(req, res) {
        console.log("Am in Post /signin")

        var email = req.body.email;
        var password = req.body.password;

        /*firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                // Success
                var user = firebase.auth().currentUser;
                console.log("Success");
                res.json({
                    success: true,
                    message: "Success",
                    user: user.uid
                });
            })
            .catch(function(error) {
                // Error Handling
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signIn error', errorMessage);
                res.json({
                    success: false,
                    message: errorMessage,
                    user: ""
                });
            });*/
    });

    app.post('/signup', function(req, res) {
        console.log("Am in Post /signup")

        var email = req.body.email;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        var events = req.body.events;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                //Success
                console.log("signUp Successful!");
                //loginUser(email, password);
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function(firebaseUser) {
                        // Success
                        console.log(" login Success ");
                        var user = firebase.auth().currentUser;
                        console.log("Success");
                        var userObject = {
                            email: email,
                            firstname: firstname,
                            userID: user.uid,
                            events: events
                        }
                        usersRef.push(userObject);
                        res.json({
                            success: true,
                            message: "Success",
                            user: user.uid
                        });
                    })
                    .catch(function(error) {
                        // Error Handling
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log('signIn error', error);
                        res.json({
                            success: false,
                            message: errorMessage,
                            user: ""
                        });
                    });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signUp error', error);
                res.json({
                    success: false,
                    message: errorMessage,
                    user: ""
                });
            });
    });


    app.post('/signout', function(req, res) {
        console.log("Am in Post /signout")

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Sign-out successful");
            res.render('signin.ejs');
        }).catch(function(error) {
            // An error happened.
            console.log(error.message);
            res.status(401).send(error.message);
        });
    });
}