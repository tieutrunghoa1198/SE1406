import React, { Component } from 'react'
import Record from '../Record/Record'

export default class Slide extends Component {
    render() {
        return (
            <div class="slider_area">
                <div class="single_slider  d-flex align-items-center slider_bg_1 overlay">
                    <div class="container-fluid">
                        <div class="row justify-content-start">
                            <div class="col-lg-10 col-md-10">
                                <div class="slider_text">
                                    <h3 class="">
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
