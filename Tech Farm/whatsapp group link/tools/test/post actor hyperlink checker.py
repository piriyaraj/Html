import re
import requests 
from bs4 import BeautifulSoup 
import constant

links=constant.wa_links
titles=[]
for i in links:
    reqs = requests.get(i)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    title=(str(soup.title.text).split(" WHATSAPP")[0]).replace("\n","")
    titles.append(title)

print(titles)

for i in links:
    reqs = requests.get(i)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    
    tag=soup.find("article")
    para=tag.text.upper()
    for k in titles:
        title1=(str(soup.title.text).split(" WHATSAPP")[0]).replace("\n","")
        count=0
        if(k==title1):
            continue
        if(para.find(k)!=-1):
            for l in tag.find_all('a'):
                if(l.text.upper()==k):
                    count=1
                    break
            if(count==0):
                print("=============="+soup.title.text)
                print("IN :"+i)
                print("SET:"+k)
            
    
input()
        

