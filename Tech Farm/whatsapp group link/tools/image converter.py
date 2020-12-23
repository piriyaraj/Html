from PIL import Image
import os
imname=os.listdir("../image/")
print(imname);
for i in imname:
    im=Image.open("../image/"+i)
    im=im.convert("RGB")
    im.save("../image/"+i.split()[0]+".webp" ,"webp")
    os.remove("../image/"+i)
