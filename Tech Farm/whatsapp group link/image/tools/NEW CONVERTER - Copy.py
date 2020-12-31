from PIL import Image
import os
imname=os.listdir("../image/")  #read files in image folder
print(imname);
for i in imname:
    if(i.split(".")[1]=="webp"):     # image is webp fromate delete the image
        os.remove("../image/"+i)
        continue
    image1=Image.open("../image/"+i) # open the images 
    
    image2 = Image.open('LOGO2.PNG')  # open logo
    image1_size = image1.size        # get image size
    image2 = image2.resize((200,30))# resize the logo as 1/9 image size
    image2_size = image2.size        # get the resized logo sizes
    new_image = Image.new('RGB',(image1_size[0], image1_size[1]), (250,250,250))  #create new image size as old image size
    new_image.paste(image1,(0,0))    # insert image into new image we created
    new_image.paste(image2,((image1_size[0]-image2_size[0],image1_size[1]-image2_size[1]))) # insert resized logo into the new image
    new_image.save("../image/"+i.split(".")[0]+"_whatsappgrouplinker.webp" ,"webp")         # save new image
    #os.remove("../image/"+i)         # romove image
