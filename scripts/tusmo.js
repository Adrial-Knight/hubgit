import {Line} from "./Line.js"
import {Game} from "./Game.js"

var game = await fetch("data/dico.json")
        .then(response => response.json())
        .then(dico => game = new Game(dico))
var line = undefined

function handler(key, game) {
    console.log(key)
    var status = undefined
    if (key === "ENTER" && game.isRunning()) {
        if (game.allow(line.getCache())){
            var status = game.analyse(line.getCache())
            line.refresh(status)
            if (allAreEqual(status)){
                game.win()
            }
            else{
                game.useAChance()
                if(game.isRunning()){
                    line = new Line(line.getFirstLetter(), line.getLenght())
                    line.refresh([])
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
    }
    else if (game.isRunning()){
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


line = game.init(6, 6)
console.log(game)

document.addEventListener("keydown", function(event){
    if (game.isRunning())
        handler(event.key.toUpperCase(), game)
})

document.getElementById("virtual-keyboard").addEventListener("click", function(event){
    handler(event.target.id, game)
})
