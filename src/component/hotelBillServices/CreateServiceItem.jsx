import axios from "axios";
import React from "react";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
class CreateServiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newServiceName: "",
      newPrice: 0,
    };
  }

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleCreate = (e) => {
    e.preventDefault();
    //    console.log(this.props);

    if (this.state.newServiceName == "") {
      alert("Please enter a Service name.");
      return;
    } else if (this.state.newPrice == "") {
      alert("Please enter Price.");
      return;
    } else if (
      this.props.ServiceListItem.map((element) => element.name).indexOf(
        this.state.newServiceName
      ) != -1
    ) {
      alert("This Service already exists.");
      this.setState({ newServiceName: "" });
      this.setState({ newPrice: "" });
      return;
    }
    this.props.createItem(this.state.newServiceName, this.state.newPrice);

    this.setState({ newServiceName: "" });
    this.setState({ newPrice: "" });
  };

  render() {
    return (
      <div className="">
        <form
          onSubmit={this.handleCreate}
          className="hotel-bill-service-create-new"
        >
          <input
            type="text"
            placeholder="New Service"
            value={this.state.newServiceName}
            name="newServiceName"
            onChange={this.onInputChange}
          />
          <input
            type="number"
            placeholder="Price"
            value={this.state.newPrice}
            name="newPrice"
            onChange={this.onInputChange}
          />
          <button className="btn--publicis-secondary">CREATE</button>
        </form>
      </div>
    );
  }
}

export default CreateServiceItem;
