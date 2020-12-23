import re
import requests 
from bs4 import BeautifulSoup 

url="https://www.whatsappgrouplinker.tk/p/postlinks.html"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
#print(soup.find_all('links'))
         


s=soup.find_all('script')

t=""
for i in (str(s[7]).split("[")[1]).split("]")[0]:
    if(i=='\t'):
        continue
    t=t+i
links=re.findall('\'(.+?)\'',t)
faild=[]
print("========link available===============  ")
for i in links:
    url=i.split("=")[1]
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    if(soup.find_all('h2')[0].get_text()==""):
        faild.append(i.split("=")[0])
        #print(i.split("=")[0],"link rest")
        continue
    #passed.append(i.split("=")[0])
    print(i.split("=")[0]+" "+soup.find_all('h2')[0].get_text())
    
print("=========change links================  ",len(faild),"/",len(links))
for i in faild:
    print(i)

input()
