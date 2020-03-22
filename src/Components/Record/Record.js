import React, { Component } from 'react'
import ReactRecord from 'react-record'
import axiosStt from '../../Config/axiosStt'
import axiosLocal from '../../Config/axiosLocal'
import axiosTts from '../../Config/axiosTts'
export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            transcript: '',
            isRecording: false
        }
        this.audio = new Audio()
    }

    startRecording = () => {
        this.setState({
            isRecording: true
        });
    }

    stopRecording = () => {
        this.setState({
            isRecording: false
        });
    }

    onStop = blobObject => {
        console.log('blobObject is: ', blobObject);
        this.speechToText(blobObject.blob)
    }
    /*
        interact with fpt.ai and local api
    */

    setText = (responseText) => {
        this.setState({
            transcript: responseText
        })
    }

    speechToText = (blob) => {
        let question
        axiosStt
            .post('', blob)
            .then(response => {
                question = response.data.hypotheses[0].utterance
                console.log("Speech to text: ", question)
                this.askBot(question)
            }).catch(err => {
                console.log('Request to FPT error: ', err);
                console.log(process.env)
            })
    }

    askBot = (question) => {
        let answer
        axiosLocal
            .post('/answer', {
                question: question
            })
            .then(res => {
                answer = res.data
                console.log('Success: ', res.data)
                this.setText(res.data)
                this.textToSpeech(answer)
            }).catch(err => {
                console.log('Bot don\'t understand what you say: ', err);
            })
    }

    textToSpeech = (tts) => {
        let urlResponse
        axiosTts
            .post('', tts)
            .then(response => {
                urlResponse = response.data.async
                console.log(urlResponse)
                this.waitLinkAvailable(urlResponse, 5000)
            }).catch(err => {
                console.log('Text to speech error: ', err);
            })
    }

    waitLinkAvailable = (url, timeout) => {
        /*
            Lỗi:  DOMException: The play() request was interrupted by a call to pause()
        */
        let { audio } = this
        console.log('start')
        setTimeout(() => {
            audio.src = url
            audio.play().then(() => {
                console.log('Ready status: ', audio.readyState)
            }).catch(err => {
                console.log('Ready status: ', audio.readyState)
                console.log('Lỗi: ', err)
            })
        }, timeout);
    }

    render() {
        const { isRecording } = this.state;
        return (
            <div className="record-mic">
                <ReactRecord
                    record={isRecording}
                    onStop={this.onStop}
                >
                    <button className="boxed-btn3 mx-2" onClick={this.startRecording} type="button">
                        Start
                    </button>
                    <button className="boxed-btn3 ml-2" onClick={this.stopRecording} type="button">
                        Stop
                    </button>

                </ReactRecord>
            </div>
        );
    }
}
