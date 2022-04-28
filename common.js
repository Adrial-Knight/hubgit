export const hint = {
                found: "found",
                present: "present",
                ingame: "ingame",
                visible: "visible"
             }

export const unsetChar = "."

var request = new XMLHttpRequest();
request.open("GET", "dico.txt", false);
request.send(null);
export const dico = request.responseText.split("\n");
