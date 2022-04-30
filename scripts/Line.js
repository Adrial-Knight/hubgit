export class Line {
    constructor(cache, length) {
        this.cache = cache
        this.length = length
        this.unsetChar = "_"
        this.hint = {found: "found", present: "present", ingame: "ingame", visible: "visible", absent: "absent"}
        this.innerHTML = insertInHTML(this.length, this.unsetChar)
    }
    refresh(status) {
        status[0] = this.hint.found
        var i = 0
        for (i; i < this.cache.length; i++) {
            this.innerHTML.cells[i].innerHTML = this.cache[i]
            this.innerHTML.cells[i].className = status[i]
        }
        for (i; i < this.length; i++) {
            this.innerHTML.cells[i].innerHTML = this.unsetChar
            this.innerHTML.cells[i].className = this.hint.visible
        }
    }
    push(input) {
        input = input[0].toUpperCase()
        if (this.cache.length < this.length){
            if ((this.cache.length != 1) || (this.cache[0] != input)){
                this.cache += input
            }
        }
    }
    pop() {
        if (this.cache.length > 1){
            this.cache = this.cache.slice(0, -1)
        }
    }
    getCache() {
        return this.cache
    }
    getFirstLetter() {
        return this.cache[0]
    }
    getLenght() {
        return this.length
    }
    getHintList() {
        return this.hint
    }
}

function insertInHTML(length, unsetChar){
    var grid = document.getElementById("gameGrid")
    var id = 0
    if (grid.childNodes[0]){
        id = grid.childNodes[0].childElementCount
    }
    var prevHTML = grid.innerHTML.replace('</tbody>','')  // open the previous tab if previously defined
    grid.innerHTML = prevHTML + "<tr>" + ("<th class=\"visible\">" + unsetChar + "</th>").repeat(length) + "</tr>"
    var line = grid.getElementsByTagName("tr")[id];
    return line
}
