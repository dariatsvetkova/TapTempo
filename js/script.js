// 1. BPM CALCULATOR

var tapTime = [];
var firstTap = true;
var inactivity = 0; 

function tap() {
    calculateBPM();
    animateButton();
}

function calculateBPM() {    

    //Cancels inactivity detector, hides inactivity alert:
    clearTimeout(inactivity);
    if (!$(".reset-alert p").hasClass("hide")) {
        $(".reset-alert p").addClass("hide");
    }
    let addTap;
    let removeTap;

    //Checks if it is the 1st tap/click/key press, and skips calculation until there are at least 2 taps:
    if (firstTap === true) {
        firstTap = false;
        addTap = tapTime.unshift(Date.now());
        $(".result-bpm").text("0");
    } else {
        
    //Calculates average bpm based on last <= 4 taps:
        addTap = tapTime.unshift(Date.now());

        if (tapTime.length > 4) {
            removeTap = tapTime.pop();
        }

        let averageBPM = Math.round ((tapTime.length - 1) / (tapTime[0] - tapTime[tapTime.length - 1]) * 60000);
        $(".result-bpm").text(averageBPM);
    }

    //Activates inactivity detector:
    inactivity = setTimeout(detectInactivity, 60000);
}

//Resets all values when the "start over" button is pressed, hides the inactivity alert:
function reset() {

    clearTimeout(inactivity);

    $(".result-bpm").text("");
    firstTap = true;
    tapTime = [];
    $(".reset-button").blur();
    if (!$(".reset-alert p").hasClass("hide")) {
        $(".reset-alert p").addClass("hide");
    }
}

//Runs if there were no taps for over 60sec, shows the inactivity alert and resets the values:
function detectInactivity() {

        $(".reset-alert p").removeClass("hide");
        firstTap = true;
        tapTime = [];
}

function animateButton() {
    $("#tapping-button").stop(false, true).animate({cx: "+=3",
                        cy: "+=3"
                        }, 40, "linear")
                        .stop(false, true).animate({cx: "-=3",
                        cy: "-=3"
                        }, 40, "linear");
}

//Event listeners:
$(".tapping-area").on("click", tap);
$("body").on("keypress", tap);
$(".reset-button").on("click", reset);

// 2. MOBILE TEXT DROP-DOWN

if ($(window).width() <= 600) {

    $(".mob-hidden p:last").append(" <a id = 'mob-hide' href='#' style = 'display: inline'>Hide</a>");
    $(".mob-hidden").hide();
    $(".intro p:first").append(" <a id = 'mob-expand' href='#' style = 'display: inline'>More...</a>");

    $("#mob-expand").click(function() {
        $("#mob-expand").hide();
        $(".mob-hidden").slideDown(300, "swing");
        $("#mob-hide").show();
        $("body").addClass("expanded");
    });

    $("#mob-hide").click(function() {
        $("#mob-hide").hide();
        $(".mob-hidden").slideUp(300, "swing");
        $("#mob-expand").show();
        $("body").removeClass("expanded");
    });
}