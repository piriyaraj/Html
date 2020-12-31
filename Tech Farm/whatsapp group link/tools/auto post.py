from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import pyautogui
driver = webdriver.Chrome('./chromedriver')
driver.get("https://stackoverflow.com/users/login?ssrc=head")
input()
driver.get("https://draft.blogger.com/blog/posts/3099072807635536710")

#new post button click
driver.find_element_by_class_name("MIJMVe").click()

#Title insert
driver.implicitly_wait(6)
WebDriverWait(driver, 30).until(lambda d: d.find_elements_by_xpath("//input[@jsname='YPqjbf']")[0])
driver.find_elements_by_xpath("//input[@jsname='YPqjbf']")[0].send_keys("Title")

#Post content insert
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//iframe[@id='nsoPic1609142790189']"))
iframe = driver.find_element_by_xpath("//iframe[@id='nsoPic1609142790189']")
driver.switch_to.frame(iframe)
driver.find_element_by_tag_name("p").send_keys("post content")
driver.switch_to.default_content()

#tag insert
WebDriverWait(driver, 10).until(lambda d: d..find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Separate labels by commas']")[1])
driver.find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Separate labels by commas']")[1].send_keys("TAGS")

#descripe insert
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*/span/c-wiz/div/div[2]/div[5]/div/span/div/div"))
driver.find_elements_by_xpath("//*/span/c-wiz/div/div[2]/div[5]/div/span/div/div")[1].click()
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*/div/div[1]/div[1]/div[2]/textarea")[1])
driver.find_elements_by_xpath("//textarea[@jsname='YPqjbf'][@aria-label='Enter search description']")[1].send_keys("DESCRIP")

#imgage insert
WebDriverWait(driver, 10).until(lambda d: d.find_elements_by_xpath("//span[@class='ytEBO']")[0])

driver.find_elements_by_xpath("//span[@class='ytEBO']")[0].click()
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*/div/c-wiz/div/div[2]/div/div/div[3]/span/div/div[2]/div[1]/div[1]/div[21]/div/div/span[1]/div[2]/span"))

driver.find_element_by_xpath("//*/div/c-wiz/div/div[2]/div/div/div[3]/span/div/div[2]/div[1]/div[1]/div[21]/div/div/span[1]/div[2]/span").click()
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//iframe[@allow='camera']"))

iframe = driver.find_element_by_xpath("//iframe[@allow='camera']")
driver.switch_to.frame(iframe)
upload=driver.find_element_by_xpath("//input[@type='file']")
upload.send_keys(os.path.abspath('./test/a.webp'))

#select button
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*[@id='picker:ap:0']"))
driver.find_element_by_xpath("//*[@id='picker:ap:0']").click()

#click x-larage image
WebDriverWait(driver, 10).until(lambda d: d.find_element_by_xpath("//*[@id='yDmH0d']/div[4]/div/div[2]/span/div/div[1]/span/div[4]/label/div"))
driver.find_element_by_xpath("//*[@id='yDmH0d']/div[4]/div/div[2]/span/div/div[1]/span/div[4]/label/div").click()

#click center image
driver.find_element_by_xpath("//*[@id='yDmH0d']/div[4]/div/div[2]/span/div/div[2]/span/div[3]/label/div").click()                 

#click ok
driver.find_element_by_xpath("//*[@id='yDmH0d']/div[4]/div/div[2]/div[3]/div[2]/span/span").click()

driver.switch_to.default_content()
