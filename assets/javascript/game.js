$(document).ready(function() {
    function Game() {
        this.characters = ["obiWan", "darthMaul", "jarJar", "maceWindu", "anakin", "yoda"];
        this.player;
        this.baseAttack;
        this.enemies = [];
        this.defender = "";
        this.defeated = 0;

        function ObiWan() {
            this.name = "Obi-Wan Kenobi";
            this.id = "obiWan";
            this.healthPoints = 120;
            this.attackPower = 16;
            this.counterAttackPower = 20;
        }

        function DarthMaul() {
            this.name = "Darth Maul";
            this.id = "darthMaul";
            this.healthPoints = 160;
            this.attackPower = 12;
            this.counterAttackPower = 35;
        }

        function JarJar() {
            this.name = "Jar Jar Binks";
            this.id = "jarJar";
            this.healthPoints = 150;
            this.attackPower = 5;
            this.counterAttackPower = 5;
        }

        function MaceWindu() {
            this.name = "Mace Windu";
            this.id = "maceWindu";
            this.healthPoints = 180;
            this.attackPower = 18;
            this.counterAttackPower = 10;
        }

        function Anakin() {
            this.name = "Anakin Skywalker";
            this.id = "anakin";
            this.healthPoints = 80;
            this.attackPower = 20;
            this.counterAttackPower = 25;
        }

        function Yoda() {
            this.name = "Yoda";
            this.id = "yoda";
            this.healthPoints = 100;
            this.attackPower = 20;
            this.counterAttackPower = 30;
        }

        // Set player character.
        this.setCharacter = function(character) {
            if (this.player == undefined) {
                switch (character) {
                    case "obiWan":
                        this.player = new ObiWan();
                        break;
                    case "darthMaul":
                        this.player = new DarthMaul();
                        break;
                    case "jarJar":
                        this.player = new JarJar();
                        break;
                    case "maceWindu":
                        this.player = new MaceWindu();
                        break;
                    case "anakin":
                        this.player = new Anakin();
                        break;
                    case "yoda":
                        this.player = new Yoda();
                        break;
                }

                this.baseAttack = this.player.attackPower;
                this.setEnemies();
                console.log(this.player);
                $("#" + character).css("border-color", "#2FF923");
                $("#fight-text").html("");
            }
        }

        // Set enemy characters.
        this.setEnemies = function() {
            for (var i = 0; i < this.characters.length; i++) {

                if (this.characters[i] !== this.player.id) {

                    switch (this.characters[i]) {
                        case "obiWan":
                            var obi = new ObiWan();
                            this.enemies.push(obi);
                            break;
                        case "darthMaul":
                            var maul = new DarthMaul();
                            this.enemies.push(maul);
                            break;
                        case "jarJar":
                            var jarJar = new JarJar();
                            this.enemies.push(jarJar);
                            break;
                        case "maceWindu":
                            var mace = new MaceWindu();
                            this.enemies.push(mace);
                            break;
                        case "anakin":
                            var ani = new Anakin();
                            this.enemies.push(ani);
                            break;
                        case "yoda":
                            var yoda = new Yoda();
                            this.enemies.push(yoda);
                            break;
                    }
                }
            }

            // Set border style of enemies and move to enemy location.
            for (var enemyIndex = 0; enemyIndex < this.enemies.length; enemyIndex++) {
                $("#" + this.enemies[enemyIndex].id).css("border-color", "#FF0000");
                $("#" + this.enemies[enemyIndex].id).detach().appendTo(".enemies");
            }
            console.log(this.enemies);
        }

        // Set defender character.
        this.setDefender = function(character) {
            if (character !== this.player.id && this.defender == "") {
                for (var enemyIndex = 0; enemyIndex < this.enemies.length; enemyIndex++) {
                    if (character == this.enemies[enemyIndex].id) {
                        this.defender = this.enemies[enemyIndex];
                        $("#" + character).detach().appendTo(".defender");
                        $("#" + character).css("border-color", "#2719C7");
                        $("#fight-text").html("");
                        console.log(this.defender);
                    }
                }
            }
        }

        // Fight action.
        this.fight = function() {
            this.defender.healthPoints -= this.player.attackPower;
            this.player.healthPoints -= this.defender.counterAttackPower;
            this.updateHtml();

            this.player.attackPower += this.baseAttack;
            this.playSound();
            this.checkWin();
        }

        // Update html after fight.
        this.updateHtml = function() {
          $("#" + this.player.id + "-health").html(this.player.healthPoints);
          $("#" + this.defender.id + "-health").html(this.defender.healthPoints);
          $("#fight-text").html("You take " + this.defender.counterAttackPower + " damage.<br>");
          $("#fight-text").prepend(this.defender.name + " takes " + this.player.attackPower + " damage.<br>");
        }

        // Check if defender has been defeated or if game is over.
        this.checkWin = function() {
          // Defeat current defender.
          if (this.defender.healthPoints <= 0) {
              $("#" + this.defender.id).detach().appendTo(".defeated");
              $("#fight-text").html(this.defender.name + " was defeated!");
              this.defender = "";
              this.defeated += 1;
          }

          // Win condition based on number of enemies available.
          if (this.defeated == 5) {
              $("#fight-text").html("All enemies defeated. You win!");
              this.setGameOver();
          }

          // Lose condition.
          if (this.player.healthPoints <= 0) {
              $("#fight-text").html("You have been defeated. You lose!");
              this.setGameOver();
          }
        }

        this.setGameOver = function() {
          var restartButton = '<button type="button" class="btn btn-default" id="restart-button">Restart</button>'
          $(".fightLocation").append(restartButton);
        }

        // Play that sound.
        this.playSound = function() {
            switch (this.defender.id) {
                case "obiWan":
                    $("#audio").attr("src", "assets/audio/clash1.wav");
                    break;
                case "darthMaul":
                    $("#audio").attr("src", "assets/audio/clash2.wav");
                    break;
                case "jarJar":
                    $("#audio").attr("src", "assets/audio/jar-jar.mp3");
                    break;
                case "maceWindu":
                    $("#audio").attr("src", "assets/audio/clash3.wav");
                    break;
                case "anakin":
                    $("#audio").attr("src", "assets/audio/clash4.wav");
                    break;
                case "yoda":
                    $("#audio").attr("src", "assets/audio/clash5.wav");
                    break;
            }
        }

        // Reset board for next game.
        this.resetBoard = function() {
            newGame = new Game();
            this.player;
            this.enemies = [];
            this.defender = "";
            this.defeated = 0;
            $(".characters").detach().appendTo(".your-character");
            $(".characters").css("border-color", "#f6ef47");
            $("#obiWan-health").html("120");
            $("#darthMaul-health").html("160");
            $("#jarJar-health").html("200");
            $("#maceWindu-health").html("180");
            $("#anakin-health").html("80");
            $("#yoda-health").html("100");
            $("#fight-text").html("");
            $("#restart-button").detach();
        }
    }

    var newGame = new Game();

    $(".characters").on("click", function() {
        newGame.setCharacter(this.id);
        newGame.setDefender(this.id);
    });

    $("#attack-button").on("click", function() {
        if (newGame.player !== undefined && newGame.defender !== "") {
            newGame.fight();
        } else if (newGame.player === undefined) {
            $("#fight-text").html("Choose a player.");
        } else {
            $("#fight-text").html("No enemy selected for attack.");
        }
    });

    // Delegated event for dynamically added DOM element
    $(".fightLocation").on("click", "#restart-button", function() {
        newGame.resetBoard();
        console.log("Reset");
    });
});
