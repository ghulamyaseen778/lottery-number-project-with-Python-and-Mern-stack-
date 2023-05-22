import cv2
import pytesseract
import pymongo
import datetime

if __name__ == "__main__":
    client = pymongo.MongoClient("")
    db = client["test-database"]
    # posts = db.posts
    # post_id=posts.insert_one({"p":1}).inserted_id
    # print(post_id)

def addNumbers(db,num):
    paperNumber = db.papernumbers
    paperNumber_id=paperNumber.insert_one({
        "num":num,
        "date":datetime.datetime.utcnow()
    }).inserted_id
    return paperNumber_id

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

img = cv2.imread("img.8.jpg")
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
img = cv2.resize(img,(500,500))

# print(pytesseract.image_to_boxes(img))

hImg,wImg,_ = img.shape
# detact charcters
# boxes = pytesseract.image_to_boxes(img)
# for b in boxes.splitlines():
#     b = b.split(' ')
#     print(b)
#
#     x,y,w,h = int(b[1]),int(b[2]),int(b[3]),int(b[4])
#     cv2.rectangle(img,(x,hImg-y),(w,hImg-h),(0,0,255),2)
#     cv2.putText(img,b[0],(x,hImg-y+25),cv2.FONT_HERSHEY_COMPLEX,1,(50,50,255),2)

# detact words
# cong = r'--oem 3 --psm 6 outputbase digits'
boxes = pytesseract.image_to_data(img)
# print(boxes)
numhh=0
for ind,b in enumerate(boxes.splitlines()):
    if ind!=0:
        b = b.split()
        if len(b)==12:
            numhh = numhh + 1
            print(b[11])
            print(addNumbers(db, b[11]))
            x,y,w,h = int(b[6]),int(b[7]),int(b[8]),int(b[9])
            cv2.rectangle(img,(x,y),(w+x,h+y),(0,50,255),2)
            cv2.putText(img,b[11],(x,y),cv2.FONT_HERSHEY_COMPLEX,0.5,(255,255,255),1)
print(numhh)
cv2.imshow("result",img)
cv2.waitKey(0)

