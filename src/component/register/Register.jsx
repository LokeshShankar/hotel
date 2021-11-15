import { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RegisterCard from "./RegisterCard";
import RegisterRedux from "./RegisterRedux";

const store = createStore(RegisterRedux);

class Register extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <RegisterCard roleVisible={this.props.roleVisible} history={this.props.history}></RegisterCard>
        </div>
      </Provider>
    );
  }
}

export default Register;
