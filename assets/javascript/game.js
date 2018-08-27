/*

Game Plan:

1. Characters are displayed on the screen.                                                          (A)
    a. Display portrait                                                                             
    b. Display hp                                                                                   
    c. Display attack power                                                                                                                                              

2. A prompt will appear on screen to choose a character.                                            (A)

3. User will click on a character to play.                                                          (A)

4. When clicked, the character will move to the battle area.                                        (A)
    a. Move player character to another div
    b. Move enemy character to another div

5. User will click on another character to fight.                                                   (A)

6. [same as 4, but for the second character]                                                        (A)

7. Button to attack enemy will either appear or already be in the battle area.                      (A)

8. When user presses attack button, messages will appear.                                           (A)
    a. You attacked [name] for [#] damage!                                                          
    b. [name] attacked you back for [#] damage!                                                     

9. Every time the attack button is pressed, the user's attack power will increase.                  (A)
    a. New Attack Power = New Attack Power + Base Attack Power;
    b. e.g. with an attack of 6, attack goes up by 6 each turn.

10. When user's hp = 0,                                                                             (A)
    a. Game over screen displays.
    b. Prompt to start a new game.

11. When opponent's hp = 0,                                                                         (A)
    a. Character disappears from the screen                                                         
    b. Prompt appears saying what happened.                                                         
        i. You defeated ___
        ii. Select a new character to fight.
        
12. When all opponents are defeated,                                                                (A)
    a. Win screen displays.                                                                         
    b. Press button to play again.                                                              

13. Need to balance game so that the player can get a game over                                     (A)

*/

var lukeSkywalker = {
    name: "Luke Skywalker",
    hp: 100,
    baseAttack: 10,
    attack: 10,
    picture: "assets/images/luke-skywalker.jpg"
}

var darthVader = {
    name: "Darth Vader",
    hp: 120,
    baseAttack: 25,
    attack: 25,
    picture: "assets/images/darth-vader.jpg"
}

var bobaFett = {
    name: "Boba Fett",
    hp: 110,
    baseAttack: 15,
    attack: 15,
    picture: "assets/images/boba-fett.jpg"
}

var jarBinks = {
    name: "Jar Jar Binks",
    hp: 300,
    baseAttack: 2,
    attack: 2,
    picture: "assets/images/jarjar-binks.jpg"
}

var charArray = [lukeSkywalker, darthVader, bobaFett, jarBinks];

var playerIsClicked = false;
var enemyIsClicked = false;

var $selectedChar;
var $selectedEnemy;

var attacker;
var defender;

var combatMsg1;
var combatMsg2;
var fightButton;
var combatWrapper;

var $activateVs;

var bgMusic = document.createElement("audio");
$(bgMusic).attr("src", "assets/duel-of-the-fates.mp3");
bgMusic.loop = true;

var lightsaberSound = document.createElement("audio");



// Asks the user to choose a character
$(".message").html("<h2>Choose your character!</h2>");


// Adds the characters' picture to the div
$("#charSlot1").attr("src", lukeSkywalker.picture);
$("#charSlot2").attr("src", darthVader.picture);
$("#charSlot3").attr("src", bobaFett.picture);
$("#charSlot4").attr("src", jarBinks.picture);

// Adds the characters' current HP to the portrait
$("#char1-hp").html("HP: " + lukeSkywalker.hp);
$("#char2-hp").html("HP: " + darthVader.hp);
$("#char3-hp").html("HP: " + bobaFett.hp);
$("#char4-hp").html("HP: " + jarBinks.hp);

// Add the characters' attack power to the portrait
$("#char1-atk").html("Attack: " + lukeSkywalker.attack);
$("#char2-atk").html("Attack: " + darthVader.attack);
$("#char3-atk").html("Attack: " + bobaFett.attack);
$("#char4-atk").html("Attack: " + jarBinks.attack);

//////////////////////////////////////////////////////////////



function selectCharacters() {
    $(".charHolder").on("click", function() {                                   // everything inside this executes when this element is clicked

        if (!playerIsClicked) {                                                 // if the player character has not been selected, then...

            $(this).toggleClass("player-select");                               // turns the selected enemy green   
            $(".player-select").attr("id", "myChar");                           // adds the "myChar" id to whoever is selected
            $selectedChar = $("#myChar");
            $(".message").html("<h2>Choose your opponent!</h2>");               // displays this message
            $(this).removeClass("enemyHolder");                                 // prevents a user from selecting themselves as an enemy
            playerIsClicked = true;                                             // says that the player has been clicked.

            if (playerIsClicked && !enemyIsClicked) {                           // if a player is selected but no enemy is selected, then...
                chooseEnemy();
            }
        }
    })
}


