import json
import requests
import openai 
import os

ANKI_CONNECT_URL = "http://127.0.0.1:8765"

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
payload = {
    "action": "findNotes",
    "version": 6,
    "params": {"query": "deck:Suomi", "query": "prop:due>=1"}
}

response = requests.post(ANKI_CONNECT_URL, json=payload)
note_ids = response.json().get("result", [])

payload = {
    "action": "notesInfo",
    "version": 6,
    "params": {"notes": note_ids}
}

response = requests.post(ANKI_CONNECT_URL, json=payload)
notes = response.json().get("result", [])

studied_terms = [note["fields"]["FrontText"]["value"] for note in notes]  
print(studied_terms)
print(len(studied_terms))

response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # or "gpt-4"
    messages=[
        {"role": "system", "content": "I am going to give you a list of words in Finnish and I need you to write a story for me using them so I can practice learning them. The story can be pretty length and should make sense. Don't feel limited to only the words I give you."},
        {"role": "user", "content": ", ".join(studied_terms)}  # Ensure studied_terms is a string
    ]
)

# Print the generated story
print(response.choices[0].message.content)

# Insert the story into a text file with UTF-8 encoding
with open("story.txt", "w", encoding="utf-8") as file:
    file.write(response.choices[0].message.content)
