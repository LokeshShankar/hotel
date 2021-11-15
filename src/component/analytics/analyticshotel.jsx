import React, {Component} from "react";
import {Input} from "../utility/Input";
import '../../css/analytics/analytics.css'
import Cookies from "universal-cookie/lib";
import Button from "../utility/Button";
import { HOTEL_SERVICE_BASE_URL } from "../utility/Constant";
import axios from "axios";
import {
    LineChart,
    BarChart,
    PieChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    Pie, Cell,Label
} from 'recharts';

class AnalyticsHotel extends Component {
    constructor(props) {
        super(props);
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() - 29);
        this.state = {
            toDate: new Date().toISOString().substr(0, 10),
            fromDate: tomorrow.toISOString().substr(0, 10),
            hotelId: this.props.match.params.hotelId,
            responseAllBookingsCount: [],
           // responseCancelBookingsCount : [],
            responseSuccessfulAndCancelledBookingsCount : [],
            responseBookingsStatus: [],
            responseAmountReceived: [],
            responseCountOfBookingsByCityInInterval: [],
            errMsg: '',
        };
    }
    componentDidMount() {
        
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
            hotelId : this.state.hotelId
        }

        // endpoints for data for analysis
        const URLSuccessfulAndCancelledBookingsCount=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/daily/hotel/bookings/completed-cancelled";
        const URLAllBookingsCount=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/daily/hotel/bookings/all";
       // const URLCancelBookingsCount=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/daily/hotel/bookings/cancelled";
        const URLBookingsStatus=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/aggregate/hotel/bookings/status";
        const URLAmountReceived=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/daily/hotel/bookings/amount";
        const URLCountOfBookingsByCityInInterval=HOTEL_SERVICE_BASE_URL+"/api/v1/analytics/aggregate/hotel/bookings/city";
        const requestAllBookingsCount = axios.get(URLAllBookingsCount, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });
        // const requestCancelBookingsCount = axios.get(URLCancelBookingsCount, {
        //     headers: {
        //         Authorization: jwtTokenCookie.get("jwtToken"),
        //     },
        //     params: params,
        // });
        const requestBookingsStatus = axios.get(URLBookingsStatus, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });
        const requestAmountReceived=axios.get(URLAmountReceived, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });
        const requestSuccessfulAndCancelledBookingsCount=axios.get(URLSuccessfulAndCancelledBookingsCount, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });
        const requestCountOfBookingsByCityInInterval=axios.get(URLCountOfBookingsByCityInInterval, {
            headers: {
                Authorization: jwtTokenCookie.get("jwtToken"),
            },
            params: params,
        });

        axios.all([requestAllBookingsCount, requestBookingsStatus,
            requestAmountReceived,requestSuccessfulAndCancelledBookingsCount,requestCountOfBookingsByCityInInterval])
            .then(axios.spread((...responses) => {

            this.setState({responseAllBookingsCount: responses[0].data});
            //this.setState({responseCancelBookingsCount: responses[1].data});
            this.setState({responseBookingsStatus: responses[1].data});
            /* istanbul ignore next */
            this.setState({responseAmountReceived: responses[2].data});
                /* istanbul ignore next */
            this.setState({responseSuccessfulAndCancelledBookingsCount: responses[3].data});
                /* istanbul ignore next */
            this.setState({responseCountOfBookingsByCityInInterval: responses[4].data})

        })).catch(errors => {
            this.setState({errMsg : "Network Error!! Try Again."})
        })
    }

    render() {
        const COLORS=["#fe414d","green"];
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
                            <LineChart data={this.state.responseAllBookingsCount}
                                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="bookingDate" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="numBookings" stroke="green" name="Total Bookings" activeDot={{ r: 6 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph-sub-container">
                        <ResponsiveContainer aspect={1.5} >
                            <LineChart data={this.state.responseSuccessfulAndCancelledBookingsCount}
                                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="completedBookings" stroke="green" activeDot={{ r: 6 }}  name="Successful Bookings" />
                                <Line type="monotone" dataKey="cancelledBookings" stroke="#fe414d" activeDot={{ r: 6 }}  name="Cancelled Bookings" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph-sub-container">
                        <ResponsiveContainer aspect={1.5} >
                            <BarChart  data={this.state.responseAmountReceived} >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="green" name="Bookings Amount Received(in Rs.)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph-sub-container">
                        <ResponsiveContainer aspect={1.5} >
                            <BarChart data={this.state.responseCountOfBookingsByCityInInterval} >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="city" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="numBookings" fill="#fe414d" name="No. Of Bookings" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graph-sub-container" >
                        <ResponsiveContainer aspect={1.5} >
                            <PieChart >
                                <Tooltip />
                                <Legend />
                                <Pie data={this.state.responseBookingsStatus} dataKey="numBookings"
                                     nameKey="status" cx="50%" cy="50%" innerRadius={40} outerRadius={100} fill="#fe414d" label >
                                    {this.state.responseBookingsStatus.map((booking, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <Label value="Bookings" offset={20} position="center" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}
export default AnalyticsHotel;