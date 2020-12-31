import os, requests, bs4, webbrowser, random 
 

  
res = requests.get('http://www.leoranews.com/profiles/telugu-tv-anchors/varshini-sounderajan/') 
try: 
    res.raise_for_status() 
except Exception as exc: 
    print('Sorry an error occured:', exc) 
 
soup = bs4.BeautifulSoup(res.text, 'html.parser')  
img_url = soup.find_all('img')[0].get('src')
res=requests.get(img_url)
file = open("toupload/hello"+'.webp','wb')
for chunk in res.iter_content(10000): 
    file.write(chunk) 
file.close()
