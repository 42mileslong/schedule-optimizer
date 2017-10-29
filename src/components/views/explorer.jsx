import React, { Component } from "react";
import Schedule from '../explorer/schedule';

export default class Explorer extends Component {
    render() {
        return (
            <div id="explorer">
                <Schedule />
            </div>
        );
    }
}
