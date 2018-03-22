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

10. When user's hp = 0,
    a. Game over screen displays.
    b. Prompt to start a new game.

11. When opponent's hp = 0,
    a. Character disappears from the screen                                                         (o)
    b. Prompt appears saying what happened.                                                         (o)
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

var combatMsg1;
var combatMsg2;
var fightButton;
var combatWrapper;


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
                
                chooseEnemy();

                                                                                            ////////////////////////////////////////////////////////////////                    

        
              
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

            // var $emptyItem = $(".charArea").append("<div>text</div>");
            // $emptyItem.detach();
            var $green = $selectedChar.detach();                                // detaches the selected character from his area on the page
            $green.appendTo("#playerArea");                                     // adds the character to the player area

            var $activateVs = $("#vs").html("<img></img>").find("img");         // $activateVs => holds the <img> child element of the element with #vs
            $activateVs.attr("src", "assets/images/versus.png");                // attaches the image to the <img> element
            $activateVs.attr("id","vs-sizer");                                  // adds the #vs-sizer id to the <img> element

            var $red = $selectedEnemy.detach();                                 // detaches the selected enemy from his area on the page
            $red.appendTo("#enemyArea");                                        // adds the enemy to the enemy area

            displayForCombat();                                                 // creates fight button and space for messages
            getCombatantInfo();                                                 // attaches the characters' object to the selected character portraits
            fight();                                                            // has what happens when user presses the "fight" button
            
            // if (defender.hp <= 0) {
            //     checkIfDead();
            // }

        }
                    
    })
}



function displayForCombat() {
    // 1. add an element in the space between the unpicked characters (firstChild).after()
    // 2. add a child element for commentary on what happens
    // 3. add a child element underneath that has the button to fight.
    // var fightButton;
    // var $emptyItem = $(".charArea").append("<div></div>");
    // $emptyItem.remove();
    $(combatWrapper).remove(); 
    combatWrapper = document.createElement("div");                                      // "combatWrapper" is a <div> element
    $(combatWrapper).addClass("d-flex flex-column justify-content-around");                 // adds these classes to the "combatWrapper" element
    $(fightButton).remove();
    $(".charArea > figure:first-child").after(combatWrapper);                               /* inserts the "combatWrapper" element after the 
                                                                                                first <figure> element of the element with ".charArea" */


        combatMsg1 = document.createElement("div");                                          // "combatMsg1" is a <div> element
        // $(combatMsg1).html("This is a test!");
        $(combatMsg1).addClass("sw-text");                                                   // adds the ".sw-text" class to the "combatMsg1" element
        $(combatWrapper).append(combatMsg1);                                                 // adds the "combatMsg1" element  as a child to the "combatWrapper" element 

        combatMsg2 = document.createElement("div");                                          // "combatMsg2" is a <div> element
        // $(combatMsg2).html("This is a test!");
        $(combatMsg2).addClass("sw-text");                                                  
        $(combatWrapper).append(combatMsg2);   

        fightButton = document.createElement("button");                                 // "fightButton" is a <button> element
        $(fightButton).attr("type", "button");                                              // adds the "type = 'button'" attribute to the "fightButton" element
        $(fightButton).addClass("btn");                                                     // adds the class ".btn" to the "fightButton" element
        $(fightButton).html("Attack");                                                      // the button now has the word "Attack" on it.
        $(combatWrapper).append(fightButton);                                               // adds this button to the "combatWrapper" element as its child
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
            // console.log(attacker);

        }

        // ===== Selecting the Enemy =====
        $enemyFinder = $($selectedEnemy).find("p:first");                   // finds the first <p> element of the "$selectedEnemy" element
        if ($enemyFinder.html() == charArray[i].name) {                     // if the first <p> element contains the name of a character, then...
            defender = charArray[i];                                        // the character will be designated the "defender"
            // console.log(defender);

        }
    }

    // $finder = $($selectedChar).find("p:first");
    // console.log($finder.html());
}



function fight() {
    $(".btn").on("click", function() {                                          // when you click the "fight" button, then...
        defender.hp = defender.hp - attacker.attack;                            // defender's hp decreases by the attacker's attack power
        var $defenderHpDisplay = $($selectedEnemy).find("p:nth-of-type(2)");    // gets the enemy's displayed hp
        $defenderHpDisplay.html(defender.hp);                                   // displays the new value of the enemy's hp

        $(combatMsg2).html(defender.name + " attacked " + attacker.name + " for " + defender.attack + " damage!");

       

        attacker.hp = attacker.hp - defender.attack;                            // attacker's hp decreases by the defender's attack power.
        var $playerHpDisplay = $($selectedChar).find("p:nth-of-type(2)");       // gets the player's displayed hp
        $playerHpDisplay.html(attacker.hp);                                     // displays the new value of the attacker's hp

        // battle message that displays
        $(combatMsg1).html(attacker.name + " attacked " + defender.name + " for " + attacker.attack + " damage!");


        attacker.attack = attacker.attack + attacker.baseAttack;                // increases the attacker's attack power after every attack

        // $("#char1-hp").html(lukeSkywalker.hp);

        // console.log(attacker.hp);
        console.log(defender.hp);

        if (defender.hp <= 0) {
            checkIfDead();
        }


    })
}

function checkIfDead() {
    
    $selectedEnemy.remove();
    $(combatMsg1).html(defender.name + " has fallen!");
    $(combatMsg2).html("Choose another opponent!");
    // charArray.splice(0, charArray.indexOf(defender));
    charArray.splice(charArray.indexOf(defender), 1);
    console.log(charArray);
    $(".btn").off("click");

    if (charArray.length > 2) {
        chooseEnemy();
    }
    // selectCharacters();

    if (charArray.length === 2) {
        chooseLastEnemy();
    }
   
}

function chooseLastEnemy() {

    $(".enemyHolder").on("click", function() {

        $(this).toggleClass("enemy-select");                                    // turns the selected enemy red
        $(".enemy-select").attr("id", "enemyChar");                             // adds the "enemyChar" id to whoever is selected
        $selectedEnemy = $("#enemyChar");                                       // $selectedEnemy => holds the element with the "enemyChar" id
        $(".message").html("<h2>Get ready to fight!</h2>");                     // displays this message
        $(".charHolder").off("click");                                          // turns off click function for all elements with the "charHolder" class
        enemyIsClicked = true;                                                  // says that the enemy has been clicked.
        console.log(enemyIsClicked);

        if (playerIsClicked && enemyIsClicked) {                                // if both characters have been selected, then...

            var emptyItem = document.createElement("figure");
            var emptyItem2 = document.createElement("figure");
            $(emptyItem).addClass("empty-block");
            $(emptyItem2).addClass("empty-block");
            $selectedEnemy.after(emptyItem2);
            $selectedEnemy.before(emptyItem);
            var $red = $selectedEnemy.detach();                                 // detaches the selected enemy from his area on the page
            $red.appendTo("#enemyArea");                                        // adds the enemy to the enemy area

            displayForCombat();                                                 // creates fight button and space for messages

            // $emptyItem.remove();

            getCombatantInfo();                                                 // attaches the characters' object to the selected character portraits
            fight();                                                            // has what happens when user presses the "fight" button

        }
                    
    })



}




selectCharacters();