import React from "react";
import NavBar from './navbar.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className="card">
                <NavBar />
                <div>{this.props.children}</div>
            </div>
        );
    }
}
