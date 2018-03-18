/*

Game Plan:

1. Characters are displayed on the screen.                                                          (o)
2. A prompt will appear on screen to choose a character.                                            (o)
3. User will click on a character to play.
4. When clicked, the character will move to the battle area.
5. User will click on another character to fight.
6. [same as 4, but for the second character]
7. Button to attack enemy will either appear or already be in the battle area.
8. When user presses attack button, messages will appear.
    a. You attacked [name] for [#] damage!
    b. [name] attacked you back for [#] damage!
9. Every time the attack button is pressed, the user's attack power will increase.
    a. New Attack Power = New Attack Power + Base Attack Power;
    b. e.g. with an attack of 6, attack goes up by 6 each turn.
10. When user's hp = 0,
    a. Game over screen displays.
    b. Prompt to start a new game.
11. When opponent's hp = 0,
    a. Character disappears from the screen
    b. Prompt appears saying what happened.
        i. You defeated ___
        ii. Select a new character to fight.
12. When all opponents are defeated,
    a. Win screen displays.



*/

var lukeSkywalker = {
    name: "Luke Skywalker",
    hp: 100,
    attack: 5,
    counterAttack: 5,
    picture: "assets/images/luke-skywalker.jpg"
}

var darthVader = {
    name: "Darth Vader",
    hp: 120,
    attack: 8,
    counterAttack: 8,
    picture: "assets/images/darth-vader.jpg"
}

var bobaFett = {
    name: "Boba Fett",
    hp: 110,
    attack: 7,
    counterAttack: 7,
    picture: "assets/images/boba-fett.jpg"
}

var jarBinks = {
    name: "Jar Jar Binks",
    hp: 300,
    attack: 2,
    counterAttack: 2,
    picture: "assets/images/jarjar-binks.jpg"
}

var playerIsClicked = false;
var enemyIsClicked = false;

// Adds the characters' names to the characters' portraits (will I need this?)
// $("#char1-name").html(lukeSkywalker.name);
// $("#char2-name").html(darthVader.name);
// $("#char3-name").html(bobaFett.name);
// $("#char4-name").html(jarBinks.name);


// Asks the user to choose a character
$(".message").html("<h2>Choose your character!</h2>");



// Adds the characters' picture to the div
$("#charSlot1").attr("src", lukeSkywalker.picture);
$("#charSlot2").attr("src", darthVader.picture);
$("#charSlot3").attr("src", bobaFett.picture);
$("#charSlot4").attr("src", jarBinks.picture);

// Adds the characters' current HP to the portrait
$("#char1-hp").html(lukeSkywalker.hp);
$("#char2-hp").html(darthVader.hp);
$("#char3-hp").html(bobaFett.hp);
$("#char4-hp").html(jarBinks.hp);

//////////////////////////////////////////////////////////////

// Functions

// function turnGreen() {

// }

// $("#char1").click(turnGreen);


function selectCharacters() {
    $(".charHolder").on("click", function() {

        if (!playerIsClicked) {
            var selectedChar = $(".charHolder").attr("id", "myChar");
            $(".charHolder").attr("id", "myChar");
            $(".message").html("<h2>Choose your opponent!</h2>");           // displays this message
            // $(this).addClass("player-select");
            $(this).toggleClass("player-select");
            // $(this).removeClass("charHolder");                              // can we do this?
            $(this).removeClass("enemyHolder");
            playerIsClicked = true;

            if (playerIsClicked && !enemyIsClicked) {
                
                $(".enemyHolder").on("click", function() {

                $(".charHolder").attr("id", "enemyChar");
                $(".message").html("<h2>Get ready to fight!</h2>");     // displays this message
                $(this).toggleClass("enemy-select");
                $(".charHolder").off("click");                          // turns off click function
                enemyIsClicked = true;

                })
            }

        }

        // else if (playerIsClicked && !enemyIsClicked) {
        //     $(".charHolder").attr("id", "enemyChar");
        //     $(".message").html("<h2>Get ready to fight!</h2>");     // displays this message
        //     $(".charHolder").off("click");                          // turns off click function
        // }



    })


}

selectCharacters();
// selectCharacters();

/////////////////////////////////////////////////////////////////////////////////////////////////

// function selectCharacters() {
//     while ()
// }











































// // Character frame turns green when selected.
// $(".charHolder").on("click", function() {
//     $(this).toggleClass("player-select");
//     // playerIsClicked = true;
//     // console.log(playerIsClicked);

//     if ($(".charHolder").hasClass("player-select")) {                   // if the character frame was selected and turns green,
//         $(".message").html("<h2>Choose your opponent!</h2>");           // displays this message
//         $(".charHolder").attr("id", "myChar");
//         $(".charHolder").off("click");                                  // turns off click function

//         // if ($("#char1").hasClass("player.select")) {
//         //     $(this).off("click");
//         // }

//         // else if ($("#char2").hasClass("player.select")) {
//         //     $(this).off("click");
//         // }

//         // else if ($("#char3").hasClass("player.select")) {
//         //     $(this).off("click");
//         // }

//         // else if ($("#char4").hasClass("player.select")) {
//         //     $(this).off("click");
//         // }



//         $(".charHolder").on("click", function() {                       // Now character frame turns red when selected.

//             // if (!$(charHolder))





//             $(this).toggleClass("enemy-select");
//             // console.log($("charHolder").hasClass("enemy-select"));
//             console.log($("charHolder").has(".enemy-select"));

           

//             if (!$("charHolder").hasClass("enemy-select")) {             // if the character frame was selected and turns red,
//                                                                          // (a false statement. hasClass method does not work for child nodes.)
//                 $(".message").html("<h2>Get ready to fight!</h2>");     // displays this message
//                 $(".charHolder").off("click");                          // turns off click function
//             }
//         })
//         // return false;
//         // $(".charHolder")
//         // $(".message").text("<h2>Choose your opponent!</h2>");
//     }

//     // return false;

// })

// // if (playerIsClicked === true) {
// //     // $(".message").html("<h2>Choose your opponent!</h2>");
// //     $("<h2>Choose Your Opponent!</h2>").appendTo(".message");
// // }




// // $("char4").html("<img>");


// // var $char4 = $("<img>", {"class": "charSlot4"});   // creates a new image element with a class of "charSlot4"
// // $("#char4").html($char4);                          // puts the image element into the element with the id of "char4"
// // $(".charSlot4").attr("src", jarBinks.picture);


