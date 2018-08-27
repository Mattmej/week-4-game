# week-4-game
Star Wars RPG

* Play as Luke, Vader, Boba Fett, or Jar Jar in this Star Wars RPG!

* As your character attacks an enemy, the character's attack will increase.

* If your character's health reaches zero, then you lose!

* If you can defeat all of your enemies, then you win!


This program is an example of jQuery code and JavaScript functions being used to create an RPG game.

### Details

The goal of this game is to select a character and then defeat all other characters in a strategic order without dying. 

The game begins with the user selecting a character that they wish to play as, and then selecting their first opponent to fight. 

![select_character](https://github.com/Mattmej/week-4-game/blob/master/assets/gifs/select_character.gif)

After selecting their character and their opponent, the user will fight the opponent by pressing the "fight" button. Every time the user presses the "fight" button, their character's attack power goes up by the character's base attack power. 

![attack_example](https://github.com/Mattmej/week-4-game/blob/master/assets/gifs/attack_example.gif)

Once the user character's attack points exceeds the opponent's health ("HP") during an attack, then the opponent is defeated and the user can select a new opponent to fight. 

![select_new_opponent](https://github.com/Mattmej/week-4-game/blob/master/assets/gifs/select_new_opp.gif)

Once the last opponent is defeated, the user wins. 

![winning](https://github.com/Mattmej/week-4-game/blob/master/assets/gifs/winning.gif)

If at any point the enemy's attack exceeds the user's HP, the user loses. The user is then given an opportunity to restart the game and pick another character to use.

![losing](https://github.com/Mattmej/week-4-game/blob/master/assets/gifs/losing.gif)




#### Characters

1. Luke Skywalker
    * HP: 100
    * Attack: 10
    * Difficulty: Hard

2. Darth Vader
    * HP: 120
    * Attack: 25
    * Difficulty: Easy

3. Boba Fett
    * HP: 110
    * Attack: 15
    * Difficulty: Medium

4. Jar Jar Binks
    * HP: 300
    * Attack: 2
    * Difficulty: Yes



