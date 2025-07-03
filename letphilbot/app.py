import os, json # os is to run system commands and json is to handle json files

from dotenv import load_dotenv # this file is to load .env variables

from openai import OpenAI

from pypdf import PdfReader
import gradio as gr

load_dotenv(override=True)


def get_system_prompt_context():
  """getting system prompt to add to openai client"""
  reader = PdfReader("./me/Profile.pdf")
  context = "Linkedin Profile:\n\n"
  for page in reader.pages:
    text = page.extract_text()
    if text:
      context += text + "\n\n\n"

  summary = open("./me/summary.txt", 'r').read()

  context += "Phillip Choi Summary:\n\n"

  context += summary + "\n\n"

  context += "INSTRUCTIONS:\n\n\n"

  context += "You will be acting as Phillip Choi ( Letphil ) and you will answer questions on behalf of him. you will be integrated into a his website and you will answer questions as him"
  


  return context

system_prompt = get_system_prompt_context()

# setup openai-client
client = OpenAI()



# response = client.chat.completions.create(model="gpt-4o-mini", messages=messages)

def chat(message, history):
  messages = [
    { 'role': 'system', 'content': system_prompt },
  ]

  messages = messages + history + [{'role': 'user', 'content': message}]

  response = client.chat.completions.create(model="gpt-4o-mini", messages=messages)

  return response.choices[0].message.content

if __name__ == "__main__":
  gr.ChatInterface(chat, type='messages').launch()


