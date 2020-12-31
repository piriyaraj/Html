import os, requests, bs4, webbrowser, random 
 

  
res = requests.get('https://bikez.com/motorcycles/aprilia_rsv4_rf_2020.php') 
try: 
    res.raise_for_status() 
except Exception as exc: 
    print('Sorry an error occured:', exc) 
 
soup = bs4.BeautifulSoup(res.text, 'html.parser')

table=soup.find_all('table')[1]
a_tags = table.find_all('a')
for i in a_tags:
    url=i.get_attribute_list('href')[0]
    try:
        index=url.find('.com/pictures/large.php?image=..')
    except:
        continue
    if(index!=-1):
        print(url)
        break

        
img_title=soup.title.text.split('specifications')[0]+"bikespeci"    
img_url="https://bikez.com"+str(url).split('.com/pictures/large.php?image=..')[1]
res=requests.get(img_url)
file = open(img_title+'.webp','wb')
for chunk in res.iter_content(10000): 
    file.write(chunk) 
file.close()
