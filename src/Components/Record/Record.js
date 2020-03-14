import React, { Component } from 'react'
import ReactRecord from 'react-record'
import axiosStt from '../../Config/axiosStt'
import axiosLocal from '../../Config/axiosLocal'
import axiosTts from '../../Config/axiosTts'
export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blobURL: null,
            isRecording: false
        }
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
        this.setState({
            blobURL: blobObject.blobURL
        });
        this.speechToText(blobObject.blob)
    }
    /*
        interact with fpt.ai and local api
    */

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
            }).catch(err => {
                console.log('Text to speech error: ', err);
            })
    }

    render() {
        const { isRecording } = this.state;
        return (
            <div className="record-mic">
                <ReactRecord
                    record={isRecording}
                    onStop={this.onStop}
                >
                    <div>
                        <audio
                            ref={c => {
                                this.audioSource = c;
                            }}
                            controls="controls"
                            src={this.state.blobURL}
                        >
                            <track kind="captions" />
                        </audio>
                    </div>
                    <button className="btn btn-primary mr-2" onClick={this.startRecording} type="button">
                        Start
                    </button>
                    <button className="btn btn-danger ml-2" onClick={this.stopRecording} type="button">
                        Stop
                    </button>
                </ReactRecord>
            </div>
        );
    }
}