function chooseEnemy() {
    $(".enemyHolder").on("click", function() {

        $(this).toggleClass("enemy-select");                                    // turns the selected enemy red
        $(".enemy-select").attr("id", "enemyChar");                             // adds the "enemyChar" id to whoever is selected
        $selectedEnemy = $("#enemyChar");                                       // $selectedEnemy => holds the element with the "enemyChar" id
        $(".message").html("<h2>Get ready to fight!</h2>");                     // displays this message
        $(".charHolder").off("click");                                          // turns off click function for all elements with the "charHolder" class
        enemyIsClicked = true;                                                  // says that the enemy has been clicked.
        console.log(enemyIsClicked);

        if (playerIsClicked && enemyIsClicked) {                                // if both characters have been selected, then...

            var $green = $selectedChar.detach();                                // detaches the selected character from his area on the page
            $green.appendTo("#playerArea");                                     // adds the character to the player area

            $activateVs = $("#vs").html("<img></img>").find("img");             // $activateVs => holds the <img> child element of the element with #vs
            $activateVs.attr("src", "assets/images/versus.png");                // attaches the image to the <img> element
            $activateVs.attr("id","vs-sizer");                                  // adds the #vs-sizer id to the <img> element

            var $red = $selectedEnemy.detach();                                 // detaches the selected enemy from his area on the page
            $red.appendTo("#enemyArea");                                        // adds the enemy to the enemy area

            displayForCombat();                                                 // creates fight button and space for messages
            getCombatantInfo();                                                 // attaches the characters' object to the selected character portraits
            fight();                                                            // has what happens when user presses the "fight" button
        }           
    })
}

function startMusic() {
    bgMusic.play();
}

function displayForCombat() {
    // 1. add an element in the space between the unpicked characters (firstChild).after()
    // 2. add a child element for commentary on what happens
    // 3. add a child element underneath that has the button to fight.

    $(combatWrapper).remove(); 
    combatWrapper = document.createElement("div");                                      // "combatWrapper" is a <div> element
    $(combatWrapper).addClass("d-flex flex-column justify-content-around");             // adds these classes to the "combatWrapper" element
    $(fightButton).remove();
    $(".charArea > figure:first-child").after(combatWrapper);                           /* inserts the "combatWrapper" element after the 
                                                                                            first <figure> element of the element with ".charArea" */


        // ===== Children of combatWrapper =====

        combatMsg1 = document.createElement("div");                                     // "combatMsg1" is a <div> element
        $(combatMsg1).addClass("sw-text white-bg px-2");                                              // adds the ".sw-text" class to the "combatMsg1" element
        $(combatWrapper).append(combatMsg1);                                            // adds the "combatMsg1" element  as a child to the "combatWrapper" element 

        combatMsg2 = document.createElement("div");                                     // "combatMsg2" is a <div> element
        $(combatMsg2).addClass("sw-text white-bg px-2");                                                  
        $(combatWrapper).append(combatMsg2);   

        fightButton = document.createElement("button");                                 // "fightButton" is a <button> element
        $(fightButton).attr("type", "button");                                          // adds the "type = 'button'" attribute to the "fightButton" element
        $(fightButton).addClass("btn");                                                 // adds the class ".btn" to the "fightButton" element
        $(fightButton).html("Attack");                                                  // the button now has the word "Attack" on it.
        $(combatWrapper).append(fightButton);                                           // adds this button to the "combatWrapper" element as its child
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
        
        // ===== Selecting the Player Character =====
        $finder = $($selectedChar).find("p:first");                         // finds the first <p> element of the "$selectedChar" element
        if ($finder.html() == charArray[i].name) {                          // if this first <p> element contains a name of a character, then...
            attacker = charArray[i];                                        // the character will be designated the "attacker"
        }

        // ===== Selecting the Enemy =====
        $enemyFinder = $($selectedEnemy).find("p:first");                   // finds the first <p> element of the "$selectedEnemy" element
        if ($enemyFinder.html() == charArray[i].name) {                     // if the first <p> element contains the name of a character, then...
            defender = charArray[i];                                        // the character will be designated the "defender"
        }
    }
}



