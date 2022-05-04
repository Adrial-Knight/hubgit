src = "pli07.txt"
dst = "dico.json"

# reading data
f = open(src, "r")
words = f.read().splitlines()
dictionary = [[] for _ in range(30)]
[dictionary[len(word)].append(word) for word in words]
f.close()

# writting data
f = open(dst, "w")
f.write("{")  # JSON opening
for dico in dictionary:
    if not len(dico):
        continue
    f.write("\"" + str(len(dico[0])) + "\":{")
    f.write("\"len\":" + str(len(dico)) + ",")
    f.write("\"list\":[\"")
    list = "%s" % "\", \"".join(map(str, dico))
    f.write(list)
    f.write("\"]},")

f.truncate(f.tell() - 1)  # remove last ","
f.seek(0, 2)
f.write("}")  # JSON ending
f.close()
