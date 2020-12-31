import re
import requests 
from bs4 import BeautifulSoup 
import constant
import os
from PIL import Image
import auto10

#=================================================
start=20
#=================================================

def finddetails(url):
    
    global title
    global header
    global text
    global footer
    global tags
    global descri
    global image
    header=constant.header.replace("HRITHIK ROSHAN","")+"\n"
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    
    title=soup.title.text.upper().split(" PROFILE")[0]
    print(title,end='status: ')
    header=constant.header.replace("HRITHIK ROSHAN",title)
    footer=constant.footer.replace("HRITHIK ROSHAN",title)

    table_head=constant.table_head.replace("HRITHIK ROSHAN",title)
    
    tags=""
    for i in soup.findAll('a', {'rel': 'category tag'}):
        tags+=','+i.text.upper().split()[0]
    tags=tags[1:]
    links=soup.find_all('a')
    img_url = soup.find_all('img')[0].get('src')
    res=requests.get(img_url)
    
    text = str(soup.find_all('table')).replace("[","").replace("]","").replace("#941818","#0E600B")
    text=str(text).replace("b>","span>").replace("/b>","/span>")
    text=text.replace("Biodata and Biography","Biography  "+table_head)
    text=text.replace("Family and Relatives","Relatives  "+table_head)
    text=text.replace("Height, Weight and Body Measurements","Measurements  "+table_head)
    text=text.replace("Education School and Colleges","Colleges  "+table_head)
    text=text.replace("Residence and Contact Address","Address  "+table_head)
    text=text.replace("Awards, Honours, Achievements","Achievements  "+table_head)
    text=text.replace("Favorite ","")
    text=text.replace("Favirote ","")
    text=text.replace("strong","span")
    text=text.replace("Favorites","Favorites  "+table_head)
    text=text.replace("Social Media","Social Media  "+table_head)
    
    wa_links=constant.wa_links
    
    
    for i in links:
        if(i.text.upper()==title.replace(" ","_") or str(i.attrs["href"]).find("leoranews")==-1):
            continue
        if(text.find(str(i))!=-1):
            for k in wa_links:
                wa_title=(wa_links[0].split("/")[-1].split("-whatsapp")[0].replace("-"," ").upper())
                if(wa_title==i.text.upper()):
                   text=text.replace(str(i),"""<a href="linker" target="_blank" style="color: #ff6601;">""".replace("linker",str(k)[str(k).find("/20"):])+i.text+"""</a>""")
                   continue
                text=text.replace(str(i),i.text)
    text=text.replace("""style="color: #ff6600;""","")
    for i in wa_links:
        wa_title=(i.split("/")[-1].split("-whatsapp")[0].replace("-"," ").upper())
        
        if(wa_title==title):
            try:
                os.mkdir("uploaded/"+title)
            except:
                pass
            file = open("uploaded/"+title+"/"+title+'.webp','wb')
            for chunk in res.iter_content(10000): 
                file.write(chunk) 
            file.close()
            
            
            with open("uploaded/"+title+"/"+title+".txt", "w", encoding="utf-8") as f:
                f.write(title+" WHATSAPP GROUP<br>"+tags+header+text+footer)
                return 0;
    try:
        os.mkdir("toupload/"+title)
    except:
        pass

    file = open("toupload/"+title+"/"+title+'.webp','wb')
    for chunk in res.iter_content(10000): 
        file.write(chunk)
    
    file.close()
    
    image1=Image.open("toupload/"+title+"/"+title+'.webp') # open the images 
    image2 = Image.open('LOGO2.PNG')  # open logo
    image1_size = image1.size        # get image size
    image2 = image2.resize((200,30))# resize the logo as 1/9 image size
    image2_size = image2.size        # get the resized logo sizes
    new_image = Image.new('RGB',(image1_size[0], image1_size[1]), (250,250,250))  #create new image size as old image size
    new_image.paste(image1,(0,0))    # insert image into new image we created
    new_image.paste(image2,((image1_size[0]-image2_size[0],image1_size[1]-image2_size[1]))) # insert resized logo into the new image
    os.remove("toupload/"+title+"/"+title+'.webp')         # romove image
    new_image.save("toupload/"+title+"/"+title+" WhatsApp group linker"+'.webp' ,"webp")         # save new image
    
    
    with open("toupload/"+title+"/"+title+".txt", "w", encoding="utf-8") as f:
        f.write(title+" WHATSAPP GROUP<br>"+tags+header+text+footer)

    descri='celebrity '+title+' WhatsApp group links fans groups photos and details  You can find every thing about '+title
    image="./toupload/"+title+"/"+title+" WhatsApp group linker"+'.webp'
    
    auto10.postnow(auto10.driver,title+" WHATSAPP GROUP",header+text+footer,tags,descri,image)


title=""
header=""
text=""
footer=""
tags=""
descri=""
image=""
try:
    os.mkdir("toupload")
except:
    pass
try:
    os.mkdir("uploaded")
except:
    pass

auto10.start()

res=requests.get("https://1.bp.blogspot.com/-jAsbYGknZto/X-YltlBV3YI/AAAAAAAAAuU/mUdlox3fc04QI03jm8BZ4FKXOdFmtZaLwCNcBGAsYHQ/s0/LOGO2.png")
file = open('LOGO2.PNG','wb')
for chunk in res.iter_content(10000): 
    file.write(chunk) 
file.close()


url="http://www.leoranews.com/post-sitemap.xml"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')
leora_link=re.findall(r'<loc>(.+?)</loc>',soup.prettify().replace("\n","").replace(" ",""))
for i in leora_link:
    if(leora_link.index(i)<start):
        continue
    if(leora_link.index(i)==start+2):
        break
    print(leora_link.index(i),"/",len(leora_link),":",end="")
    finddetails(str(i))
print("Finshed: Click Enter")
input()
os.remove("LOGO2.PNG")      

