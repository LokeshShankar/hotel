import React from "react";
import ServiceListItems from "./ServiceListItems";

class ServiceList extends React.Component {
  renderItems() {
    return this.props.ServiceListItem.map((item, index) => (
      <ServiceListItems key={index} {...item} />
    ));
  }

  render() {
    //    console.log();
    return (
      <div className="service-list">
        {this.renderItems(this.props.ServiceListItem)}
      </div>
    );
  }
}

export default ServiceList;
