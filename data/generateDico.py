import requests
import argparse
from bs4 import BeautifulSoup


class Data :
    def __init__(self, id):
        self.id = id
        self.list = []
        self.len = 0

    def append(self, news):
        self.list += news
        self.len += len(news)

    def writeInJSON(self, fileName):
        file = open(fileName + ".json", "a")
        file.write("\"" + str(self.id) + "\": {")
        file.write("\"len\": " + str(self.len) + ", ")
        file.write("\"list\": [\"")
        listJSON = "%s" % "\", \"".join(map(str, self.list))
        file.write(listJSON)
        file.write("\"]}, ")
        file.close()

    def getLen(self):
        return self.len


def getList(wordID, pageID):
    source = "https://www.listesdemots.net/"
    source += "mots" + str(wordID) + "lettres"
    if pageID > 1:
        source += "page" + str(pageID)
    source += ".htm"

    requete = requests.get(source)
    page = requete.content

    delimiters = ["<span class=\"mot\">", "</span>"]
    soup = str(BeautifulSoup(page, features = "html.parser"))
    begin = soup.find(delimiters[0]) + len(delimiters[0])
    end = begin + soup[begin:-1].find(delimiters[1])
    list = soup[begin:end].split()

    return list


def initJSON(path):
    file = open(path, "w")
    file.write("{")
    file.close()

def endJSON(path):
    file = open(path, "a")
    file.seek(0, 2)
    size = file.tell()
    file.truncate(size - 2)
    file.write("}")
    file.close()


def main(arg):
    wordID = 2
    pageID = 0
    while pageID != 1:
        data = Data(wordID)
        pageID = 1
        while (list := getList(wordID, pageID)):
            data.append(list)
            pageID += 1
        if data.getLen() > 0:
            data.writeInJSON(arg.output)
            print("Tous les mots de " + str(wordID) + " lettres sont extraits.")
        wordID += 1


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description=__doc__)
    argparser.add_argument(
        '--output', '-o',
        default='dico',
        help='Name of the output file (default: dico)'
    )
    arg = argparser.parse_args()
    initJSON(arg.output + ".json")
    main(arg)
    endJSON(arg.output + ".json")
