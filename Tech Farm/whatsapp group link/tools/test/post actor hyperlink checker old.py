import re
import requests 
from bs4 import BeautifulSoup 
import constant
found=0
def finddetails(url):
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    text = str(soup.find_all('table'))
    title=(soup.title.text.split(" WHATSAPP")[0].replace("\n",""))
    count=0
    for i in constant.wa_links:
        if (str(i)==url):
            continue
        reqs1 = requests.get(i)
        soup1 = BeautifulSoup(reqs1.text, 'html.parser')
        for t in soup1.find_all("table"):
            if(t.text.upper().find(title)!=-1):
                for l in t.find_all('a'):
                    
                    if(l.text.upper()==title):
                        count=1
                        break
                if(count==1):
                    break
                print("IN :"+i)
                print("set:"+url)
                found=1
                return 0
        count=0


links=constant.wa_links
for i in links:
    if(found==1):
        break
    finddetails(i)
    print(i)

