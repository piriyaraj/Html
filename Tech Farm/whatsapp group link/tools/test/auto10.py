from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import pyautogui
from selenium.webdriver.common.action_chains import ActionChains
import time
import pyperclip
from selenium.webdriver.common.keys import Keys

currentUrl=""
def refresh(driver):
    driver.refresh()
    time.sleep(10)
    
def start():
    try:
        global driver
        driver = webdriver.Chrome('./chromedriver')
        driver.get("https://stackoverflow.com/users/login?ssrc=head")
        print("login stackoverflow using google after that click enter:")
        input()
        driver.get("https://draft.blogger.com/blog/posts/3099072807635536710")
    except:
        pass


def newpost(driver):
    try:
        driver.find_element_by_class_name("MIJMVe").click()
    except:
        refresh(driver)
        newpost(driver)
   
    
def title(driver,ptitle):
    try:
        #Title insert
        time.sleep(10)
        driver.implicitly_wait(6)
        driver.refresh()
        WebDriverWait(driver, 30).until(lambda d: d.find_elements_by_xpath("//input[@jsname='YPqjbf']")[0])
        driver.find_elements_by_xpath("//input[@jsname='YPqjbf']")[0].send_keys(ptitle)
    except:
        refresh(driver)
        title(driver,ptitle)
        
def content(driver,pcontent):
    try:
        #Post content insert
        WebDriverWait(driver, 10).until(lambda d: d.find_elements_by_xpath("//iframe")[1])
        iframe = driver.find_elements_by_xpath("//iframe")[1]
        driver.switch_to.frame(iframe)
        pyperclip.copy(pcontent)
        i=driver.find_element_by_tag_name("p")
        i.send_keys(Keys.CONTROL, 'v')
        driver.switch_to.default_content()
    except:
        refresh(driver)
        content(driver,pcontent)

def tag(driver,ptag):
    try:
        #tag insert
        WebDriverWait(driver, 10).until(lambda d: d.find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Separate labels by commas']")[0])
        driver.find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Separate labels by commas']")[0].send_keys(ptag)
    except:
        refresh(driver)
        tag(driver,ptag)
        
def descri(driver,pdescri):
    try:
        #descripe insert
        global currentUrl
        currentUrl=driver.current_url
        
        WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*/span/c-wiz/div/div[2]/div[5]/div/span/div/div"))
        driver.find_elements_by_xpath("//*/span/c-wiz/div/div[2]/div[5]/div/span/div/div")[0].click()
        WebDriverWait(driver, 10).until(lambda d: d.find_elements_by_xpath("//*/div/div[1]/div[1]/div[2]/textarea")[0])
        driver.find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Enter search description']")[0].send_keys(pdescri)
    except:
        refresh(driver)
        descri(driver,pdescri)
        
def image(driver,pimage):
    try:
        #imgage insert
        WebDriverWait(driver, 10).until(lambda d: d.find_elements_by_xpath("//span[@class='vde74d']")[2])

        driver.find_elements_by_xpath("//span[@class='vde74d']")[2].click()
        WebDriverWait(driver, 10).until(lambda d: d.find_element_by_class_name("qjTEB"))
        
        clicker=driver.find_elements_by_xpath("//div[@data-command='+insertPhoto1'][@data-value='upload']/div[@class='jO7h3c']")[1]
        clicker.click()
        driver.implicitly_wait(1)
        clicker.click()
        actionChains = ActionChains(driver)

        actionChains.double_click(clicker).perform()
        clicker.click()
        WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//iframe[@allow='camera']"))

        iframe = driver.find_element_by_xpath("//iframe[@allow='camera']")
        driver.switch_to.frame(iframe)
        upload=driver.find_element_by_xpath("//input[@type='file']")
        upload.send_keys(os.path.abspath(pimage))

        #select button
        WebDriverWait(driver, 10).until(lambda d: d.find_element_by_class_name("ve-tb-Ze-enabled"))
        driver.find_element_by_xpath("//*[@id='picker:ap:0']").click()

        driver.switch_to.default_content()
    except:
        refresh(driver)
        image(driver,pimage)

def back(driver):
    try:
        time.sleep(10)
        driver.back()
        time.sleep(10)
        if(currentUrl==driver.current_url):
            time.sleep(10)
            back(driver)
    except:
        back(driver)
    
def postnow(driver,ptitle,pcontent,ptag,pdescri,pimage):
    try:
        time.sleep(4)
        newpost(driver)
        time.sleep(4)
        title(driver,ptitle)
        time.sleep(4)
        tag(driver,ptag)
        time.sleep(4)
        descri(driver,pdescri)
        time.sleep(4)
        content(driver,pcontent)
        time.sleep(4)
        image(driver,pimage)
        time.sleep(4)
        back(driver)
        time.sleep(10)
        print("posted")
    except:
        print("posting failed")

#import importlib
#importlib.reload(auto10)
#postnow(driver,"Title1","content1","tags1","description1","./test/a.webp")
