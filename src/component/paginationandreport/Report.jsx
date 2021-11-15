import React from 'react';
import ReactToPrint from 'react-to-print';

// import  ComponentToPrint  from './ComponentToPrint';

class Report extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print this out!</button>;
          }}
          content={() => this.componentRef}
        />
        {/* <ComponentToPrint data={this.props.data} ref={el => (this.componentRef = el)} /> */}
      </div>
    );
  }
}

export default Report;