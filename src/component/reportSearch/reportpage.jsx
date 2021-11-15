import { Fragment, Component } from "react";
import axios from "axios";
// import Adminheader from '../adminheaderfooter/Adminheader';
// import Adminfooter from '../adminheaderfooter/Adminfooter';
import ReportSearchBar from "../reportSearch/ReportSearchBar";
import "../../css/searchresultspage/searchresults.css";
import Pagination from "../paginationandreport/Pagination";
import ReportTable from "./reporttable";
import Button from "../utility/Button";
import download from "downloadjs";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import Cookies from "universal-cookie";

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: {
        fromDate: "",
        toDate: "",
        fromRating: 0,
        toRating: 5,
        infrastructure: "",
      },
      results: [],
    };
  }

  setData = (event) => {
    let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
    searchStateCopy[event.target.name] = event.target.value;
    this.setState({ searchState: searchStateCopy });
  };

  // setToDate = (event) => {
  // let searchStateCopy = JSON.parse(JSON.stringify(this.state.searchState));
  // if(new Date(searchStateCopy.fromDate) >= new Date(event.target.value))
  // {
  //     var nextDate = new Date(searchStateCopy.fromDate);
  //     nextDate.setDate(nextDate.getDate()+1);
  //     searchStateCopy[event.target.name]=nextDate.toISOString().substr(0, 10);
  // }
  // else{
  //     searchStateCopy[event.target.name] = event.target.value;
  // }
  // this.setState({ searchState: searchStateCopy });
  // }

  // handles click of search button
  search = (event) => {
    event.preventDefault();
    let fd = new Date(this.state.searchState.fromDate);
    let td = new Date(this.state.searchState.toDate);
    if (
      this.state.searchState.fromDate === "" ||
      this.state.searchState.toDate === "" ||
      this.state.searchState.infrastructure === ""
    ) {
      window.alert("Please fill in all search inputs");
    } else if (new Date(fd) > new Date(td)) {
      window.alert("enter valid details");
    } else {
      this.getSearchResults();
    }
  };

  // GET request to receive results based on search bar filters
  getSearchResults = () => {
    let searchUrl = HOTEL_SERVICE_BASE_URL + "/user/hotel/report";
    let searchParams = {
      fromDate: this.state.searchState.fromDate,
      toDate: this.state.searchState.toDate,
      fromRating: this.state.searchState.fromRating,
      toRating: this.state.searchState.toRating,
      infrastructure: this.state.searchState.infrastructure,
    };
    //    console.log(searchParams);
    let jwtTokenCookie = new Cookies();

    axios
      .get(searchUrl, {
        headers: {
          Authorization: jwtTokenCookie.get("jwtToken"),
        },
        params: searchParams,
      })
      .then((response) => {
        let results = response.data;
        //        console.log(results);
        //        console.log(searchParams.infrastructure);
        this.setState({ results: results });
      })
      .catch((error) => {
        //        console.log(error);
      });
  };

  getPdf = () => {
    let searchUrl = HOTEL_SERVICE_BASE_URL + "/user/hotel/report/export/pdf";
    let searchParams = {
      fromDate: this.state.searchState.fromDate,
      toDate: this.state.searchState.toDate,
      fromRating: this.state.searchState.fromRating,
      toRating: this.state.searchState.toRating,
      infrastructure: this.state.searchState.infrastructure,
    };
    let jwtTokenCookie = new Cookies();
    let headers = {
      "content-type": "application/pdf",
      Authorization: jwtTokenCookie.get("jwtToken"),
    };
    axios
      .get(searchUrl, {
        params: searchParams,
        headers: headers,
        responseType: "blob",
      })
      .then((response) => {
        const content =
          response.headers[("content-type", headers.Authorization)];
        download(response.data, "hotels", content);
      })
      .catch((error) => {
        //        console.log(error);
      });
  };
  getExcel = () => {
    let searchUrl = HOTEL_SERVICE_BASE_URL + "/user/hotel/report/export/excel";
    let searchParams = {
      fromDate: this.state.searchState.fromDate,
      toDate: this.state.searchState.toDate,
      fromRating: this.state.searchState.fromRating,
      toRating: this.state.searchState.toRating,
      infrastructure: this.state.searchState.infrastructure,
    };
    // window.open(
    //   searchUrl +
    //     "?fromDate=" +
    //     searchParams.fromDate +
    //     "&toDate=" +
    //     searchParams.toDate +
    //     "&fromRating=" +
    //     searchParams.fromRating +
    //     "&toRating=" +
    //     searchParams.toRating +
    //     "&infrastructure=" +
    //     searchParams.infrastructure
    // );
    // window.close();
    let jwtTokenCookie = new Cookies();
    let headers = {
      "content-type": "application/octet-stream",
      Authorization: jwtTokenCookie.get("jwtToken"),
      "Content-Disposition": "attachment",
    };
    axios
      .get(searchUrl, {
        params: searchParams,
        headers: headers,
        responseType: "blob",
      })
      .then((response) => {
        const content =
          response.headers[
            ("content-type", headers.Authorization, "Content-Disposition")
          ];
        download(response.data, "hotels.xlsx", content);
      })
      .catch((error) => {
        //        console.log(error);
      });
  };
  render() {
    let result;
    if (this.state.results.length > 0)
      result = (
        <Pagination data={this.state.results}>
          <ReportTable cardClick={this.cardClick} />
        </Pagination>
      );
    else result = <div className="no-result-header">No results to display</div>;
    return (
      <Fragment>
        <ReportSearchBar
          searchState={this.state.searchState}
          setData={this.setData}
          search={this.search}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1.5em",
          }}
        >
          <div>{result}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            cssClassName="btn--publicis-secondary"
            // buttonSize="btn--medium"
            handleClick={this.getPdf}
            label="Download as pdf"
          />
          <Button
            type="button"
            cssClassName="btn--publicis-secondary"
            // buttonSize="btn--medium"
            handleClick={this.getExcel}
            label="Download as excel"
          />
        </div>
      </Fragment>
    );
  }
}

export default ReportPage;
