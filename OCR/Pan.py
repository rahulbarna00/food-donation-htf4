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


image_files = ["img.png", "img.png", "img.png"]

text = getImageText(image_files)

pattern = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
matches = re.findall(pattern, text)

if matches:
    print("Found matching number sequence(s):", matches)
else:
    print("Correct input needed")
