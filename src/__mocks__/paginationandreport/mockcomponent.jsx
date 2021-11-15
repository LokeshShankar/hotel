import {Component} from 'react';

class MockComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <ul>
                    {
                        this.props.results.map((result) => {
                            return <li>{result}</li>;
                        })
                    }
                </ul>
            </div>
         );
    }
}
 
export default MockComponent;