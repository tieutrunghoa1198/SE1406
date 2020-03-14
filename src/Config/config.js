// require('dotenv').config()
const KEY = "petQoJTJmXHa6v5sY9IwdJmOzAvyaYqy"
export default {
    STT: {
        rootPath: 'https://api.fpt.ai/hmi/asr/general',
        headers: {
            'api-key': KEY
        }
    },
    TTS: {
        rootPath: 'https://api.fpt.ai/hmi/tts/v5',
        headers: {
            'api-key': KEY,
            'voice': 'banmai',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    rootAPI:  'http://localhost:8080/api_voicebot' 
}