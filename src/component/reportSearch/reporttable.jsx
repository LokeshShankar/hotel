import { Component } from "react";
import Table from "react-bootstrap/Table";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Button from "../utility/Button";
import "../../css/searchresultspage/searchresults.css";

class ReportTable extends Component {
  constructor(props) {
    super(props);
    //        console.log(this.props);
    this.state = {};
  }
  render() {
    // console.log(this.props.results.length)
    return (
      <div>
        <div>
          <table id="report" className="border">
            <thead>
              <tr>
                <th>Hotel name</th>
                <th>phone</th>
                <th>Email</th>
                <th xs lg="2">
                  check-in
                </th>
                <th>check-out</th>
                <th>tax rate</th>
                <th>hotel visibility</th>
                <th>created on</th>
                <th>rating</th>
              </tr>
            </thead>
            {this.props.results.map((hotel) => {
              return (
                <tbody key={hotel.hotelId} hotelid={hotel.hotelId}>
                  <tr>
                    <td>{hotel.hotelName}</td>
                    <td>{hotel.phone}</td>
                    <td>{hotel.email}</td>
                    <td>{hotel.checkInTime}</td>
                    <td>{hotel.checkOutTime}</td>
                    <td>{hotel.taxRate}</td>
                    <td>{hotel.hotelVisibility.toString()}</td>
                    <td>{hotel.createdOn}</td>
                    <td>{hotel.rating}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          {/* <ReactHTMLTableToExcel  
                            className="btn btn-info"  
                            table="report"  
                            filename="hotels"  
                            sheet="Sheet"  
                            buttonText="Export to excel" /> 
                            <div style={{display:"flex"}}>
                </div> */}
        </div>
      </div>
    );
  }
}

export default ReportTable;
