import React, { Component } from 'react'
import ReactRecord from 'react-record'
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
    }
    /*
        interact with fpt.ai and local api
    */

    speechToText = (blob) => {

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
