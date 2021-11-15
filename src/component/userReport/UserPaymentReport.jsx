import React from 'react'
import '../../css/theme.css'
import '../../css/userReport/UserPaymentReport.css'
//POJO
 {/* 
    private String status;
    private Date payment_date;
    private String payment_mode;
    private Double amount;
 */}

let userPayment={
    firstName:"Lokesh",
    lastName:"Shankar",
    staus:"true",
    payment_date:"19 Aug 2021 12:34:56",
    payment_mode:"online",
    amount:500
}
function UserPaymentReport() {
    
    return (
        
        <div className="--form-card-publicis">
            <div className="--form-card-publicis-header">User Payment Report</div>

            <div className="--form-card-publicis-body user-report">
                <div className="--form-publicis-group">
                    <label htmlFor="UiPage">User Name</label>
                    <p>{userPayment.firstName+' '+userPayment.lastName}</p>
                </div>

                <div className="--form-publicis-group">
                    <label htmlFor="UiPage">Payment Status</label>
                    <p>{userPayment.staus? "Successfull":"Failed"}</p>
                </div>

                <div className="--form-publicis-group">
                    <label htmlFor="UiPage">Payment Date</label>
                    <p>{userPayment.payment_date}</p>
                </div>

                <div className="--form-publicis-group">
                    <label htmlFor="UiPage">Payment Mode</label>
                    <p>{userPayment.payment_mode}</p>
                </div>

                <div className="--form-publicis-group">
                    <label htmlFor="UiPage">Amount Paid</label>
                    <p>{userPayment.amount} INR</p>
                </div>
            </div>
        </div>
    )
}

export default UserPaymentReport