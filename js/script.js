$(function () {


    /*-------------------------------------------
    Load Page
    ---------------------------------------------*/

    $('body').waitForImages({
        finished: function () {
            Website();
            $('body').jKit();
        },
        waitForAll: true
    });


    /*-------------------------------------------
    Ajax link page transitions
    ---------------------------------------------*/

    $("a.ajax-link").live("click", function () {
        $this = $(this);
        var link = $this.attr('href');
        var current_url = $(location).attr('href');

        if (link != current_url && link != '#') {
            $.ajax({
                url: link,
                processData: true,
                dataType: 'html',
                success: function (data) {
                    document.title = $(data).filter('title').text();
                    current_url = link;
                    if (typeof history.pushState != 'undefined') history.pushState(data, 'Page', link);

                    setTimeout(function () {
                        $('#preloader').delay(50).fadeIn(600);
                        $('html, body').delay(1000).animate({ scrollTop: 0 }, 1000);

                        setTimeout(function () {

                            $('#ajax-content').html($(data).filter('#ajax-content').html());
                            $('#ajax-sidebar').html($(data).filter('#ajax-sidebar').html());

                            $('body').waitForImages({
                                finished: function () {
                                    Website();
                                    backLoading();
                                    $('.opacity-nav').delay(50).fadeOut(600);
                                },
                                waitForAll: true
                            });
                        }, 1000);
                    }, 0);
                }
            });
        }
        return false;
    });


    /*-------------------------------------------
    When you click back arrow
    ---------------------------------------------*/


    function backLoading() {
        $(window).on("popstate", function () {
            $('body').fadeOut('slow', function () {
                location.reload();
            });
            $('body').fadeIn();
        });
    }

    /*-------------------------------------------
    Load Page - next Open Site
    ---------------------------------------------*/

    function Website() {
        CheckScripts();
        Masonry();
        $('body').jKit();
        backgroundmenu();
        setTimeout(function () {
            $(".preloader").fadeOut(500);
        }, 2000);
        setTimeout(function () {
            $('header').fadeIn();
        }, 500);
    }


    /*-------------------------------------------
    Init and check list scripts
    ---------------------------------------------*/

    function CheckScripts() {

        $(document).ready(function () {
            preloaderCheck();
            Typewriting();
            sidebarhero();
        });

    }


    /*-------------------------------------------
    Masonry Check Script
    ---------------------------------------------*/

    function Masonry() {
        var $container = $('.portfolio-grid');

        $container.imagesLoaded(function () {
            $container.masonry({
                itemSelector: 'li'
            });
        });
    }


    /*-------------------------------------------
    Multi purpose init Background menu
    ---------------------------------------------*/

    function backgroundmenu() {

        $(document).ready(function () {
            if ($("#header-fade").length) {

                $(window).scroll(function () {
                    if ($(this).scrollTop() > 10) {
                        $('header').fadeOut();
                    } else {
                        $('header').fadeIn();
                    }
                });
            }

            if ($("#header-white").length) {

                $(window).scroll(function () {
                    if ($(this).scrollTop() > 10) {
                        $('header').css("background", "white");
                        $('header .logo > a').css("borderBottom", "0");

                    } else {
                        $('header').css("background", "none");
                    }
                });
            }


        });

    }

    /*-------------------------------------------
    Typewriting init script
    ---------------------------------------------*/

    function Typewriting() {


        $(document).ready(function () {
            setTimeout(function () {
                if ($("#site-type").length) {
                    $(".typewrite span").typed({
                        strings: ["show case ", "projects "],
                        typeSpeed: 100,
                        backDelay: 500,
                        loop: false,
                        contentType: 'html', // or text
                        // defaults to false for infinite loop
                        loopCount: false,
                    });
                }
            }, 3000);
        });
    }


    /*-------------------------------------------
    Amazing Fade with scroll Sidebar
    ---------------------------------------------*/

    function sidebarhero() {

        if ($("#hero").length) {
            var fadeStart = 100,
                fadeUntil = 800,
                fading = $('#hero');

            $(window).bind('scroll', function () {
                var offset = $(document).scrollTop(),
                    opacity = 0;
                if (offset <= fadeStart) {
                    opacity = 1;
                } else if (offset <= fadeUntil) {
                    opacity = 1 - offset / fadeUntil;
                }
                fading.css('opacity', opacity);
            });
        }
    }


    /*-------------------------------------------
    Open Check Scription
    ---------------------------------------------*/

    function OpenCheck() {
        setTimeout(function () {
            hidePreloader();
        }, 1000);
    }


    /*-------------------------------------------
    Check Preloader
    ---------------------------------------------*/

    function preloaderCheck() {
        showPreloader();
        $(window).load(function () {
            hidePreloader();
        });
    }

    /*-------------------------------------------
    Functions Show / Hide Preloader
    ---------------------------------------------*/

    function showPreloader() {
        $(".preloader").fadeIn("slow");
    }

    function hidePreloader() {
        $(".preloader").delay(2000).fadeOut("slow");
    }


    /*-------------------------------------------
    Calendar Functions
    ---------------------------------------------*/

    // FUNCTIONS FOR READ ONLY CALENDAR (calendar that shows at index)


    // Triggers hidden modal with default calendar
    $('#calendarModal').on('show.bs.modal', function (event) {
        var triggerElement = $(event.relatedTarget);
    });

    // DIV readOnlyCalendar
    $(document).ready(function () {
        alert("Hello! I am an alert box!!");
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
            noEventsMessage: "We're sorry! There are currently no events for the given timeframe."
        });
    });

    // FUNCTIONS FOR USER EDITATBLE CALENDAR (calendar that shows at user profile)


}) //End