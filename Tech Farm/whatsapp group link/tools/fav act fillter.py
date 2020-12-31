import re
import requests 
from bs4 import BeautifulSoup 

def finddetails(url):
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    text=soup.find_all('tbody')
    for i in text:
        if(i.get_text().upper().find('FAVORITE')!=-1):
            lenth=i.get_text().upper().find('FAVORITE')
            print(i.get_text()[:lenth].replace("\n", " "))
            actor=i.get_text()[i.get_text().upper().find('ACTOR'):i.get_text().upper().find('ACTRESS')]
            actress=i.get_text()[i.get_text().upper().find('ACTRESS'):i.get_text().upper().find('FOOD')]
            print("Actor   => ",end="")
            for k in actor[actor.find("ACTOR")+6:]:
                
                if(k=="\n"):
                    continue
                print(k,end="")
                
            print("\n")
            print("Actress => ",end="")
            for k in actress[actor.find("ACTRESS")+8:]:
                if(k=="\n"):
                    continue
                print(k,end="")
            print("\n")
            break



url="https://www.whatsappgrouplinker.tk/sitemap.xml"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
#print(soup.prettify().replace("\n",""))
links=re.findall(r'<loc>(.+?)</loc>',soup.prettify().replace("\n","").replace(" ",""))
for i in links:
    finddetails(i)

