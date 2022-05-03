export class VirtualKeyboard {
    constructor(innerHTML) {
        this.innerHTML = innerHTML
    }
    refresh(status, cache) {
        console.log(status, cache)
        for (var i = 0; i < status.length; i++) {
            var className = this.letter2cell(cache[i]).className
            console.log(className)
            if (className != "found" && status[i] == "found"){
                this.letter2cell(cache[i]).className = "found"
            }
            else if (className == "visible" && status[i] == "present"){
                this.letter2cell(cache[i]).className = "present"
            }
            else if(className == "visible" && status[i] == "visible"){
                this.letter2cell(cache[i]).className = "invisible"
            }

        }
    }
    letter2cell(letter) {
        var line = undefined
        var coln = undefined
        if (["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"].includes(letter)){
            line = 0
        }
        else if (["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"].includes(letter)){
            line = 1
        }
        else{
            line = 2
        }
        switch (letter) {
            case "A":
            case "Q":
                coln = 0
                break
            case "DELETE":
            case "Z":
            case "S":
                coln = 1
                break
            case "E":
            case "D":
            case "W":
                coln = 2
                break
            case "R":
            case "F":
            case "X":
                coln = 3
                break
            case "T":
            case "G":
            case "C":
                coln = 4
                break
            case "Y":
            case "H":
            case "V":
                coln = 5
                break
            case "U":
            case "J":
            case "B":
                coln = 6
                break
            case "I":
            case "K":
            case "N":
                coln = 7
                break
            case "O":
            case "L":
            case "ENTER":
                coln = 8
                break
            case "P":
            case "M":
                coln = 9
                break;
        }
        return this.innerHTML[line].cells[coln]
    }
}
