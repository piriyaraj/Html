import re
import requests 
from bs4 import BeautifulSoup 

def finddetails(url):
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    title=soup.title.text.upper().split(" PROFILE")[0]
    tags=""
    for i in soup.findAll('a', {'rel': 'category tag'}):
        tags+=','+i.text.upper().split()[0]
    tags:tags[1:]
    text = soup.find_all('table')
    with open("sample.html", "w", encoding="utf-8") as f:
        f.write(str(text).replace("[","").replace("]",""))
        
    

url="http://www.leoranews.com/post-sitemap.xml"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
links=re.findall(r'<loc>(.+?)</loc>',soup.prettify().replace("\n","").replace(" ",""))
finddetails("http://www.leoranews.com/profiles/bollywood-actors-profile/sonu-sood/")

