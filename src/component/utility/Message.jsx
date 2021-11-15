import React from "react";
import "../../css/utility/message.css";
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class={this.props.msgtype}>
                <p>{this.props.msg}</p>
            </div>
         );
    }
}
 
export default Message;