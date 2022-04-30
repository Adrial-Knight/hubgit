import {Line} from "./Line.js"

export class Game {
    constructor() {
        this.secret = undefined
        this.dico = getDico()
    }
    init() {
        this.secret = pickSecretFromDico(this.dico)
        var line = new Line(this.secret[0], this.secret.length)
        this.hint = line.getHintList()
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
    over() {
        alert("Perdu !\nLe mot à trouver était " + this.secret)
    }
    win() {
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
