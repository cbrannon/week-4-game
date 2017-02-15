$(document).ready(function() {
    function ObiWan() {
        this.name = "obiWan";
        this.healthPoints = 120;
        this.attackPower = 16;
        this.counterAttackPower = 20;
    }

    function DarthMaul() {
        this.name = "darthMaul";
        this.healthPoints = 160;
        this.attackPower = 12;
        this.counterAttackPower = 35;
    }

    function JarJar() {
        this.name = "jarJar";
        this.healthPoints = 200;
        this.attackPower = 5;
        this.counterAttackPower = 5;
    }

    function MaceWindu() {
        this.name = "maceWindu";
        this.healthPoints = 180;
        this.attackPower = 18;
        this.counterAttackPower = 10;
    }

    function Anakin() {
        this.name = "anakin";
        this.healthPoints = 80;
        this.attackPower = 20;
        this.counterAttackPower = 25;
    }

    function Yoda() {
        this.name = "yoda";
        this.healthPoints = 100;
        this.attackPower = 20;
        this.counterAttackPower = 30;
    }

    function Game() {
        this.characters = ["obiWan", "darthMaul", "jarJar", "maceWindu", "anakin", "yoda"];
        this.player;
        this.baseAttack;
        this.enemies = [];
        this.defender = "";
        this.defeated = 0;

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
            }
        }

        this.setEnemies = function() {
            for (var i = 0; i < this.characters.length; i++) {

                if (this.characters[i] !== this.player.name) {

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
                $("#" + this.enemies[enemyIndex].name).css("border-color", "#FF0000");
                $("#" + this.enemies[enemyIndex].name).detach().appendTo(".enemies");
            }
            console.log(this.enemies);
        }

        this.setDefender = function(character) {
            if (character !== this.player.name && this.defender == "") {
                for (var enemyIndex = 0; enemyIndex < this.enemies.length; enemyIndex++) {
                    if (character == this.enemies[enemyIndex].name) {
                        this.defender = this.enemies[enemyIndex];
                        $("#" + character).detach().appendTo(".defender");
                        $("#" + character).css("border-color", "#2719C7");
                        $("#fight-text").html("");
                        console.log(this.defender);
                    }
                }
            }
        }

        this.fight = function() {
            this.defender.healthPoints -= this.player.attackPower;
            this.player.healthPoints -= this.defender.counterAttackPower;
            $("#" + this.player.name + "-health").html(this.player.healthPoints);
            $("#" + this.defender.name + "-health").html(this.defender.healthPoints);
            $("#fight-text").prepend("Player takes " + this.defender.counterAttackPower + " damage.<br>");
            $("#fight-text").prepend("Player does " + this.player.attackPower + " damage.<br>");


            this.player.attackPower += this.baseAttack;

            console.group("Fight stats");
            console.log("Players HP: " + this.player.healthPoints);
            console.log("Defenders HP: " + this.defender.healthPoints);
            console.log("Players new attack power: " + this.player.attackPower);
            console.groupEnd();

            if (this.defender.healthPoints <= 0) {
                $("#" + this.defender.name).detach().appendTo(".defeated");
                this.defender = "";
                this.defeated += 1;
            }

            if (this.defeated == 5) {
                console.log("You win!");
                this.reset();
            }

            if (this.player.healthPoints <= 0) {
                console.log("You lose!");
                this.reset();
            }
        }

        this.reset = function() {
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
        }
    }

    var newGame = new Game();

    $(".characters").on("click", function() {
        switch (this.id) {
            case "obiWan":
                newGame.setCharacter("obiWan");
                newGame.setDefender("obiWan");
                break;
            case "darthMaul":
                newGame.setCharacter("darthMaul");
                newGame.setDefender("darthMaul");
                break;
            case "jarJar":
                newGame.setCharacter("jarJar");
                newGame.setDefender("jarJar");
                break;
            case "maceWindu":
                newGame.setCharacter("maceWindu");
                newGame.setDefender("maceWindu");
                break;
            case "anakin":
                newGame.setCharacter("anakin");
                newGame.setDefender("anakin");
                break;
            case "yoda":
                newGame.setCharacter("yoda");
                newGame.setDefender("yoda");
                break;
        }
    });

    $("#attack-button").on("click", function() {
        if (newGame.player !== undefined && newGame.defender !== "") {
            newGame.fight();
        }
    });
});
