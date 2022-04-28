import * as utils from "./common.js"

export class Word {
    constructor(letters, lengthExpected) {
        this.letters = letters.toUpperCase()
        this.length = letters.length
        this.lengthExpected = lengthExpected
    }
    getLength() {
        return this.length
    }
    getLetter(id) {
        return this.letters[id]
    }
    isValid() {
        const condLength = (this.length == this.lengthExpected)
        const exist = utils.dico.includes(this.letters.toLowerCase())
        return condLength && exist
    }
    compareTo(secret) {
        var analyse = []
        for (var i = 0; i < this.length; i++) {
            if (this.letters[i] == secret[i]){
                analyse.push(utils.hint.found)
            }
            else if (secret.includes(this.letters[i])) {
                analyse.push(utils.hint.present)
            }
            else {
                analyse.push(utils.hint.absent)
            }
        }
        return analyse
    }
}
