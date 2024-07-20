# audio-to-text-generator

### description

```
using audio recording 'navigator.mediaDevices.getUserMedia', capture audio and send to server, server will then convert to mp3 and upload it

send to deepgram api to get text using 'deepgram.listen.prerecorded.transcribeFile'

return to frontend the uploaded file link and text to be displayed

```

## packages

```

deepgram-sdk
- npm install @deepgram/sdk

express
- npm install express

devDependencies:
- dotenv
- nodemon

```
