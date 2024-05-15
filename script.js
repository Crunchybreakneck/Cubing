let holdReqStart;
let greenDelay;
let keyPressed = false;
let Scrambles3x3 = [
    "D2 B' R2 D2 R' B2 D2 B2 D2 L U B D2 R2 B' U2 R' B' U'",
    "R2 B D2 F U2 L2 B' D' B' R F2 L' D' L U' R F2 D'",
    "L' U' B2 L2 D2 F2 D2 R2 U L' F' R' U' L' B' R  F  R",
    "R' D  R  B' L2 F2 U2 R2 D2 L' R  B' D  L' D2 R2 F  R2",
    "D  L  F  U  F2 U  L2 D' B2 R2 U  R' D2 L2 B  U2 B' F'",
    "F' D' L2 D' L' F' R' F' B R' L2 U  R2 L2 D2 R2 L2 F'",
    "B' L  D  F' R  L2 F2 L  F' R' F' D2 R2 D  F2 D2 B2 U'",
];
let Scrambles2x2 = [
    "U R' U' F R2 U2 F R2 U' R' U2",
    "U' R2 U' F U' R2 U' R2 U' F' U2",
    "R' U2 F U2 R' F R2 U R' U2 R2",
    "U2 R' F2 U' R2 U' F' R' U2 R U2",
    "R F' R' U' R' F R F U' F R'",
    "R2 U2 R2 U' R2 U' R U2 R' U R'",
];
let ScramblesPyraminx = [
    "L' U' B U' B R' U B L' U R u' r' b",
    "U R B U R B' U R B U R l b",
    "U B R' B' L' B' U' B' R' L' R u r' ",
    "U' L R L B' U' B L R' L R u' l' r' b' ",
    "B' R U' B' U' L' U R' U L R' u r' b' ",
    "B' L R B R B R L' B' U' B u b",
];
let ScramblesSkewb = [
    "L U R U' L R' U L B L' B'",
    "R B L' R B U' L B' L U' B ",
    "U L R L' R' L R B' L' B L ",
    "R B U' B R U' R' B U R' L'",
    "R B U' B U B' R B R U L' ",
    "U R L U' R L' R' L' B L' R ",
];
const Scrambles = {
    Scrambles3x3,
    Scrambles2x2,
    ScramblesPyraminx,
    ScramblesSkewb,
};
let numSeconds = 0;
let timer;
// Add scrambles from list
$(document).ready(function () {
    $('#Scrambles').val('Scrambles3x3');
    newScramble($('#Scrambles').val());
    // Add a requirement to hold before timer start red for not held for enough time green for ready to start
    $('#Scrambles').on('change', function () {
        console.log($('#Scrambles').val());
        newScramble($('#Scrambles').val());
    });
    $(document).on("keyup", function () {
        clearTimeout(greenDelay)
        if (Date.now() - holdReqStart > 4999) {
            startTimer();
        }
        keyPressed = false;
        $(document).on("keydown", keydownhandler);
        $("#timer").removeClass("red");
        $("#timer").removeClass("green");
    });
    $(document).on("keydown", keydownhandler);


    function goGreen() {
        console.log('go green!')
        $("#timer").addClass("green");
        $("#timer").removeClass("red");
    }
    function keydownhandler() {
        console.log('keydown fired');
        if (numSeconds > 0.06) {
            let currentSolves = JSON.parse(localStorage.getItem("Solves"));
            console.log(currentSolves)
            if (!currentSolves) {
                currentSolves = [];
            }
            currentSolves.push({
                solveDate: new Date(),
                solveTime: numSeconds,
            })
            localStorage.setItem("Solves", JSON.stringify(currentSolves));
        }
        if (!keyPressed) {
            $(document).off("keydown");
            greenDelay = setTimeout(goGreen, 5000);
            keyPressed = true;
            holdReqStart = Date.now()
            console.log(holdReqStart)
            clearInterval(timer)
            numSeconds = 0;
            updateDisplay()
            newScramble($('#Scrambles').val());
            $("#timer").addClass("red");
        }
    }
    // Make scramble change
    function newScramble(type) {
        let Scramble = Scrambles[type][Math.floor(Math.random() * Scrambles[type].length)];
        $('#scramble').html(Scramble);
    }
});


function updateDisplay() {
    // To do: consider using system time and add minutes
    $('#timer').find('.value').text((Math.floor(numSeconds) * 1) / 100);
    numSeconds++;
}

function startTimer() {
    timer = setInterval(updateDisplay, 10); // every 10 milliseconds call updateDisplay
}