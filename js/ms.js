$(document).ready(function() {

    ///index code

    $("profile_body").ready(function() {
        $.ajax({
            type: 'GET',
            url: '/profile_data',
            success: function(result) {
                console.log(result);
            },
            error: function(textStatus, errorThrown) {
                alert(result);
                alert("result");
            }
        });
    });

    $('#button').on('click', function() {
        $(".opacity-nav").fadeToggle("slow", "linear");
        // Animation complete.
    });

    $('#reserveBtn').click(function() {
        //document.getElementById('calendarModal').style.display = "none";
        //$('#calendarModal').modal('toggle');
        $('#modal').modal('show');
    });

    function loginUser(email, password) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                // Success
                console.log("Success ");
                //window.location = "../html/main.html"; // Redirecting to other page.
            })
            .catch(function(error) {
                // Error Handling
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signIn error', error);
            });
    }

    function logoutUser() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Sign-out successful");
        }).catch(function(error) {
            // An error happened.
            console.log(error.message);
            res.status(401).send(error.message);
        });
    }

    function registarUser(firstname, lastname, email, password, cpassword) {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                // Success
                console.log("Successful signUp");
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('signUp error', error);
            });
    }


    function reserveRoom(obj) {
        var str = "Would you like to reserve room " + $(obj).attr("title") + "?";
        if (confirm(str)) {
            document.location.href = "account.html";
        } else {
            return false;
        }
    };

    $('#calendarModal').on('show.bs.modal', function(event) {
        var triggerElement = $(event.relatedTarget);
    });

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
        events: [{
            title: 'All Day Event',
            start: '2018-04-01',
            description: 'Event Notes',
            color: 'red'
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
        }],
        resources: [{
            id: 'a',
            title: 'Auditorium A'
        }, {
            id: 'b',
            title: 'Auditorium B'
        }, {
            id: 'c',
            title: 'Auditorium C'
        }, {
            id: 'd',
            title: 'Auditorium D'
        }, {
            id: 'e',
            title: 'Auditorium E'
        }, {
            id: 'f',
            title: 'Auditorium F'
        }],
        noEventsMessage: "There are currently no events for the given time."
    });
    //calendar code

    // script to trigger modal 
    $('#btn').click(function() {
        $('#modal').modal('show');
    });

    // script to test fullCalendar

    $('#calendar').fullCalendar({
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        eventLimit: true,
        header: {
            left: 'month,agendaWeek,agendaDay addEvent',
            center: 'title',
            right: 'prev  today next'
        },
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
        businessHours: { // adds shading for business hours M-F 7:30-5:00pm
            start: '7:30',
            end: '17:00'
        },
        nowIndicator: true,
        selectable: true,
        editable: false, // set master edit to be false (use cannot edit events already in db)
        select: function(eventObj) {
            $('#dialog').dialog('open');
        },
        /*eventClick: function (eventObj) {
          if (eventObj.url) {
            alert(
              'Opening ' + eventObj.url + ' in a new tab'
            );
            window.open(eventObj.url);

            return false; // prevents browser from following link in current tab.
          } else {
            alert('Event ' + eventObj.title + ": " + eventObj.description);
          }
        },*/
        googleCalendarApiKey: 'AIzaSyDsH-NZ4FqEFb_s7HaoBXkRyVx-g2HCpss',
        events: {
            googleCalendarId: '130e63e17r6pi9805unrea5c2s@group.calendar.google.com'
        },
        events: 'en.usa#holiday@group.v.calendar.google.com',
        events: [{
            title: 'All Day Event',
            start: '2018-04-01',
            description: 'Event Notes',
            color: 'red'
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
        }],
    });


    // Tests calendar in agenda view (possible read only view for users)

    $('#calendar2').fullCalendar({
        defaultView: 'timelineDay',
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        selectable: true,
        header: {
            left: 'promptResource today prev,next',
            center: 'title',
            right: 'timelineDay,timelineWeek,timelineMonth'
        },
        customButtons: {
            promptResource: {
                text: '+Room',
                click: function() {
                    var str = prompt('Enter room name in the format "Building,Room" (no spaces)');
                    var arr = str.split(",");
                    if (arr.length >= 2) {
                        $('#calendar2').fullCalendar(
                            'addResource', {
                                title: arr[1],
                                building: arr[0]
                            },
                            true // scroll to the new resource?
                        );
                    }
                }
            }
        },
        resourceLabelText: 'Rooms Available',
        resourceColumns: [{
            group: true,
            labelText: 'Location',
            field: 'building'
        }, {
            labelText: 'Room',
            field: 'title'
        }, {
            labelText: 'Info',
            field: 'description'
        }],
        resources: [{
            id: 'a',
            building: 'Lawson-B',
            title: 'A',
            description: 'lab'
        }, {
            id: 'b',
            building: 'Lawson-B',
            title: 'B',
            description: 'lab'
        }, {
            id: 'c',
            building: 'Lawson-B',
            title: 'C',
            description: 'lab'
        }, {
            id: 'd',
            building: 'Lawson-M',
            title: 'D',
            description: 'lab'
        }, {
            id: 'e',
            building: 'Lawson-M',
            title: 'E',
            description: 'lab'
        }, {
            id: 'f',
            building: 'Lawson-M',
            title: 'F',
            description: 'lab'
        }],
        /*dayClick: function (date, jsEvent, view, resource) {
            alert('Confirm reservation for  ' + date.format() + ' at ' + resource.id + '?');
          },*/
        select: function(startDate, endDate, jsEvent, view, resource) {
            alert('Confirm reservation for  ' + startDate.format() + ' to ' + endDate.format() + ' at ' + resource.id + '?');
        },
    });


    // List view (possible read only view for users) readOnlyCalendar

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
        defaultView: "listWeek",
        resourceLabelText: 'Rooms Available',
        events: [{
            title: 'All Day Event',
            start: '2018-04-01',
            description: 'Event Notes',
            color: 'red'
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
        }],
        resources: [{
            id: 'a',
            title: 'Auditorium A'
        }, {
            id: 'b',
            title: 'Auditorium B'
        }, {
            id: 'c',
            title: 'Auditorium C'
        }, {
            id: 'd',
            title: 'Auditorium D'
        }, {
            id: 'e',
            title: 'Auditorium E'
        }, {
            id: 'f',
            title: 'Auditorium F'
        }],
        noEventsMessage: "There are currently no events for the given time."
    });
});