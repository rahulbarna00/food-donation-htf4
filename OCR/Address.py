import pytesseract.pytesseract
import streamlit as st
from pytesseract import image_to_string
from PIL import Image
from dotenv import load_dotenv
from openai import OpenAI
import re
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
load_dotenv()
client = OpenAI()

def getImageText(images):
    text = ""
    for image in images:
        img = Image.open(image)
        text += image_to_string(img)
    return text



def bold_subheadings(content):
    # List of subheadings to bold
    subheadings = ['Address']


    for subheading in subheadings:
        content = content.replace(subheading, f'*{subheading}*')

    return content


def main():
    st.set_page_config(page_title="AutoTPC", page_icon=":books:")

    st.header("Input your pdfs")

    st.subheader("Your pdfs")
    pdfs = st.file_uploader("Upload Your Raw(s) and click on Generate", accept_multiple_files=True)
    if st.button("Generate"):
        with st.spinner("Processing"):
            raw = getImageText(pdfs)
            if raw:
                completion = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "user", "content": f"Please extract any addresses from the following text, Please provide the extracted addresses.{raw}"}])
                if completion.choices and len(completion.choices) > 0:
                    st.subheader("Generated Notice:")
                    # Bold out subheadings before displaying
                    generated_notice = bold_subheadings(completion.choices[0].message.content)
                    # Use st.text_area to make the text copyable
                    st.text_area(label="", value=generated_notice, height=300)
                else:
                    st.warning("No response from the model.")
            else:
                st.warning("No text extracted from PDFs.")

if __name__ == "__main__":
    main()
