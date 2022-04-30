import {Line} from "./Line.js"

export class Game {
    constructor() {
        this.secret = undefined
        this.dico = getDico()
        this.gameCounter = 1
    }
    init(chance) {
        this.secret = pickSecretFromDico(this.dico)
        this.chance = chance
        var line = new Line(this.secret[0], this.secret.length)
        this.hint = line.getHintList()
        this.resfreshHeader()
        line.refresh([])
        return line
    }
    allow(guess) {
        const condLength = (guess.length == this.secret.length)
        const exist = this.dico.includes(guess.toLowerCase())
        return condLength && exist
    }
    analyse(guess) {
        var status = []
        for (var i = 0; i < guess.length; i++) {
            if (guess[i] == this.secret[i]){
                status.push(this.hint.found)
            }
            else if (this.secret.includes(guess[i])) {
                status.push(this.hint.present)
            }
            else {
                status.push(this.hint.visible)
            }
        }
        return status
    }
    useAChance() {
        this.chance--
    }
    isRunning() {
        return this.chance > 0
    }
    resfreshHeader() {
        var counterHTML = document.getElementById("game-subheader-left")
        var lenghtHTML = document.getElementById("game-subheader-right")
        counterHTML.innerHTML = "Mot " + this.gameCounter
        lenghtHTML.innerHTML = this.secret.length + " lettres"
    }
    over() {
        alert("Perdu !\nLe mot à trouver était " + this.secret)
    }
    win() {
        this.chance = 0
        alert("Gagné !")
    }
}

function getDico() {
    var request = new XMLHttpRequest();
    request.open("GET", "data/dico.txt", false);
    request.send(null);
    return request.responseText.split("\n");
}

function pickSecretFromDico(dico) {
    return dico[Math.round(Math.random() * (dico.length - 2))].toUpperCase()
}
