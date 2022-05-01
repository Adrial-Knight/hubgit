import {Line} from "./Line.js"
import {Game} from "./Game.js"

var game = undefined

await fetch("data/dico.json")
        .then(response => response.json())
        .then(dico => game = new Game(dico))

var line = game.init(5, 6)
tusmoKeyboardHandler()

function tusmoKeyboardHandler(){
    var status = undefined
    const hint = line.getHintList()
    var handler
    document.addEventListener("keydown", handler = function(event) {
        if (event.key === "Enter" && game.isRunning()) {
            if (game.allow(line.getCache())){
                status = game.analyse(line.getCache())
                line.refresh(status)
                if (allAreEqual(status)){
                    document.removeEventListener("keydown", handler)
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
        else if (event.key === "Delete" || event.key === "Backspace"){
            line.pop()
        }
        else if (isLetter(event.key)){
            line.push(event.key)
        }
        if (!allAreEqual(status) && !game.isRunning()){
            document.removeEventListener("keydown", handler)
            game.over()
        }
        else if (game.isRunning()){
            const analyse = Array(line.getCache().length).fill(hint.ingame)
            line.refresh(analyse)
        }
    }
)}

const isLetter = str => (/^[a-zA-Z]*$/.test(str) && str.length == 1);

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
