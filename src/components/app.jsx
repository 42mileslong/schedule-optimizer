import React from "react";
import NavBar from './navbar.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>{this.props.children}</div>
            </div>
        );
    }
}
