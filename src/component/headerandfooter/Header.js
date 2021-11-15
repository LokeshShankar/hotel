import React from 'react'
import Navbar from './Navbar';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <header>
                <Navbar isLoggedIn={this.props.isLoggedIn} />
            </header>
        );
    }
}

export default Header;