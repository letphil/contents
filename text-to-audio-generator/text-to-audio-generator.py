import pyttsx3

user_input = input('input text to turn into audio: ')

engine = pyttsx3.init()

voices = engine.getProperty('voices')

engine.setProperty('voice', voices[0].id)

rate = engine.getProperty('rate')
engine.setProperty('rate', 125)

engine.say(user_input)

engine.runAndWait()

