import React, {Component} from "react";
import {Input} from "../utility/Input";
import '../../css/analytics/analytics.css'
import Cookies from "universal-cookie/lib";
import jwt_decode from "jwt-decode";
import Button from "../utility/Button";
import { USER_SERVICE_BASE_URL } from "../utility/Constant";
import axios from "axios";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

class Analytics extends Component {
    constructor(props) {
        super(props);
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() - 29);
        this.state = {
            toDate: new Date().toISOString().substr(0, 10),
            fromDate: tomorrow.toISOString().substr(0, 10),
            email : '',
            responseAmountOfHotelOfAdminOverInterval : [],
            // responseCancelBookingsCountForAllHotels: [],
            responseAllBookingsCountForHotels:[],
            errMsg: '',
        };
    }
    componentDidMount() {
        const jwtTokenCookie = new Cookies();
        let jwtToken=jwtTokenCookie.get("jwtToken");
        let decodedToken = jwt_decode(jwtToken);
        this.setState({email : decodedToken["email"]});
        this.generateAnalysis();
    }

    setData = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    generateAnalysis = () => {
        let jwtTokenCookie = new Cookies();
        const params={
            beginDate: this.state.fromDate,
            endDate : this.state.toDate,
            adminEmail : this.state.email
        }
        const URLAmountOfHotelOfAdminOverInterval=USER_SERVICE_BASE_URL+"/api/v1/analytics/aggregate/admin/bookings/amount";
        //const URLAllBookingsCountForHotels=USER_SERVICE_BASE_URL+"/api/v1/analytics/daily/admin/bookings/all";
        //const URLCancelBookingsCountForAllHotels=USER_SERVICE_BASE_URL+"/api/v1/analytics/daily/admin/bookings/cancelled";
        const URLAllBookingsCountForHotels=USER_SERVICE_BASE_URL+"/api/v1/analytics/aggregate/admin/bookings/completed-cancelled"
        const requestAmountOfHotelOfAdminOverInterval = axios.get(URLAmountOfHotelOfAdminOverInterval, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });
        // const requestCancelBookingsCountForAllHotels = axios.get(URLCancelBookingsCountForAllHotels, {
        //     headers: {
        //         Authorization: jwtTokenCookie.get("jwtToken"),
        //     },
        //     params: params,
        // });
        const requestAllBookingsCountForHotels = axios.get(URLAllBookingsCountForHotels, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });

        axios.all([requestAmountOfHotelOfAdminOverInterval, requestAllBookingsCountForHotels])
            .then(axios.spread((...responses) => {

            this.setState({responseAmountOfHotelOfAdminOverInterval: responses[0].data});
            //this.setState({responseCancelBookingsCountForAllHotels: responses[1].data});
            this.setState({responseAllBookingsCountForHotels: responses[1].data});

        })).catch(errors => {
            this.setState({errMsg : "Network Error!! Try Again."})
        })
    }

    render() {
        return (
            <div>
                <div className="analytics-search-outer-container">
                    <div className="analytics-searchBarcontainer">
                        <div className="analytics-searchBarInnerContainerDate">
                            <div>
                                <label className="analytics-searchBarLabels">From Date</label>
                            </div>
                            <div>
                                <Input
                                    name="fromDate"
                                    type="date"
                                    value={this.state.fromDate}
                                    onChange={this.setData}
                                    className="analytics-searchBarInputDate"
                                />
                            </div>
                        </div>
                        <div className="analytics-searchBarInnerContainerDate">
                            <div>
                                <label className="analytics-searchBarLabels">To Date</label>
                            </div>
                            <div>
                                <Input
                                    name="toDate"
                                    type="date"
                                    value={this.state.toDate}
                                    onChange={this.setData}
                                    className="analytics-searchBarInputDate"
                                />
                            </div>
                        </div>
                        <div className="analytics-searchBarInnerContainerSearch">
                            <div>
                                <label className="analytics-searchBarLabels"></label>
                            </div>
                            <Button
                                type="button"
                                cssClassName="btn--publicis-secondary-outline"
                                handleClick={this.generateAnalysis}
                                label="See Analysis"
                            />
                        </div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="graph-sub-container">
                        <ResponsiveContainer aspect={1.5} >
                            <BarChart data={this.state.responseAmountOfHotelOfAdminOverInterval}
                                  >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="hotelName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount"  fill="green" name="Bookings Amount Received(in Rs.)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph-sub-container">
                        <ResponsiveContainer aspect={1.5} >
                            <BarChart  data={this.state.responseAllBookingsCountForHotels} >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="hotelName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed"  fill="green" name="Successful Bookings" />
                                <Bar dataKey="cancelled"  fill="#fe414d" name="Cancelled Bookings" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}
export default Analytics;