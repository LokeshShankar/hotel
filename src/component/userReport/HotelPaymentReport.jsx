import React from 'react'
import '../../css/userReport/HotelPaymentReport.css'

//POJO

// private String hotel_name;
// private Date booking_time;
// private Date checkin_date ;
// private Date checkout_date ;
// private int guest_count;


let hotelPayment={
    hotel_name:"The Leela Palace",
    booking_time:"19 Aug 2021 12:34:56",
    checkin_date:"19 Aug 2021 12:34:56",
    checkout_date:"19 Aug 2021 12:34:56",
    guest_count:25
}
function HotelPaymentReport() {
    
    return (
        
        <div className="report">
            <h2 className="login-header report-header">Hotel Payment Report</h2>
            <form className="login-container">
                <div className="inline"><label htmlFor="UiPage">Hotel Name : </label></div>
                <div className="inline"><p>{hotelPayment.hotel_name}</p></div>
                    <br/>
                <div className="inline"><label htmlFor="UiPage">Booking Time</label></div>
                <div className="inline"><p>{hotelPayment.booking_time}</p></div>
                    <br/>
                <div className="inline"><label htmlFor="UiPage">Check in</label></div>
                <div className="inline"><p>{hotelPayment.checkin_date}</p></div>
                    <br/>
                <div className="inline"><label htmlFor="UiPage">Check out</label></div>
                <div className="inline"><p>{hotelPayment.checkout_date}</p></div>
                    <br/>
                <div className="inline"><label htmlFor="UiPage">Guest Count</label></div>
                <div className="inline"><p>{hotelPayment.guest_count}</p></div>
                    <br/>
            </form>
        </div>
    )
}

export default HotelPaymentReport