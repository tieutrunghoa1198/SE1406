import React, { Component } from 'react'
import ReactRecord from 'react-record'
import axiosStt from '../../Config/axiosStt'
import axiosLocal from '../../Config/axiosLocal'
import axiosTts from '../../Config/axiosTts'
import { ClipLoader } from "react-spinners"
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

    isLoading = (boolean) => {
        this.setState({
            isLoading: boolean
        })
    }

    startRecording = () => {
        this.setState({
            isRecording: true
        });
    }

    stopRecording = () => {
        if (this.state.isRecording !== false) this.isLoading(true)
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
        this.isLoading(true)
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
                this.isLoading(false)
                console.log('Ready status: ', audio.readyState)
            }).catch(err => {
                console.log('Ready status: ', audio.readyState)
                console.log('Lỗi: ', err)
            })
        }, timeout);
    }

    render() {
        const { isRecording, isLoading, transcript } = this.state;
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
                    <div className="d-flex justify-content-start my-3">
                        <p className="display-4 text-light mt-3 mx-3">
                            {isLoading ? <ClipLoader color={"white"} /> : transcript}
                        </p>
                    </div>
                </ReactRecord>
            </div>
        );
    }
}
