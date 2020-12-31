"""
find no of post in a year
creat :29/12/2020
update:
"""

import re
import requests 
from bs4 import BeautifulSoup 
import os
url="https://bikez.com/year/index.php?year=1895"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
#print(soup.find_all('links'))
         

post_links=[]
table=soup.find_all('table')[2]
tr=table.find_all('tr')
for i in tr:
    if(tr.index(i)==0):
        continue
    t=i.findAll('td')[0].findAll('a')
    link='https://bikez.com'+t[0].get_attribute_list("href")[0].split("..")[1]
    post_links.append(link)
print(post_links)
