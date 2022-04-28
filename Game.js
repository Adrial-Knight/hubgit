import * as utils from "./common.js"

export class Game {
    constructor(chance) {
        this.secret = pickSecretWord()
        this.length = this.secret.length
        this.chance = chance
        this.currentLine = 0
        this.grid = makeGrid(this)
        this.prepareLine()
    }
    getSecret() {
        return this.secret
    }
    getLength() {
        return this.length
    }
    getChance() {
        return this.chance
    }
    getCurrentLine() {
        return this.grid[this.currentLine]
    }
    useChance() {
        this.chance--
        this.currentLine++
    }
    prepareLine() {
        var line = this.getCurrentLine()
        line.cells[0].innerHTML = this.secret[0]
        line.cells[0].className = utils.hint.found
        for(var i = 1; i < this.length; i++){
            line.cells[i].className = utils.hint.visible
        }
    }
}

function pickSecretWord() {
    const i = new Date().getTime() % (utils.dico.length - 1);
    const secret = utils.dico[i].toUpperCase()
    return secret
}

function makeGrid(game) {
    var gridArea = document.getElementById("gameGrid")
    gridArea.innerHTML = ("<tr>" + ("<th class=\"empty\">" + utils.unsetChar + "</th>").repeat(game.getLength()) + "</tr>").repeat(game.getChance())

    var wordList = gridArea.getElementsByTagName("tr");
    return wordList
}
