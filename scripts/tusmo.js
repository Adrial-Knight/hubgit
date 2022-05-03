import {Game} from "./Game.js"
import {VirtualKeyboard} from "./VirtualKeyboad.js"

var game = await fetch("data/dico.json")
        .then(response => response.json())
        .then(dico => game = new Game(dico))

start(game)

function handler(key, game, keyboard) {
    var status = undefined
    var line = game.getCurrentLine()
    if (key === "ENTER" && game.isRunning()) {
        if (game.allow(line.getCache())){
            var status = game.analyse(line.getCache())
            line.refresh(status)
            keyboard.refresh(status, line.getCache())
            if (allAreEqual(status)){
                game.win()
                keyboard.restore()
            }
            else{
                game.useAChance()
                if(game.isRunning()){
                    game.setNewLine(line)
                }
            }
        }
        else {
            line.deleteCache()
        }
    }
    else if (key === "DELETE" || key === "BACKSPACE"){
        line.pop()
    }
    else if (isLetter(key)){
        line.push(key)
    }
    if (!allAreEqual(status) && !game.isRunning()){
        game.over()
        keyboard.restore()
    }
    else if (game.isRunning()){
        line = game.getCurrentLine()
        const hint = line.getHintList()
        const analyse = Array(line.getCache().length).fill(hint.ingame)
        line.refresh(analyse)
    }
}

function isLetter(str){
    return /^[a-zA-Z]*$/.test(str) && str.length == 1
}

function allAreEqual(array) {
    if(!array){
        return false
    }
    const result = array.every(element => {
        if (element === array[0]) {
            return true;
        }
    });
    return result;
}

function start(game){
    game.init()
    var keyboard = new VirtualKeyboard(document.getElementById("virtual-keyboard-body").rows)
    document.addEventListener("keydown", function(event){
        if (game.isRunning())
        handler(event.key.toUpperCase(), game, keyboard)
    })

    document.getElementById("virtual-keyboard").addEventListener("click", function(event){
        handler(event.target.id, game, keyboard)
    })
}
