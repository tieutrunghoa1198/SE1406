import React, { Component } from 'react'
import Record from '../Record/Record'

export default class Slide extends Component {
    render() {
        return (
            <div className="slider_area">
                <div className="single_slider  d-flex align-items-center slider_bg_1 overlay">
                    <div className="container-fluid">
                        <div className="row justify-content-start">
                            <div className="col-lg-10 col-md-10">
                                <div className="slider_text">
                                    <h3 className="">
                                        Voicebot development using FPT's API.
                                    </h3>
                                    <Record/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
