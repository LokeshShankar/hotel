import React from 'react'
import Adminnavbar from './Adminnavbar';

class Adminheader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <header>
                <Adminnavbar isLoggedIn={this.props.isLoggedIn} />
            </header>
        );
    }
}

export default Adminheader;