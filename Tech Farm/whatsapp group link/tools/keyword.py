lists=open("keyword.txt","r")
key=""
for line in lists:
    
    key=key+","+line.split("\n")[0]
lists.close()
towrite=open("keyword.txt","w+")
towrite.write(key)
towrite.close()
