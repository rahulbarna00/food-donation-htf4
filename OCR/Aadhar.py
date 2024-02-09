import re
from pytesseract import image_to_string
from PIL import Image
import pytesseract.pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"


def getImageText(images):
    text = ""
    for image in images:
        img = Image.open(image)
        text += image_to_string(img)
    return text


image_files = ["img.png"]

text = getImageText(image_files)

pattern = r'\d{4}\s\d{4}\s\d{4}'

matches = re.findall(pattern, text)

if matches:
    print("Found matching number sequence(s):", matches)
else:
    print("Insert correct photo")
