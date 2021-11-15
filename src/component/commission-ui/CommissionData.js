import React from 'react'
import '../../css/commission-ui/DisplayCommission.css'

function CommissionData(props) {
    let commission = props.commission;
    if(commission){
        let commissionDue = (commission.bookingAmount*1.0/100).toFixed(2);
        
        return (
            <div className="--form-card-publicis">
                    <div className="--form-card-publicis-header">Commission Invoice</div>
                    <div className="--form-card-publicis-body">
                        <div className="bill-hotel">
                            <div className="commission-date">
                                <span>Date : {props.month}, {props.year}</span>
                            </div>
                            <div className="bill-to">Bill To : </div>
                            <div className="hotel-address">
                                <div className="hotel-name">{commission.hotelName}</div>
                                <div>{commission.hotelLocalAddress}, {commission.hotelLandmarks}, {commission.hotelRegion}</div>
                                <div>Pincode : {commission.hotelPincode}, {commission.hotelCity}</div>
                                <div>{commission.hotelPhone}</div>
                                <div>{commission.hotelEmail}</div>
                            </div>

                        </div>
                        <div className="count-price">
                            <div className="inner-count-price">
                                <span className="inner-labels">Booking Count : </span>
                                <span className="inner-values">{commission.bookingCount}</span>
                            </div>
                            <div className="inner-count-price">
                                <span className="inner-labels">Booking Amount : </span>
                                <span className="inner-values">Rs {commission.bookingAmount}</span>
                            </div>
                            <div className="inner-count-price">
                                <span className="inner-labels">Commission Due : </span>
                                <span className="inner-value">Rs {commissionDue}</span>
                            </div>
                        </div>
                        
                    </div>
            </div>
        );
    }
    else{
        return(<h3 className="no-data">No Data to Show...</h3>);
    }
}

export default CommissionData;