function fight() {
    $(".btn").on("click", function() {                                          // when you click the "fight" button, then...
        defender.hp = defender.hp - attacker.attack;                            // defender's hp decreases by the attacker's attack power
        var $defenderHpDisplay = $($selectedEnemy).find("p:nth-of-type(2)");    // gets the enemy's displayed hp
        $defenderHpDisplay.html("HP: " + defender.hp);                                   // displays the new value of the enemy's hp

        // message: "[Defender] attacked [attacker] for [#] damage!"
        $(combatMsg2).html(defender.name + " attacked " + attacker.name + " for " + defender.attack + " damage!");

        attacker.hp = attacker.hp - defender.attack;                            // attacker's hp decreases by the defender's attack power.
        var $playerHpDisplay = $($selectedChar).find("p:nth-of-type(2)");       // gets the player's displayed hp
        $playerHpDisplay.html("HP: " + attacker.hp);                                     // displays the new value of the attacker's hp

        // message: "[Attacker] attacked [defender] for [#] damage!"
        $(combatMsg1).html(attacker.name + " attacked " + defender.name + " for " + attacker.attack + " damage!");

        attacker.attack = attacker.attack + attacker.baseAttack;                // increases the attacker's attack power after every attack
        var $newAttack = $($selectedChar).find("p:last");
        $newAttack.html("Attack: " + attacker.attack);

        // console.log(attacker.hp);
        // console.log(defender.hp);

        if (defender.hp <= 0) {                                                 // if the defender runs out of hp, then...
            removeDead();                                                       // removes the defender from the battle area
        }

        if (attacker.hp <= 0) {
            gameOver();
        }
    })
}

function removeDead() {                                                 
    
    $selectedEnemy.remove();                                                // removes the enemy from the battle area
    $(combatMsg1).html(defender.name + " has fallen!");                     // displays "[Defender] has fallen!"
    $(combatMsg2).html("Choose another opponent!");                         // asks to choose another opponent
    charArray.splice(charArray.indexOf(defender), 1);                       // removes one element (the defender's object) from the charArray
    $(".btn").off("click");                                                 // stops the button from being pressed more times

    $activateVs.remove();                                                   // removes the "vs" image

    enemyIsClicked = false;                                                 

    if (charArray.length > 2) {                                             // if there are more than 2 characters in the charArray
        chooseEnemy();
    }

    if (charArray.length === 2) {                                           // if there are only 2 characters left (player and opponent)
        chooseLastEnemy();
    }

    if (charArray.length === 1) {                                           // if the player is the only one left standing
        displayWin();
    }
   
}

function chooseLastEnemy() {                                                    // special case for picking last opponent

    $(".enemyHolder").on("click", function() {

        $(this).toggleClass("enemy-select");                                    // turns the selected enemy red
        $(".enemy-select").attr("id", "enemyChar");                             // adds the "enemyChar" id to whoever is selected
        $selectedEnemy = $("#enemyChar");                                       // $selectedEnemy => holds the element with the "enemyChar" id
        $(".message").html("<h2>Get ready to fight!</h2>");                     // displays this message
        $(".charHolder").off("click");                                          // turns off click function for all elements with the "charHolder" class
        enemyIsClicked = true;                                                  // says that the enemy has been clicked.
        console.log(enemyIsClicked);

        if (playerIsClicked && enemyIsClicked) {                                // if both characters have been selected, then...

            var emptyItem = document.createElement("figure");                   /* creates an empty figure. Necessary for the charArea element not to be deleted
                                                                                     after running out of elements */

            var emptyItem2 = document.createElement("figure");                  // see last comment
            $(emptyItem).addClass("empty-block");                               // gives the figure height and width
            $(emptyItem2).addClass("empty-block");
            $selectedEnemy.after(emptyItem2);                                   // inserts an empty figure after the $selectedEnemy element
            $selectedEnemy.before(emptyItem);                                   // inserts an empty figure after the $selectedEnemy element

            var $red = $selectedEnemy.detach();                                 // detaches the selected enemy from his area on the page
            $red.appendTo("#enemyArea");                                        // adds the enemy to the enemy area

            displayForCombat();                                                 // creates fight button and space for messages

            getCombatantInfo();                                                 // attaches the characters' object to the selected character portraits
            fight();                                                            // has what happens when user presses the "fight" button
        }         
    })
}

function displayWin() {
    $(".message").html("<h2>You Win!</h2>");
    $(fightButton).html("New Game");
    $(combatMsg1).html("May the Force be with you.");
    $(combatMsg2).html("Click button to start a new game.");

    $(fightButton).on("click", function() {
        location.reload();
    })
}

function gameOver() {
    $(".message").html("<h2>Game Over!</h2>");
    $(combatMsg1).html("Try again?");
    $(combatMsg2).empty();
    $(fightButton).html("New Game");

    $(fightButton).on("click", function() {
        location.reload();
    })
}


startMusic();

selectCharacters();