"""
scrapping table from link
creat :29/12/2020
update:30/12/2020
"""

import re
import requests 
from bs4 import BeautifulSoup 
import os
import pyperclip
import constant

keys   =[]
values =[]
url="https://bikez.com/motorcycles/alta_redshift_ex_2018.php"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')   
table=soup.find_all('table')[5]
tr=table.findAll('tr')
for i in tr:
    td=i.findAll("td")
    if(len(td)==0 or len(td)==1):
        continue
    keys.append(td[0].text.replace(":",""))
    values.append(td[1].text)

for i in range(len(keys)):
    print(keys[i],":",values[i])
