import {Line} from "./Line.js"
import {Game} from "./Game.js"

var game = new Game()
var line = game.init()
tusmoKeyboardHandler(5)

function tusmoKeyboardHandler(chance){
    var status = undefined
    const hint = line.getHintList()
    var handler
    document.addEventListener("keydown", handler = function(event) {
        if (event.key === "Enter" && chance) {
            if (game.allow(line.getCache())){
                status = game.analyse(line.getCache())
                line.refresh(status)
                if (allAreEqual(status)){
                    document.removeEventListener("keydown", handler)
                    game.win()
                    chance = 0
                }
                else{
                    chance--
                    if(chance){
                        line = new Line(line.getFirstLetter(), line.getLenght())
                        line.refresh([])
                    }
                }
            }
        }
        else if (event.key === "Delete" || event.key === "Backspace"){
            line.pop()
        }
        else if (isLetter(event.key)){
            line.push(event.key)
        }
        if (!allAreEqual(status) && !chance){
            document.removeEventListener("keydown", handler)
            game.over()
        }
        else if (chance){
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
