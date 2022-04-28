import {Word} from "./Word.js"
import {Game} from "./Game.js"
import * as utils from "./common.js"

var maxChance = 6
var game = new Game(maxChance)
const firstLetter = game.getSecret()[0]
var input = firstLetter
var word = new Word(input, game.getLength())

var keyboardManager
var win = false

document.addEventListener("keydown", keyboardManager = function(event) {
    if (event.key === "Enter" && game.getChance()) {
        if (input.length == game.getLength() && word.isValid()){
            const analyse = word.compareTo(game.getSecret())
            completeLine(game.getCurrentLine(), word, analyse)
            if (input.toUpperCase() == game.getSecret()){
                document.removeEventListener("keydown", keyboardManager)
                win = true
                alert("Gagné !")
            }
            input = firstLetter
            game.useChance()
        }
        else {
            game.prepareLine()
        }
    }
    else if (event.key === "Delete" || event.key === "Backspace"){
        if (input.length > 1){
            input = input.slice(0, -1)
        }
    }
    else{
        if (input.length < game.getLength()){
            if ((input.length != 1) || (firstLetter != event.key.toUpperCase())){
                input += event.key
            }
        }
    }
    if (!win){
        if (!game.getChance()) {
            document.removeEventListener("keydown", keyboardManager)
            alert("Perdu !\nLe mot à trouver était + " + game.getSecret())
        }
        else{
            word = new Word(input, game.getLength())
            const state = Array(word.length).fill(utils.hint.ingame)
            completeLine(game.getCurrentLine(), word, state)
        }
    }
});

function completeLine(line, word, analyse){
    analyse[0] = utils.hint.found
    var i = 0
    for (i; i < word.getLength(); i++) {
        line.cells[i].innerHTML = word.getLetter(i)
        line.cells[i].className = analyse[i]
    }
    for (i; i < game.getLength(); i++) {
        line.cells[i].innerHTML = utils.unsetChar
        line.cells[i].className = utils.hint.absent
    }
}
