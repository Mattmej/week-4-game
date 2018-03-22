/*

Game Plan:

1. Characters are displayed on the screen.                                                          ()
    a. Display portrait                                                                             (o)
    b. Display hp                                                                                   (o)
    c. Display attack power                                                                     (in progress)
2. A prompt will appear on screen to choose a character.                                            (o)
3. User will click on a character to play.                                                          (o)
4. When clicked, the character will move to the battle area.                                        (o)
    a. Move player character to another div
    b. Move enemy character to another div
5. User will click on another character to fight.                                                   (o)
6. [same as 4, but for the second character]                                                        (o)
7. Button to attack enemy will either appear or already be in the battle area.                  (in progress)
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
    baseAttack: 5,
    attack: 5,
    counterAttack: 5,
    picture: "assets/images/luke-skywalker.jpg"
}

var darthVader = {
    name: "Darth Vader",
    hp: 120,
    baseAttack: 8,
    attack: 8,
    counterAttack: 8,
    picture: "assets/images/darth-vader.jpg"
}

var bobaFett = {
    name: "Boba Fett",
    hp: 110,
    baseAttack: 7,
    attack: 7,
    counterAttack: 7,
    picture: "assets/images/boba-fett.jpg"
}

var jarBinks = {
    name: "Jar Jar Binks",
    hp: 300,
    baseAttack: 2,
    attack: 2,
    counterAttack: 2,
    picture: "assets/images/jarjar-binks.jpg"
}

var charArray = [lukeSkywalker, darthVader, bobaFett, jarBinks];

var playerIsClicked = false;
var enemyIsClicked = false;

var $selectedChar;
var $selectedEnemy;

var attacker;
var defender;

var combatMsg;


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



function selectCharacters() {
    $(".charHolder").on("click", function() {                                               // everything inside this executes when this element is clicked

                                                                                            ////////////////////////////////////////////////////////////////

        if (!playerIsClicked) {                                                             // if the player character has not been selected, then...

            $(this).toggleClass("player-select");                                           // turns the selected enemy green   
            $(".player-select").attr("id", "myChar");                                       // adds the "myChar" id to whoever is selected
            $selectedChar = $("#myChar");
            $(".message").html("<h2>Choose your opponent!</h2>");                           // displays this message
            $(this).removeClass("enemyHolder");                                             // prevents a user from selecting themselves as an enemy
            playerIsClicked = true;                                                         // says that the player has been clicked.

                                                                                            ////////////////////////////////////////////////////////////////                                                                                            

            if (playerIsClicked && !enemyIsClicked) {                                       // if a player is selected but no enemy is selected, then...
                
                $(".enemyHolder").on("click", function() {

                    $(this).toggleClass("enemy-select");                                    // turns the selected enemy red
                    $(".enemy-select").attr("id", "enemyChar");                             // adds the "enemyChar" id to whoever is selected
                    $selectedEnemy = $("#enemyChar");                                       // $selectedEnemy => holds the element with the "enemyChar" id
                    $(".message").html("<h2>Get ready to fight!</h2>");                     // displays this message
                    $(".charHolder").off("click");                                          // turns off click function for all elements with the "charHolder" class
                    enemyIsClicked = true;                                                  // says that the enemy has been clicked.

                                                                                            ////////////////////////////////////////////////////////////////                    

                    if (playerIsClicked && enemyIsClicked) {                                // if both characters have been selected, then...
                        var $green = $selectedChar.detach();                                // detaches the selected character from his area on the page
                        $green.appendTo("#playerArea");                                     // adds the character to the player area

                        var $activateVs = $("#vs").html("<img></img>").find("img");         // $activateVs => holds the <img> child element of the element with #vs
                        $activateVs.attr("src", "assets/images/versus.png");                // attaches the image to the <img> element
                        $activateVs.attr("id","vs-sizer");                                  // adds the #vs-sizer id to the <img> element

                        var $red = $selectedEnemy.detach();                                 // detaches the selected enemy from his area on the page
                        $red.appendTo("#enemyArea");                                        // adds the enemy to the enemy area

                        displayForCombat();
                        getCombatantInfo();
                        fight();


                    }
                                        
                })
            }

        }

    })

}




function displayForCombat() {
    // 1. add an element in the space between the unpicked characters (firstChild).after()
    // 2. add a child element for commentary on what happens
    // 3. add a child element underneath that has the button to fight.

    var combatWrapper = document.createElement("div");
    $(combatWrapper).addClass("d-flex flex-column justify-content-around");
    $(".charArea > figure:first-child").after(combatWrapper);


        combatMsg = document.createElement("div");
        // $(combatMsg).html("This is a test!");
        $(combatMsg).addClass("sw-text");
        $(combatWrapper).append(combatMsg);

        var fightButton = document.createElement("button");
        $(fightButton).attr("type", "button");
        $(fightButton).addClass("btn");
        $(fightButton).html("Attack");
        $(combatWrapper).append(fightButton);
}

function getCombatantInfo() {

    /* 
    1. Gets the element of the player character
        a. Checks to see if the element has a property pertaining to one of the character objects
            i. Maybe look at classes and/or ids
            ii. Or, check the child elements
        b. If the element's property matches one of the character objects' properties,
            then let the webpage know that the image that you selected belongs to that character
    
    2. Do the same for the enemy character.

    */



    for (i = 0; i < charArray.length; i++) {    // cycle through array elements of charArray
        
        $finder = $($selectedChar).find("p:first");

        if ($finder.html() == charArray[i].name) {
            attacker = charArray[i];
            console.log(attacker);

        }

        $enemyFinder = $($selectedEnemy).find("p:first");

        if ($enemyFinder.html() == charArray[i].name) {
            defender = charArray[i];
            console.log(defender);

        }
    }

        // $finder = $($selectedChar).find("p:first");
        // console.log($finder.html());



}

function fight() {
    $(".btn").on("click", function() {
        defender.hp = defender.hp - attacker.attack;
        var $defenderHpDisplay = $($selectedEnemy).find("p:nth-of-type(2)");
        $defenderHpDisplay.html(defender.hp);
        $(combatMsg).html(attacker.name + " attacked " + defender.name + " for " + attacker.attack + " damage!");

        attacker.hp = attacker.hp - defender.attack;
        var $playerHpDisplay = $($selectedChar).find("p:nth-of-type(2)");
        $playerHpDisplay.html(attacker.hp);

        attacker.attack = attacker.attack + attacker.baseAttack;

        // $("#char1-hp").html(lukeSkywalker.hp);

        // console.log(attacker.hp);
        // console.log(defender.hp);


    })
}












selectCharacters();


