let selectedGender = null;

const form = document.getElementById("loveForm");


// ---------------- PAGE SWITCH ----------------

function showPage(pageID) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageID).classList.add("active");

    window.scrollTo(0, 0);
}


// ---------------- GENDER ----------------

function selectGender(button) {

    document.querySelectorAll(".gender").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedGender = button.dataset.gender;

    document.getElementById("gender").value = selectedGender;
}


// ---------------- CAPTCHA AUDIO ----------------

function playCaptcha() {

    const audio = document.getElementById("captchaAudio");

    audio.currentTime = 0;
    audio.play();

}


// ---------------- FORM ----------------

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const captcha =
        document.getElementById("captcha").value.trim();

    const gender =
        document.getElementById("gender").value;


    if (!name) {
        alert("Naam toh daal bhai 😭");
        return;
    }


    if (!gender) {
        alert("Gender select karna padega 💀");
        return;
    }


    if (captcha !== "9685") {

        alert(
            "❌ CAPTCHA galat hai!\n\n" +
            "Audio dobara suno aur code dhyaan se sunna 😭"
        );

        return;
    }


    // Valid entry

    generateResult(name, gender);

});


// ---------------- LOVE RESULT ----------------

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


    if (gender === "male") {

        result = {
            title: `${name}, you're actually a catch. 👑`,

            text:
                `${name}, your love line says you're someone ` +
                `who values loyalty, confidence and genuine connection. ` +
                `You're not meant for random drama — someone lucky ` +
                `is eventually going to realise what they've got. ❤️`
        };

    } else {

        result = {
            title: `${name}, main character energy detected. ✨`,

            text:
                `${name}, your love line shows a strong personality, ` +
                `a warm heart and dangerously high standards. ` +
                `Anyone entering your life better come prepared — ` +
                `because you're definitely not settling for boring. 💅❤️`
        };

    }


    title.innerText = result.title;

    text.innerText = result.text;


    // Random-ish believable percentage

    const loveScore =
        Math.floor(Math.random() * 16) + 82;

    percentage.innerText =
        loveScore + "%";

    setTimeout(() => {

        meter.style.width =
            loveScore + "%";

    }, 300);


    // Start prank countdown

    startPrankCountdown();

}


// ---------------- PRANK TIMER ----------------

function startPrankCountdown() {

    let remaining = 14;

    const countdown =
        document.getElementById("countdown");


    const timer =
        setInterval(() => {

            remaining--;

            if (remaining > 0) {

                countdown.innerText =
                    `Finalising your destiny... ${remaining}s`;

            } else {

                clearInterval(timer);

                countdown.innerText =
                    "Destiny calculated. 💘";

                startPrank();

            }

        }, 1000);

}


// ---------------- PRANK ----------------

function startPrank() {

    const prank =
        document.getElementById("prankScreen");

    const audio =
        document.getElementById("prankAudio");


    /*
        Try fullscreen immediately.
        Browser security may reject fullscreen on some browsers
        because the 14-second timer is no longer a direct user action.
    */

    if (document.documentElement.requestFullscreen) {

        document.documentElement
            .requestFullscreen()
            .catch(() => {
                console.log("Fullscreen permission denied.");
            });

    }


    prank.classList.add("active");


    audio.currentTime = 0;

    // Start loud — browser may still enforce its own volume limits.
    audio.volume = 1.0;

    audio.play().catch(() => {

        /*
            If the browser blocks delayed autoplay,
            the prank screen still appears.
        */

        console.log("Audio autoplay was blocked.");

    });

}


// ---------------- EXIT ----------------

function exitPrank() {

    const prank =
        document.getElementById("prankScreen");

    const audio =
        document.getElementById("prankAudio");


    prank.classList.remove("active");

    audio.pause();

    audio.currentTime = 0;


    if (document.fullscreenElement) {

        document.exitFullscreen()
            .catch(() => {});

    }

    showPage("home");

}