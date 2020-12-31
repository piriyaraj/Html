"""
find no of post in a year
creat :29/12/2020
update:29/12/2020
"""

import re
import requests 
from bs4 import BeautifulSoup 
import os
url="https://bikez.com/years/index.php"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
#print(soup.find_all('links'))
         
try:
    os.mkdir("data")
except:
    pass
outF = open("./data/NoOfPosts.txt", "w")
table=soup.find_all('table')[3]
tr = table.find_all(['tr'])
for row in tr:
    if(tr.index(row)==0):
        continue
    td1=row.findAll('td')[0]
    td2=row.findAll('td')[1]
    year=td1.findAll('a')[0].text
    no_post=([int(s) for s in (td2.text).split() if s.isdigit()])[0]
    outF.write(year+":"+str(no_post))
    outF.write("\n")
outF.close()




