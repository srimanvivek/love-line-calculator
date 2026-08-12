let selectedGender = null;

const form = document.getElementById("loveForm");


// =====================================================
// PAGE SWITCH
// =====================================================

function showPage(pageID) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageID).classList.add("active");

    window.scrollTo(0, 0);
}


// =====================================================
// GENDER SELECTION
// =====================================================

function selectGender(button) {

    document.querySelectorAll(".gender").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedGender = button.dataset.gender;

    document.getElementById("gender").value = selectedGender;
}


// =====================================================
// CAPTCHA AUDIO
// =====================================================

function playCaptcha() {

    const audio =
        document.getElementById("captchaAudio");

    audio.currentTime = 0;

    audio.play().catch(() => {
        console.log("CAPTCHA audio could not be played.");
    });
}


// =====================================================
// FORM SUBMISSION
// =====================================================

form.addEventListener("submit", function (e) {

    e.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const captcha =
        document.getElementById("captcha").value.trim();

    const gender =
        document.getElementById("gender").value;


    // -------------------------------------------------
    // NAME CHECK
    // -------------------------------------------------

    if (!name) {

        alert("Naam toh daal bhai 😭");

        return;
    }


    // -------------------------------------------------
    // GENDER CHECK
    // -------------------------------------------------

    if (!gender) {

        alert("Gender select karna padega 💀");

        return;
    }


    // -------------------------------------------------
    // CAPTCHA CHECK
    // -------------------------------------------------

    if (captcha !== "9685") {

        alert(
            "❌ CAPTCHA galat hai!\n\n" +
            "Audio dobara suno aur code dhyaan se sunna 😭"
        );

        return;
    }


    // =================================================
    // EVERYTHING IS VALID
    // =================================================


    /*
        IMPORTANT:

        prank.mp3 starts RIGHT NOW,
        directly from the Calculate button click.

        It will NOT wait for the 14-second timer.
    */

    const prankAudio =
        document.getElementById("prankAudio");

    prankAudio.currentTime = 0;

    prankAudio.volume = 1.0;

    prankAudio.play().catch(() => {

        console.log(
            "Prank audio autoplay was blocked by the browser."
        );

    });


    // Show the love-life result
    generateResult(name, gender);

});


// =====================================================
// LOVE RESULT
// =====================================================

function generateResult(name, gender) {

    showPage("result");


    const title =
        document.getElementById("resultTitle");

    const text =
        document.getElementById("resultText");

    const percentage =
        document.getElementById("percentage");

    const meter =
        document.getElementById("meterFill");


    let result;


    // =================================================
    // MALE RESULT
    // =================================================

    if (gender === "male") {

        result = {

            title:
                `${name}, you're actually a catch. 👑`,

            text:
                `${name}, your love line says you're someone ` +
                `who values loyalty, confidence and genuine connection. ` +
                `You're not meant for random drama — someone lucky ` +
                `is eventually going to realise what they've got. ❤️`

        };


    }

    // =================================================
    // FEMALE RESULT
    // =================================================

    else {

        result = {

            title:
                `${name}, main character energy detected. ✨`,

            text:
                `${name}, your love line shows a strong personality, ` +
                `a warm heart and dangerously high standards. ` +
                `Anyone entering your life better come prepared — ` +
                `because you're definitely not settling for boring. 💅❤️`

        };

    }


    // =================================================
    // DISPLAY RESULT
    // =================================================

    title.innerText =
        result.title;

    text.innerText =
        result.text;


    // =================================================
    // LOVE SCORE
    // =================================================

    const loveScore =
        Math.floor(Math.random() * 16) + 82;


    percentage.innerText =
        loveScore + "%";


    setTimeout(() => {

        meter.style.width =
            loveScore + "%";

    }, 300);


    // =================================================
    // START 14 SECOND COUNTDOWN
    // =================================================

    startPrankCountdown();

}


// =====================================================
// 14 SECOND COUNTDOWN
// =====================================================

function startPrankCountdown() {

    let remaining = 10;


    const countdown =
        document.getElementById("countdown");


    countdown.innerText =
        `Finalising your destiny... ${remaining}s`;


    const timer =
        setInterval(() => {

            remaining--;


            if (remaining > 0) {

                countdown.innerText =
                    `Finalising your destiny... ${remaining}s`;

            }


            else {

                clearInterval(timer);


                countdown.innerText =
                    "Destiny calculated. 💘";


                // Show prank screen
                // NOTE: music is already playing
                startPrank();

            }

        }, 1000);

}


// =====================================================
// PRANK SCREEN
// =====================================================

function startPrank() {

    const prank =
        document.getElementById("prankScreen");


    /*
        Try to enter browser fullscreen.

        Some browsers, especially Instagram's
        in-app browser, may block this because
        it happens after a delay.
    */

    if (document.documentElement.requestFullscreen) {

        document.documentElement
            .requestFullscreen()
            .catch(() => {

                console.log(
                    "Fullscreen permission denied."
                );

            });

    }


    // Show the disco/prank screen

    prank.classList.add("active");

}


// =====================================================
// EXIT PRANK
// =====================================================

function exitPrank() {

    const prank =
        document.getElementById("prankScreen");

    const audio =
        document.getElementById("prankAudio");


    // Hide prank screen

    prank.classList.remove("active");


    // Stop prank music

    audio.pause();

    audio.currentTime = 0;


    // Exit browser fullscreen if active

    if (document.fullscreenElement) {

        document.exitFullscreen()
            .catch(() => {});

    }


    // Return to home

    showPage("home");

}
