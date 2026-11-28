from pypdf import PdfReader

reader = PdfReader("notes.pdf")
print(f"{len(reader.pages)} pages")

for i, page in enumerate(reader.pages):
    text = page.extract_text()
    print(f"--- page {i+1} ---")
    print(text)