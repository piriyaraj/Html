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

def getdata(url):
    reqs = requests.get(url)
    soup = BeautifulSoup(reqs.text, 'html.parser')
    
             
    #1907 Harley-Davidson Model X8 specifications and pictures
    #Title:Harley-Davidson Model X8
    #Tags: 1907 Harley-Davidson

    table=soup.find_all('table')[5]
    
    title=soup.title.text
    tags=title.split()[0]+","+title.split()[1]
    bike_name=title.replace(" specifications and pictures","").replace(title.split()[0]+" ","")
    title=title.replace(" specifications and pictures","").replace(title.split()[0]+" ","")+" | Price, Photos, Millage, Speed, Colours etc.🏍"
    descri="Find NAME price, speed, mileage, images, specifications, news, videos, Colours and variants information at BikeSpeci. More Details.🏍".replace("NAME",bike_name) 
    print(title+"\n"+tags+"\n"+descri)
    
    ind=str(table).index("Further")
    contant=str(table)[:ind-len("""<tr><th  colspan="2" style="background-color: #cccccc; text-align: center;"><a name="FURTHER"></a>""")]
    for i in table.findAll('a'):
        contant=contant.replace(str(i),i.text)
    contant=contant.replace("#CCCCCC","#99c9ff")
    contant=contant.replace("width:100%","color: black; width: 100%;")
    contant=contant.replace("</tr><tr><th","""</tr></tbody></table><br/><table class="Grid" style="color: black; width: 100%;"><tbody><tr><th""")

    contant=contant.replace("<table","<table align=\"center\"")
    contant=contant.replace("25%","40%")
    contant=contant.replace("90%","100%")
    contant=contant.replace("100%;\"><tr><th","100%;\"><tbody><tr><th")
    contant=contant.replace(">General"," id=\"1\">General")
    contant=contant.replace(">Engine and transmission"," id=\"2\">Engine and transmission")
    contant=contant.replace(">Chassis"," id=\"3\">Chassis")
    contant=contant.replace(">Physical"," id=\"4\">Physical")
    contant=contant.replace(">Other"," id=\"5\">Other")
    contant=constant.table_contant+contant+"""</tr></tbody></table>"""
    contant=contant.replace("</tr><tr><th","""</tr></tbody></table><br/><table align="center" class="Grid" style="color: black; width: 100%;"><tbody><tr><th""")

    #remove rating
    rate_ind_start=contant.index("<tr><td style=\"vertical-align:top;width:40%;\"><b>Rating")
    rate_ind_end  =contant[rate_ind_start:].index("</tr>")
    #print(rate_ind_start,rate_ind_end)
    remove_rating=(contant[rate_ind_start:rate_ind_end+rate_ind_start+5])
    contant=contant.replace(remove_rating,"")
    contant=contant.replace("moped","")
    
    contant=contant.replace("bike_name",title)
    pyperclip.copy(contant)
    return contant




url="https://bikez.com/motorcycles/alta_redshift_ex_2018.php"
contant=getdata(url)
